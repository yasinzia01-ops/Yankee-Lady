import { createElement, type AnchorHTMLAttributes } from 'react';

// Use browser navigation until the deployed Vinext client router is reliable.
// Keep anchors native (including modifier clicks, downloads and hash targets).
type NativeLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> & { prefetch?: boolean };
export default function NativeLink({ prefetch: _prefetch, ...props }: NativeLinkProps) {
  return createElement('a', props);
}
