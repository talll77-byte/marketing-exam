import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, image } = await req.json();
    
    // כאן אנחנו משתמשים בדיוק בשם שנתת בוורסל
    const apiKey = process.env.gemini_API_KEY; 

    if (!apiKey) {
      return NextResponse.json({ error: "Missing gemini_API_KEY in Vercel" }, { status: 500 });
    }

    // פנייה ישירה ל-API של Gemini (Google AI)
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [
          { text: prompt },
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
    
    if (data.error) throw new Error(data.error.message);

    const aiResponse = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ success: true, message: aiResponse });

  } catch (error) {
    return NextResponse.json({ error: "System Error: " + error.message }, { status: 500 });
  }
}
