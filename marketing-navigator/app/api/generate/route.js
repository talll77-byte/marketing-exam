import { NextResponse } from 'next/server';

export async function POST(req) {
  try {
    const { prompt, image } = await req.json();
    const apiKey = process.env.gemini_API_KEY; 

    if (!apiKey || apiKey.startsWith('gen-lang')) {
      return NextResponse.json({ error: "Invalid API Key format. Use the AIza... key." }, { status: 500 });
    }

    // כתובת יציבה לביצוע שאילתות
    const apiUrl = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const payload = {
      contents: [{
        parts: [
          { text: prompt || "Analyze this marketing material." },
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
      return NextResponse.json({ error: "Google API Error: " + data.error.message }, { status: 500 });
    }

    const aiResponse = data.candidates[0].content.parts[0].text;
    return NextResponse.json({ success: true, message: aiResponse });

  } catch (error) {
    return NextResponse.json({ error: "System Error: " + error.message }, { status: 500 });
  }
}
