import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, image } = await req.json();
    const apiKey = process.env.gemini_API_KEY; 

    if (!apiKey) {
      return NextResponse.json({ error: "Missing gemini_API_KEY in Vercel" }, { status: 500 });
    }

    // כתובת ה-API הרשמית לגרסה היציבה ביותר
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [
          { text: prompt || "Analyze this material and provide a summary for a marketing exam." },
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
    
    if (data.error) {
      return NextResponse.json({ error: "Google AI Error: " + data.error.message }, { status: 500 });
    }

    if (!data.candidates || data.candidates.length === 0) {
      return NextResponse.json({ error: "No response from AI." }, { status: 500 });
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ success: true, message: aiResponse });

  } catch (error) {
    return NextResponse.json({ error: "System Error: " + error.message }, { status: 500 });
  }
}
