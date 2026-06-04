import { BedrockRuntimeClient, InvokeModelCommand } from "@aws-sdk/client-bedrock-runtime";

// Vercel serverless function
export default async function handler(req, res) {
  // Only allow POST requests
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { brandName } = req.body;

  if (!brandName) {
    return res.status(400).json({ error: 'Brand name is required' });
  }

  try {
    // Initialize Bedrock client with credentials from environment variables
    const client = new BedrockRuntimeClient({
      region: process.env.AWS_REGION || "us-east-1",
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      }
    });

    const systemPrompt = `You are a world-class commercial real estate leasing director at American Dream (the mega-mall in New Jersey).
Your job is to generate a short, highly persuasive, 3-paragraph "Opportunity Brief" for a prospective tenant.
The user will give you their brand or concept name.
Write a punchy pitch explaining exactly why they belong at American Dream.
Mention the 40M+ annual visitors, the synergy with entertainment, and the massive New York metro market.
Keep it under 150 words total. Be extremely confident and professional.
Make the prospect feel like not being at American Dream is a missed opportunity.`;

    const prompt = `Brand/Concept: ${brandName}\n\nGenerate the custom Opportunity Brief.`;

    const payload = {
      anthropic_version: "bedrock-2023-05-31",
      max_tokens: 500,
      temperature: 0.7,
      system: systemPrompt,
      messages: [
        {
          role: "user",
          content: prompt
        }
      ]
    };

    // Using Claude 3 Haiku for speed and low cost
    const command = new InvokeModelCommand({
      modelId: "anthropic.claude-3-haiku-20240307-v1:0",
      contentType: "application/json",
      accept: "application/json",
      body: JSON.stringify(payload)
    });

    const response = await client.send(command);
    
    // Parse the response
    const responseBody = JSON.parse(new TextDecoder().decode(response.body));
    const generatedText = responseBody.content[0].text;

    return res.status(200).json({ brief: generatedText });
    
  } catch (error) {
    console.error("Bedrock API Error:", error);
    return res.status(500).json({ error: error.message || 'Failed to generate brief. Please try again later.' });
  }
}
