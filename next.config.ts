import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Metadata comes from local content, so resolve it in the initial head for
  // crawlers, link previews and browsers without deferred metadata support.
  htmlLimitedBots: /.*/,
};

export default nextConfig;
