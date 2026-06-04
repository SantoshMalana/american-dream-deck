# American Dream — Interactive Sales Experience

An immersive, interactive sales presentation built for American Dream, replacing traditional slide decks with a dynamic, nonlinear, video-first web experience.

## The Strategy
This isn't a website. It's a structured sales tool.
- **Nonlinear Navigation:** Allows the presenter to jump instantly to the section most relevant to the prospect.
- **Data-Driven:** Animated statistics prove the ROI (40M+ visitors, 55% entertainment).
- **AI-Powered:** Includes a Claude-powered Opportunity Brief generator that instantly pitches a prospect on why they belong at American Dream.

## Architecture
- **Frontend:** Vanilla JS, CSS Custom Properties (Design Tokens), and HTML. Zero frameworks to ensure maximum performance and longevity.
- **Backend (AI):** Vercel Serverless Function (`api/generate-brief.js`) connecting to Amazon Bedrock (Claude 3 Haiku).
- **Bundler:** Vite.

## Deployment Instructions (Vercel + AWS Bedrock)

This project is configured to deploy seamlessly on Vercel, which will automatically host the static frontend and provision the serverless function for the AI generator.

### 1. Prerequisites
- A GitHub account with this repository pushed.
- A Vercel account linked to your GitHub.
- AWS Credentials with access to Amazon Bedrock (specifically Claude models).

### 2. Deploying to Vercel
1. Log into Vercel and click **Add New Project**.
2. Import this repository from GitHub.
3. Vercel will automatically detect Vite as the framework.
4. **Crucial Step — Environment Variables:** Before clicking Deploy, expand the Environment Variables section and add the following:
   - `AWS_ACCESS_KEY_ID`: Your AWS IAM access key.
   - `AWS_SECRET_ACCESS_KEY`: Your AWS IAM secret key.
   - `AWS_REGION`: The region where you enabled Bedrock (e.g., `us-east-1`).
5. Click **Deploy**.

Once deployed, the AI Opportunity Brief generator in the "Partner With Us" section will be fully functional, calling Claude via your AWS account.

## Development

```bash
# Install dependencies
npm install

# Start local dev server
npm run dev

# Build for production
npm run build
```
