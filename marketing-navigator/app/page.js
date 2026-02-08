"use client";
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const [isHebrew, setIsHebrew] = useState(true);

  const t = {
    he: {
      title: "נווט השיווק", // הורדנו את ה-> וה- _
      sub: "מערכת הארכיטקט לשליטה בחומר הלימוד.",
      label: "מה תרצה לחקור היום?",
      placeholder: "לדוגמה: הסבר על מודל 4P...",
      btn: "הפעלת ניווט",
      help: "?",
      modalTitle: "ברוכים הבאים לארכיטקט",
      modalBody: "כלי זה עוצב כדי לעזור לך להבין לעומק את עקרונות השיווק. המערכת מבוססת על ידע יזמי מתקדם. לקבלת התוצאות הטובות ביותר, נסחו שאלות ממוקדות וברורות.",
      close: "התחל מסע"
    },
    en: {
      title: "Marketing Navigator",
      sub: "The Archetype system for mastering study material.",
      label: "What would you like to explore?",
      placeholder: "E.g., Explain the 4Ps model...",
      btn: "Activate Navigation",
      help: "?",
      modalTitle: "Welcome to The Archetype",
      modalBody: "This tool is crafted to help you deeply understand marketing principles base on advanced entrepreneurial knowledge. For best results, phrase focused and clear prompts.",
      close: "Start Journey"
    }
  };

  const curr = isHebrew ? t.he : t.en;
  const toggleLang = () => setIsHebrew(!isHebrew);

  const handleExecute = async () => {
    if (!input) return;
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResponse(data.message || data.error);
    } catch (err) {
      setResponse("שגיאת התחברות למערכת.");
    }
    setLoading(false);
  };

  return (
    <div style={{ direction: isHebrew ? 'rtl' : 'ltr', width: '100%', display: 'flex', justifyContent: 'center' }}>
      
      {/* פופ-אפ מודרני */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal animate-pop-in">
            <h2 style={{background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '2rem', margin: '0 0 20px 0'}}>{curr.modalTitle}</h2>
            <p style={{lineHeight: '1.7', color: 'var(--text-secondary)', fontSize: '1.1rem'}}>{curr.modalBody}</p>
            <button onClick={() => setShowPopup(false)} className="main-btn" style={{marginTop: '30px'}}>{curr.close}</button>
          </div>
        </div>
      )}

      <div className="modern-card">
        <div className="content">
          
          {/* כפתור שפה נקי */}
          <div style={{display: 'flex', justifyContent: 'flex-end', marginBottom: '20px'}}>
            <button onClick={toggleLang} style={{background: 'transparent', border: '1px solid var(--glass-border)', padding: '8px 16px', fontSize: '14px', color: 'var(--text-secondary)'}}>
              {isHebrew ? 'EN' : 'עב'}
            </button>
          </div>

          {/* כותרות מודרניות */}
          <h1 style={{fontWeight: 800, fontSize: '2.5rem', margin: '0 0 10px 0', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>
            {curr.title}
          </h1>
          <p style={{color: 'var(--text-secondary)', fontSize: '1.2rem', marginTop: '0'}}>{curr.sub}</p>
          
          <div style={{marginTop: '40px'}}>
            <label style={{fontSize: '1rem', color: 'var(--text-primary)', fontWeight: 600, display: 'block', marginBottom: '12px'}}>{curr.label}</label>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={curr.placeholder}
            />
            <button onClick={handleExecute} disabled={loading} className="main-btn">
              {loading ? (isHebrew ? 'מעבד נתונים...' : 'Processing...') : curr.btn}
            </button>
          </div>

          {response && (
            <div style={{marginTop: '30px', padding: '25px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid var(--glass-border)'}}>
              <p style={{lineHeight: '1.8', color: 'var(--text-primary)', whiteSpace: 'pre-wrap', fontSize: '1.1rem'}}>{response}</p>
            </div>
          )}
        </div>
      </div>

      <button className="help-btn" onClick={() => setShowPopup(true)} title="Help">{curr.help}</button>
    </div>
  );
}
