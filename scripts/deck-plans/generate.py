"""Generate the Yankee Lady deck plan SVGs.

Geometry is traced from the original low-resolution deck plan images, in each
original's pixel coordinates, then mapped onto a shared 2400x1000 canvas so both
decks render at the same hull length with identical styling.

    python3 scripts/deck-plans/generate.py
"""

from pathlib import Path

OUT = Path(__file__).resolve().parents[2] / "public" / "media"

W, H = 2400, 1000
HULL_X0, HULL_LEN, MID_Y = 200, 2000, 430

C = {
    "deck": "#9fb0d0",
    "deck_line": "#5b6c94",
    "carpet": "#1c2457",
    "wood": "#c99a55",
    "wood_line": "#a97b3c",
    "wood_dark": "#7a5a45",
    "bench": "#a89f92",
    "bench_line": "#7d7466",
    "chair": "#3442a8",
    "chair_line": "#1c2470",
    "white": "#ffffff",
    "pale": "#eceef3",
    "ink": "#1d2433",
    "muted": "#5d6475",
    "rail": "#b5652f",
    "gold": "#d8b067",
    "bar_blue": "#1f6cc0",
    "bar_navy": "#1d2e8f",
}

FONT = "Inter, 'Helvetica Neue', Arial, sans-serif"


class Deck:
    """Maps source-image coordinates onto the shared canvas."""

    def __init__(self, x0, x1, mid):
        self.s = HULL_LEN / (x1 - x0)
        self.x0, self.mid = x0, mid
        self.parts = []
        self.labels = []

    def X(self, x):
        return HULL_X0 + (x - self.x0) * self.s

    def Y(self, y):
        return MID_Y + (y - self.mid) * self.s

    def pt(self, x, y):
        return f"{self.X(x):.1f},{self.Y(y):.1f}"

    def add(self, s):
        self.parts.append(s)

    def path(self, d_src, **attrs):
        """d_src: list of (cmd, coords...) in source coordinates."""
        out = []
        for cmd, *nums in d_src:
            pts = [self.pt(nums[i], nums[i + 1]) for i in range(0, len(nums), 2)]
            out.append(cmd + " ".join(pts))
        self.add(f'<path d="{" ".join(out)}"{fmt(attrs)}/>')

    def poly(self, pts, **attrs):
        self.add(f'<polygon points="{" ".join(self.pt(x, y) for x, y in pts)}"{fmt(attrs)}/>')

    def rect(self, x0, y0, x1, y1, rx=0, **attrs):
        self.add(
            f'<rect x="{self.X(x0):.1f}" y="{self.Y(y0):.1f}" width="{(x1 - x0) * self.s:.1f}" '
            f'height="{(y1 - y0) * self.s:.1f}" rx="{rx}"{fmt(attrs)}/>'
        )

    def line(self, x0, y0, x1, y1, **attrs):
        self.add(
            f'<line x1="{self.X(x0):.1f}" y1="{self.Y(y0):.1f}" x2="{self.X(x1):.1f}" '
            f'y2="{self.Y(y1):.1f}"{fmt(attrs)}/>'
        )

    def treads(self, x0, y0, x1, y1, n, color, width):
        step = (x1 - x0) / n
        for i in range(n):
            x = x0 + step * (i + 0.5)
            self.line(x, y0, x, y1, stroke=color, stroke_width=width)

    def label(self, x, y, lines, size=26, color=None, anchor="middle", weight=500):
        color = color or C["ink"]
        lh = size * 1.18
        top = self.Y(y) - lh * (len(lines) - 1) / 2
        for i, t in enumerate(lines):
            self.labels.append(
                f'<text x="{self.X(x):.1f}" y="{top + i * lh:.1f}" text-anchor="{anchor}" '
                f'dominant-baseline="central" font-size="{size}" font-weight="{weight}" '
                f'fill="{color}" letter-spacing="0.4">{t}</text>'
            )


