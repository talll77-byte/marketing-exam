import { NextResponse } from 'next/server';

export const runtime = 'edge'; 

export async function POST(req) {
  try {
    const { prompt, image } = await req.json();
    const apiKey = process.env.gemini_API_KEY; 

    if (!apiKey) return NextResponse.json({ error: "Missing API Key" }, { status: 500 });

    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [
          { text: "אתה 'המעוז הדיגיטלי', מומחה שיווק חריף שעוזר לסטודנטים בבראודה. ענה בעברית, השתמש במושגים מקצועיים ודוגמאות מהשטח." },
          { text: prompt || "Analyze this." },
          ...(image ? [{ inline_data: { mime_type: "image/jpeg", data: image.split(',')[1] } }] : [])
        ]
      }]
    };

    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const data = await response.json();
    const aiResponse = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ success: true, message: aiResponse });
  } catch (error) {
    return NextResponse.json({ error: "System Error" }, { status: 500 });
  }
}
