FastFive
========

## Setup

The analysis endpoint uses the GitHub API through Octokit. Set a `GITHUB_TOKEN` environment variable on the server or hosting platform so the API can authenticate and avoid rate limits.

## API

The client posts repository targets to `/api/analyze` which returns metrics including stars, forks, open issues and quality scores.
