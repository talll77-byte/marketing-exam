"use client";
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [image, setImage] = useState(null);
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [isHebrew, setIsHebrew] = useState(true);

  const t = {
    he: { 
      title: "המעוז הדיגיטלי טלי יא יא", sub: "חבר לימוד למבחן שיווק", btn: "הפעלת ניווט", placeholder: "שאל כל דבר...", upload: "העלה צילום חומר",
      modalTitle: "המעוז הדיגיטלי טלי יא יא",
      q1: "מה זה הכלי?", a1: "חבר לימוד אינטליגנטי המותאם אישית למבחני שיווק ויזמות.",
      q2: "יכולות המערכת:", a2: "ניתוח מושגים, סיכום חומר מורכב, וזיהוי טקסט מצילום מחברות/מצגות.",
      q3: "איך לעבוד איתו?", a3: "הקלידו שאלה או העלו תמונה. המערכת תנתח את המידע ותספק תשובה ממוקדת למבחן.",
      close: "בוא נצליח במבחן!"
    },
    en: { 
      title: "Digital Stronghold", sub: "Marketing Study Buddy", btn: "Start Navigation", placeholder: "Ask anything...", upload: "Upload Photo",
      modalTitle: "Digital Stronghold",
      q1: "What is this tool?", a1: "An intelligent study companion tailored for marketing exams.",
      q2: "Capabilities:", a2: "Concept analysis, topic summarization, and OCR photo scanning.",
      q3: "How to use?", a3: "Enter a prompt or upload a photo for focused exam insights.",
      close: "Let's Go!" 
    }
  };

  const curr = isHebrew ? t.he : t.en;

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  const handleExecute = async () => {
    if (!input && !image) return;
    setLoading(true); setResponse('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, image }),
      });
      const data = await res.json();
      setResponse(data.message || data.error);
    } catch { setResponse("שגיאה בחיבור למעוז הדיגיטלי."); }
    setLoading(false);
  };

  return (
    <div style={{ direction: isHebrew ? 'rtl' : 'ltr', width: '100%', display: 'flex', justifyContent: 'center' }}>
      
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.8rem', marginBottom: '20px'}}>{curr.modalTitle}</h2>
            <div style={{textAlign: isHebrew ? 'right' : 'left', color: '#94a3b8', lineHeight: '1.6', fontSize: '0.95rem'}}>
               <p><strong>1. {curr.q1}</strong> {curr.a1}</p>
               <p><strong>2. {curr.q2}</strong> {curr.a2}</p>
               <p><strong>3. {curr.q3}</strong> {curr.a3}</p>
            </div>
            <button onClick={() => setShowPopup(false)} className="main-btn" style={{marginTop: '25px'}}>{curr.close}</button>
          </div>
        </div>
      )}

      <div className="modern-card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <p style={{color: '#94a3b8', fontSize: '11px', margin: 0}}>{isHebrew ? 'סטטוס: פעיל' : 'STATUS: ONLINE'}</p>
          <button onClick={() => setIsHebrew(!isHebrew)} style={{background: 'none', border: '1px solid var(--glass-border)', color: '#94a3b8', cursor: 'pointer', borderRadius: '8px', padding: '4px 10px'}}>{isHebrew ? 'EN' : 'עב'}</button>
        </div>

        <h1 style={{fontSize: '2.2rem', margin: '20px 0 5px 0', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800'}}>{curr.title}</h1>
        <p style={{color: '#94a3b8', fontSize: '1.1rem', marginTop: 0, marginBottom: '30px'}}>{curr.sub}</p>
        
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={curr.placeholder} />
        
        <div style={{marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <input type="file" id="file" hidden onChange={handleFile} accept="image/*" />
          <label htmlFor="file" style={{cursor: 'pointer', color: '#6366f1', fontSize: '14px'}}>📷 {curr.upload}</label>
          {image && <span style={{fontSize: '12px', color: '#10b981'}}>✓ מוכן</span>}
        </div>

        <button onClick={handleExecute} disabled={loading} className="main-btn">
          {loading ? (isHebrew ? 'מנתח נתונים...' : 'Processing...') : curr.btn}
        </button>

        {response && (
          <div style={{marginTop: '30px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid var(--glass-border)'}}>
            <p style={{lineHeight: '1.8', whiteSpace: 'pre-wrap', color: '#f8fafc'}}>{response}</p>
          </div>
        )}
      </div>

      <button className="help-btn" onClick={() => setShowPopup(true)}>?</button>
    </div>
  );
}
