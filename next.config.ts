import type { NextConfig } from 'next';

const isGitHubPages = process.env.GITHUB_PAGES === 'true';
const repositoryName = process.env.GITHUB_REPOSITORY?.split('/')[1] ?? '';
const basePath =
  isGitHubPages && repositoryName && !repositoryName.endsWith('.github.io')
    ? `/${repositoryName}`
    : '';

const nextConfig: NextConfig = {
  output: 'export',
  assetPrefix: basePath || undefined,
};

export default nextConfig;
