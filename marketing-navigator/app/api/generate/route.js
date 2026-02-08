export async function POST(req) {
  try {
    const { prompt, image } = await req.json();
    const apiKey = process.env.OPENAI_API_KEY;

    // בניית תוכן ההודעה - תמיכה בטקסט ובתמונה במקביל
    const userContent = [{ type: "text", text: prompt }];
    
    if (image) {
      userContent.push({
        type: "image_url",
        image_url: { url: image } // התמונה מגיעה כ-Data URL (Base64)
      });
    }

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: "gpt-4o", // מודל שתומך בראייה (Vision)
        messages: [
          { role: "system", content: "You are The Architect's Marketing Expert. Use the provided knowledge and images to answer." },
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
