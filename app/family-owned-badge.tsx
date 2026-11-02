import './family-owned-badge.css';

export function FamilyOwnedBadge() {
  return <div className="hero-family-proof">
    <div className="family-owned-badge" aria-label="Canadian family-owned business">
      <MapleLeaf className="family-owned-leaf" />
      <span className="family-owned-copy"><span>Canadian</span><span>Family-Owned Business</span></span>
    </div>
  </div>;
}

export function MapleLeaf({ className }: { className?: string }) {
  return <svg className={className} viewBox="0 0 100 100" aria-hidden="true" focusable="false">
    <path fill="currentColor" d="M50 3 40 25 33 19 36 44 23 31 20 40 6 37 12 54 5 58 30 78 27 87 47 84 46 98 54 98 53 84 73 87 70 78 95 58 88 54 94 37 80 40 77 31 64 44 67 19 60 25Z" />
  </svg>;
}
