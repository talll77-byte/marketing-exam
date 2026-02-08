import { NextResponse } from 'next/server';

// הגדרת בסיס הידע עם גרש נטוי (Backticks) כדי לאפשר טקסט מרובה שורות
const KNOWLEDGE_BASE = `
CONTEXT: Foundations of Marketing & Entrepreneurship.
CORE DATA:
- Marketing vs Selling: Marketing focuses on customer needs; Selling focuses on the product/cash.
- Supply & Demand: Equilibrium in perfect competition results in zero price differentiation.
`;

export async function POST(req) {
  try {
    const body = await req.json();
    const { prompt } = body;

    // כאן המערכת מושכת את ה-API Key שהגדרת ב-Vercel Settings
    const apiKey = process.env.OPENAI_API_KEY; 

    if (!apiKey) {
      return NextResponse.json(
        { error: "API Key is missing in Vercel settings" },
        { status: 500 }
      );
    }

    // כאן תבוא הלוגיקה של הפנייה ל-AI (למשל OpenAI)
    // לדוגמה:
    // const response = await callYourAIModel(prompt, KNOWLEDGE_BASE, apiKey);

    return NextResponse.json({ 
      success: true, 
      message: "Build successful, API connection ready." 
    });

  } catch (error) {
    return NextResponse.json(
      { error: "Internal Server Error: " + error.message },
      { status: 500 }
    );
  }
}
