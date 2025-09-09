FastFive
codex/modify-client-to-post-repository-target


## Setup

The analysis endpoint uses the GitHub API through Octokit. Set a `GITHUB_TOKEN` environment variable on the server or hosting platform so the API can authenticate and avoid rate limits.

## API

The client posts repository targets to `/api/analyze` which returns metrics including stars, forks, open issues and quality scores.


## Environment Variables

Create a `.env` file based on `.env.example` and provide your GitHub personal access token:


VITE_GITHUB_TOKEN=your_github_token_here


This token is used to authorize requests to the GitHub API. For production deployments, configure the `VITE_GITHUB_TOKEN` environment variable in your hosting provider (e.g., Vercel) so that it is injected at build time without committing the secret to the repository.

