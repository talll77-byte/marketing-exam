import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, image } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      return NextResponse.json({ error: "Missing API Key in Vercel" }, { status: 500 });
    }

    const userContent = [{ type: "text", text: prompt }];
    if (image) {
      userContent.push({ type: "image_url", image_url: { url: image } });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // תמיכה במולטי-מודאליות
        messages: [
          { 
            role: "system", 
            content: "You are The Architect's Marketing Expert. Analyze inputs and images to provide concise, exam-focused answers." 
          },
          { role: "user", content: userContent }
        ]
      })
    });

    const data = await response.json();
    return NextResponse.json({ success: true, message: data.choices[0].message.content });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
