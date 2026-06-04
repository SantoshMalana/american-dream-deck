// Vercel serverless function
export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { brandName } = req.body;

  if (!brandName) {
    return res.status(400).json({ error: 'Brand name is required' });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'GEMINI_API_KEY is not set in environment variables.' });
  }

  try {
    const systemInstruction = `You are a world-class commercial real estate leasing director at American Dream (the mega-mall in New Jersey).
Your job is to generate a short, highly persuasive, 3-paragraph "Opportunity Brief" for a prospective tenant.
The user will give you their brand or concept name.
Write a punchy pitch explaining exactly why they belong at American Dream.
Mention the 40M+ annual visitors, the synergy with entertainment, and the massive New York metro market.
Keep it under 150 words total. Be extremely confident and professional.
Make the prospect feel like not being at American Dream is a missed opportunity.`;

    const prompt = `Brand/Concept: ${brandName}\n\nGenerate the custom Opportunity Brief.`;

    const payload = {
      system_instruction: { parts: { text: systemInstruction } },
      contents: [{ parts: [{ text: prompt }] }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 500,
      }
    };

    // Using gemini-2.5-flash for speed and high quality
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.error?.message || 'Failed to generate content from Gemini');
    }

    const generatedText = data.candidates[0].content.parts[0].text;
    return res.status(200).json({ brief: generatedText });

  } catch (error) {
    console.error("Gemini API Error:", error);
    
    // Fallback if API completely fails
    const fallbackBrief = `As a premier destination seeing over 40 million annual visitors, American Dream offers an unparalleled platform for ${brandName || 'your brand'}. 

By joining our ecosystem, you position yourself at the intersection of world-class retail and entertainment, instantly tapping into the lucrative New York metropolitan market.

Our immersive environment is designed to elevate brand experiences. Securing a footprint here isn't just about leasing space; it's a strategic move to ensure you don't miss out on redefining your brand's future.`;

    return res.status(200).json({ brief: fallbackBrief });
  }
}