def fmt(attrs):
    return "".join(f' {k.replace("_", "-")}="{v}"' for k, v in attrs.items())


def chair(d, cx, cy, w, h, rot=0):
    """Tub chair: flat back edge on top, rounded front, seat cushion inside."""
    X, Y, s = d.X(cx), d.Y(cy), d.s
    hw, hh = w * s / 2, h * s / 2
    outer = (
        f"M{-hw:.1f},{-hh:.1f} H{hw:.1f} V{-hh * 0.15:.1f} "
        f"C{hw:.1f},{hh * 0.7:.1f} {hw * 0.5:.1f},{hh:.1f} 0,{hh:.1f} "
        f"C{-hw * 0.5:.1f},{hh:.1f} {-hw:.1f},{hh * 0.7:.1f} {-hw:.1f},{-hh * 0.15:.1f} Z"
    )
    iw, ih = hw * 0.68, hh * 0.62
    inner = (
        f"M{-iw:.1f},{-hh * 0.45:.1f} H{iw:.1f} V{-ih * 0.05:.1f} "
        f"C{iw:.1f},{ih * 0.75:.1f} {iw * 0.5:.1f},{ih * 1.05:.1f} 0,{ih * 1.05:.1f} "
        f"C{-iw * 0.5:.1f},{ih * 1.05:.1f} {-iw:.1f},{ih * 0.75:.1f} {-iw:.1f},{-ih * 0.05:.1f} Z"
    )
    d.add(
        f'<g transform="translate({X:.1f},{Y:.1f}) rotate({rot})">'
        f'<path d="{outer}" fill="{C["chair_line"]}" stroke="{C["chair_line"]}" stroke-width="2" stroke-linejoin="round"/>'
        f'<path d="{inner}" fill="{C["chair"]}"/></g>'
    )


def frame(d, title, caption, caption_y):
    cap_y = 712
    body = "\n    ".join(d.parts)
    labels = "\n    ".join(d.labels)
    return f"""<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" width="{W}" height="{H}" role="img" aria-labelledby="title">
  <title id="title">{title}</title>
  <defs>
    <pattern id="planks" width="40" height="14" patternUnits="userSpaceOnUse">
      <rect width="40" height="14" fill="{C['wood']}"/>
      <path d="M0 13.5H40" stroke="{C['wood_line']}" stroke-width="1" opacity="0.55"/>
    </pattern>
  </defs>
  <rect width="{W}" height="{H}" fill="#ffffff"/>
  <g stroke-linejoin="round" stroke-linecap="round">
    {body}
  </g>
  <g font-family="{FONT}">
    {labels}
    <text x="{W / 2}" y="{cap_y:.1f}" text-anchor="middle" font-size="26" font-style="italic" fill="{C['muted']}" letter-spacing="0.6">{caption}</text>
    <g fill="{C['muted']}" font-size="20" font-weight="600" letter-spacing="4">
      <text x="{HULL_X0}" y="{cap_y:.1f}" text-anchor="start">◂ AFT</text>
      <text x="{HULL_X0 + HULL_LEN}" y="{cap_y:.1f}" text-anchor="end">BOW ▸</text>
    </g>
    <text x="{W / 2}" y="860" text-anchor="middle" font-size="64" font-weight="700" fill="{C['ink']}" letter-spacing="0.5">{title}</text>
  </g>
</svg>
"""


