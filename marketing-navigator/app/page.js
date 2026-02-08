"use client";
import { useState } from 'react';

export default function Home() {
  const [desc, setDesc] = useState("");
  const [result, setResult] = useState("");
  const [loading, setLoading] = useState(false);

  const handleGenerate = async () => {
    setLoading(true);
    const res = await fetch('/api/generate', {
      method: 'POST',
      body: JSON.stringify({ businessDescription: desc }),
    });
    const data = await res.json();
    setResult(data.html);
    setLoading(false);
  };

  return (
    <div style={{ padding: '50px', fontFamily: 'sans-serif', textAlign: 'right' }} dir="rtl">
      <h1>The Architect: Marketing Exam Navigator</h1>
      <textarea 
        value={desc} 
        onChange={(e) => setDesc(e.target.value)}
        placeholder="תאר את העסק שלך כאן..."
        style={{ width: '100%', height: '150px', padding: '10px', fontSize: '16px' }}
      />
      <button 
        onClick={handleGenerate} 
        disabled={loading}
        style={{ marginTop: '20px', padding: '10px 20px', cursor: 'pointer', background: '#e67e22', color: 'white', border: 'none', borderRadius: '5px' }}
      >
        {loading ? "מעבד נתונים..." : "ייצר תוכנית למידה מותאמת"}
      </button>
      <div style={{ marginTop: '40px' }} dangerouslySetInnerHTML={{ __html: result }} />
    </div>
  );
}