FastFive

## Environment Variables

Create a `.env` file based on `.env.example` and provide your GitHub personal access token:

```
VITE_GITHUB_TOKEN=your_github_token_here
```

This token is used to authorize requests to the GitHub API. For production deployments, configure the `VITE_GITHUB_TOKEN` environment variable in your hosting provider (e.g., Vercel) so that it is injected at build time without committing the secret to the repository.