# ---------------------------------------------------------------------------
# Second deck (source: 1284x860 image, hull x 97..1205, centreline y 394.5)
# ---------------------------------------------------------------------------
def second_deck():
    d = Deck(97, 1205, 394.5)
    ink, sw = C["ink"], 3

    # Outline of the main deck hull below (forward of the second-deck cabin).
    d.path(
        [("M", 605, 273.5), ("L", 900, 276), ("C", 1010, 282, 1110, 320, 1160, 358),
         ("L", 1205, 394.5), ("L", 1160, 431), ("C", 1110, 469, 1010, 507, 900, 513),
         ("L", 605, 515.5)],
        fill="none", stroke=ink, stroke_width=2.5,
    )
    # Inner foredeck (roof below) outline and boarding ladder.
    d.path(
        [("M", 885, 301), ("L", 1005, 318), ("Q", 1035, 324, 1035, 342), ("L", 1035, 447),
         ("Q", 1035, 467, 1005, 471), ("L", 885, 488)],
        fill="none", stroke=ink, stroke_width=2.5,
    )
    d.rect(1036, 365, 1046, 424, fill=C["white"], stroke=ink, stroke_width=1.5)
    for i in range(1, 6):
        y = 365 + i * (424 - 365) / 6
        d.line(1036, y, 1046, y, stroke=ink, stroke_width=1.2)
    # Bow peak.
    d.poly([(1162, 360), (1205, 394.5), (1162, 429)], fill=C["pale"], stroke=ink, stroke_width=2)
    d.line(1162, 360, 1162, 429, stroke=ink, stroke_width=4)

    # Aft open deck with chamfered forward corners.
    d.path(
        [("M", 105, 273), ("L", 335, 273), ("L", 362, 302), ("L", 396, 302), ("L", 396, 488),
         ("L", 362, 488), ("L", 335, 516), ("L", 105, 516), ("Q", 97, 516, 97, 508),
         ("L", 97, 281), ("Q", 97, 273, 105, 273), ("Z",)],
        fill=C["deck"], stroke=ink, stroke_width=sw,
    )

    # Wedding arch.
    d.path(
        [("M", 162, 302), ("L", 141, 284), ("Q", 120, 268, 106, 283), ("Q", 96, 297, 108, 312),
         ("L", 133, 338)],
        fill="none", stroke=C["ink"], stroke_width=11,
    )
    d.path(
        [("M", 162, 302), ("L", 141, 284), ("Q", 120, 268, 106, 283), ("Q", 96, 297, 108, 312),
         ("L", 133, 338)],
        fill="none", stroke="#f3ead0", stroke_width=6.5,
    )

    # Stairs on the aft deck.
    d.rect(179, 373, 270, 402, fill=C["ink"], stroke=C["white"], stroke_width=3)
    d.treads(179, 375, 270, 400, 13, C["white"], 2)
    d.rect(287, 451, 396, 483, fill=C["ink"], stroke=C["white"], stroke_width=3)
    d.treads(287, 453, 396, 481, 15, C["white"], 2)

    # Ceremony seating: 4 rows x 5.
    for r, cy in enumerate((431, 455, 478, 502)):
        for cx in (124, 154, 184, 214, 244):
            chair(d, cx, cy, 25, 22)
    # Seating by the forward stair.
    for cx, cy in ((312, 432), (347, 432), (380, 432)):
        chair(d, cx, cy, 23, 24, rot=-55)
    # Cluster by the starboard corner.
    for cx, cy in ((330, 287), (351, 309), (326, 318), (379, 320), (347, 341), (373, 349)):
        chair(d, cx, cy, 23, 24, rot=-55)

    # Enclosed salon.
    d.rect(396, 302, 822, 490, fill=C["carpet"], stroke=ink, stroke_width=sw)
    d.line(396, 302, 396, 490, stroke=C["white"], stroke_width=6)

    # Central stair with railing.
    d.rect(509, 357, 621, 409, fill=C["carpet"])
    d.treads(511, 359, 619, 407, 13, "#c9cee0", 3)
    d.path([("M", 509, 356), ("L", 622, 356), ("L", 622, 410), ("L", 509, 410)],
           fill="none", stroke=C["rail"], stroke_width=7)

    # Bar in the port-aft corner.
    d.path([("M", 397, 435), ("L", 427, 435), ("L", 457, 458), ("L", 457, 489), ("L", 397, 489), ("Z",)],
           fill=C["bar_navy"], stroke=C["gold"], stroke_width=3)
    d.path([("M", 397, 447), ("L", 421, 447), ("L", 443, 464), ("L", 443, 489), ("L", 397, 489), ("Z",)],
           fill="#c3c8d2", stroke=C["gold"], stroke_width=2)
    d.rect(397, 461, 440, 489, fill=C["bar_blue"])

    # Wheelhouse: wood floor, black forward bulkhead, helm console.
    wheel = [("M", 822, 301), ("L", 860, 301), ("L", 889, 318), ("L", 904, 350), ("L", 906, 444),
             ("L", 890, 481), ("L", 866, 489), ("L", 822, 489), ("Z",)]
    d.path(wheel, fill="url(#planks)", stroke="#111", stroke_width=9)
    d.rect(822, 302, 826, 488, fill="#7e7f86")
    d.path([("M", 870, 322), ("L", 884, 330), ("L", 887, 350), ("L", 887, 444), ("L", 884, 466),
            ("L", 870, 474), ("Z",)], fill=C["wood_dark"], stroke="#4a362a", stroke_width=1.5)
    d.rect(875, 362, 884, 374, rx=2, fill="#a8c4e0", stroke="#4a362a", stroke_width=1)
    d.rect(875, 422, 884, 434, rx=2, fill="#a8c4e0", stroke="#4a362a", stroke_width=1)
    cx, cy, r = d.X(863), d.Y(397), 6.5 * d.s
    d.add(f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r:.1f}" fill="none" stroke="#2a1d16" stroke-width="2.5"/>')
    for a in range(0, 360, 45):
        d.add(f'<line x1="{cx:.1f}" y1="{cy:.1f}" x2="{cx:.1f}" y2="{cy - r:.1f}" stroke="#2a1d16" '
              f'stroke-width="2" transform="rotate({a} {cx:.1f} {cy:.1f})"/>')
    d.add(f'<circle cx="{d.X(877):.1f}" cy="{cy:.1f}" r="{2.5 * d.s:.1f}" fill="#111"/>')

    return frame(d, "Second Deck Floor Plan", "Second Deck Floor Plan", 536)


