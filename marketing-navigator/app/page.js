"use client";
import { useState, useEffect } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(true); // פופ-אפ התחלתי
  const [isHebrew, setIsHebrew] = useState(true); // ניהול שפה

  const t = {
    he: {
      title: "> נווט השיווק_",
      sub: "מערכת מוכנה. בסיס ידע נטען.",
      label: "הזן פקודה / שאלה:",
      btn: "הרץ פקודה",
      status: "סטטוס: מחובר",
      help: "?",
      modalTitle: "ברוך הבא לארכיטקט!",
      modalBody: "כלי זה נועד לעזור לך לשלוט בחומר המבחן בשיווק. הוא מבוסס על נתוני יסוד של שיווק ויזמות. טיפ להצלחה: שאל שאלות ספציפיות כמו 'מה ההבדל בין שיווק למכירה?' או 'הסבר את עקרון הביקוש'.",
      close: "הבנתי, בוא נתחיל"
    },
    en: {
      title: "> Marketing Navigator_",
      sub: "System ready. Knowledge base loaded.",
      label: "ENTER COMMAND / PROMPT:",
      btn: "EXECUTE",
      status: "STATUS: ONLINE",
      help: "?",
      modalTitle: "Welcome, Architect!",
      modalBody: "This tool is designed to help you master Marketing exams. Use specific prompts like 'Explain Supply & Demand' for best results.",
      close: "Let's Start"
    }
  };

  const curr = isHebrew ? t.he : t.en;

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
      setResponse("CONNECTION ERROR");
    }
    setLoading(false);
  };

  return (
    <div style={{ direction: isHebrew ? 'rtl' : 'ltr', width: '100%', display: 'flex', justifyContent: 'center' }}>
      
      {/* פופ-אפ הסבר */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{color: '#3b82f6'}}>{curr.modalTitle}</h2>
            <p style={{lineHeight: '1.6'}}>{curr.modalBody}</p>
            <button onClick={() => setShowPopup(false)} style={{marginTop: '20px'}}>{curr.close}</button>
          </div>
        </div>
      )}

      <div className="window">
        <div className="title-bar" style={{justifyContent: 'space-between'}}>
          <div style={{display: 'flex', gap: '8px'}}>
            <div className="dot r"></div><div className="dot y"></div><div className="dot g"></div>
          </div>
          <button onClick={() => setIsHebrew(!isHebrew)} style={{width: 'auto', padding: '2px 8px', fontSize: '10px', margin: 0}}>
            {isHebrew ? 'Switch to English' : 'עבור לעברית'}
          </button>
        </div>

        <div className="content">
          <h1 style={{color: '#3b82f6'}}>{curr.title}</h1>
          <p style={{color: '#a0aec0'}}>{curr.sub}</p>
          
          <div style={{marginTop: '30px'}}>
            <label style={{fontSize: '12px', color: '#4fd1c5'}}>{curr.label}</label>
            <input 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="..." 
            />
            <button onClick={handleExecute} disabled={loading}>
              {loading ? '...' : curr.btn}
            </button>
          </div>

          {response && (
            <div style={{marginTop: '20px', padding: '15px', background: '#0f172a', border: '1px solid #334155'}}>
              <p style={{color: '#4fd1c5'}}>// SYSTEM_RESPONSE:</p>
              <p>{response}</p>
            </div>
          )}
        </div>
      </div>

      <button className="help-btn" onClick={() => setShowPopup(true)} title="Help">{curr.help}</button>
    </div>
  );
}