# ---------------------------------------------------------------------------
# Main deck (source: 640x427 image, hull x 40..582, centreline y 188.5)
# ---------------------------------------------------------------------------
def main_deck():
    d = Deck(40, 582, 188.5)
    ink, sw = C["ink"], 3

    # Hull / outside deck.
    d.path(
        [("M", 46, 128.5), ("L", 420, 129.5), ("C", 470, 131, 520, 150, 560, 172), ("L", 582, 188.5),
         ("L", 560, 205), ("C", 520, 227, 470, 246, 420, 247.5), ("L", 46, 248.5),
         ("Q", 40, 248.5, 40, 242.5), ("L", 40, 134.5), ("Q", 40, 128.5, 46, 128.5), ("Z",)],
        fill=C["deck"], stroke=ink, stroke_width=sw,
    )
    d.poly([(560, 172), (582, 188.5), (560, 205)], fill=C["pale"], stroke=ink, stroke_width=2)

    # Dance floor / interior carpet.
    d.path(
        [("M", 88, 141), ("L", 287, 141), ("L", 287, 144), ("L", 326, 144), ("L", 326, 153),
         ("L", 432, 153), ("L", 432, 224), ("L", 326, 224), ("L", 326, 233.5), ("L", 288, 233.5),
         ("L", 288, 248), ("L", 88, 248), ("Z",)],
        fill=C["carpet"], stroke="none",
    )
    # Side walls with exits.
    d.line(88, 141, 88, 179, stroke=C["white"], stroke_width=5)
    d.line(289, 144, 326, 144, stroke=C["white"], stroke_width=5)
    d.line(289, 233.5, 326, 233.5, stroke=C["white"], stroke_width=5)
    d.rect(275, 129, 287, 141, fill=C["bar_navy"], stroke=ink, stroke_width=1.5)

    # Bench seating.
    bench = dict(fill=C["bench"], stroke=C["bench_line"], stroke_width=2)
    d.rect(111, 129, 275, 141, **bench)
    d.rect(160, 235, 288, 248, **bench)
    d.path([("M", 326, 144), ("L", 400, 145), ("C", 425, 146, 445, 150, 457, 152), ("L", 457, 160),
            ("C", 445, 157, 425, 155, 400, 154), ("L", 326, 153), ("Z",)], **bench)
    d.path([("M", 326, 225), ("L", 400, 224), ("C", 425, 223, 445, 222, 457, 221), ("L", 457, 229),
            ("C", 445, 231, 425, 233, 400, 234), ("L", 326, 234.5), ("Z",)], **bench)

    # Forward wood platform with steps up to the bow.
    d.path(
        [("M", 432, 158), ("L", 455, 160), ("L", 457, 151), ("L", 482, 151), ("Q", 498, 152, 498, 167),
         ("L", 498, 211), ("Q", 498, 226, 482, 227), ("L", 457, 229), ("L", 455, 221), ("L", 432, 223), ("Z",)],
        fill="url(#planks)", stroke=ink, stroke_width=2.5,
    )
    d.rect(498, 175, 504, 208, fill=C["white"], stroke=ink, stroke_width=1.5)
    for i in range(1, 6):
        y = 175 + i * 33 / 6
        d.line(498, y, 504, y, stroke=ink, stroke_width=1.2)

    # DJ booth.
    d.rect(88, 129, 111, 155, fill="#d4d4d4", stroke=ink, stroke_width=2)

    # Outside DJ table and stair opening.
    d.rect(272, 142, 283, 163, fill=C["pale"], stroke=ink, stroke_width=1.5)
    d.rect(230, 165, 283, 193, fill="#6e5246", stroke=C["white"], stroke_width=2)
    d.treads(230, 166, 283, 192, 14, C["white"], 6)

    # Bar.
    d.rect(78, 179, 112, 189, fill="#d8cdbf", stroke=C["bench_line"], stroke_width=1.5)
    d.treads(78, 180, 112, 188, 10, "#b3a594", 2)
    d.rect(88, 189, 116, 248, fill=C["bar_blue"], stroke=ink, stroke_width=1.5)
    d.path([("M", 112, 178), ("L", 139, 178), ("L", 145, 184), ("L", 145, 247), ("L", 115, 247),
            ("L", 115, 189), ("L", 112, 189), ("Z",)], fill=C["gold"], stroke="#9e7a3c", stroke_width=2)
    d.rect(117, 191, 130, 246, fill=C["bar_navy"], stroke="#9e7a3c", stroke_width=1.5)
    d.add('<defs><linearGradient id="steel" x1="0" x2="1"><stop offset="0" stop-color="#e9ebef"/>'
          '<stop offset="0.5" stop-color="#9aa0aa"/><stop offset="1" stop-color="#d7dae0"/></linearGradient></defs>')
    d.rect(89, 191, 100, 229, rx=2, fill="url(#steel)", stroke=ink, stroke_width=1.2)

    # Labels from the original plan.
    d.label(99.5, 142, ["D.J.", "Booth"], size=22)
    d.label(77, 166.5, ["Exit"], size=24)
    d.label(301, 137, ["Exit"], size=24)
    d.label(301, 241, ["Exit"], size=24)
    d.label(252, 153.5, ["Outside DJ", "Table"], size=22, color=C["white"])
    d.label(60, 204.5, ["Outside", "Aft Deck"], size=24)
    d.label(102, 238.5, ["BAR"], size=22, color=C["white"], weight=600)
    d.label(527, 188.5, ["Outside", "Bow"], size=24)

    return frame(d, "Main Deck", "Main Deck", 263)


if __name__ == "__main__":
    OUT.mkdir(parents=True, exist_ok=True)
    (OUT / "deck-plan-second-deck.svg").write_text(second_deck())
    (OUT / "deck-plan-main-deck.svg").write_text(main_deck())
    print("wrote", OUT)
