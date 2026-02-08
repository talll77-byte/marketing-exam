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
      title: "המעוז הדיגיטלי טלי יא יא", 
      sub: "חבר לימוד למבחן שיווק", 
      btn: "הפעלת ניווט", 
      placeholder: "שאל כל דבר על חומר המבחן...", 
      upload: "העלה צילום חומר", 
      modalTitle: "המעוז הדיגיטלי טלי יא יא",
      modalIntro: "ברוכים הבאים לחבר הלימוד האישי שלכם למבחן בשיווק.",
      modalCapabilities: "יכולות המערכת: ניתוח מושגי יסוד, פתרון שאלות ממבחני עבר, וסריקת סיכומים מצולמים מהמחברת.",
      modalUsage: "איך עובדים? הקלידו שאלה בתיבת הטקסט או העלו צילום של חומר לימוד. המערכת תנתח את המידע ותפיק עבורכם הסבר ממוקד למבחן.",
      close: "יאללה, בוא נצליח במבחן!"
    },
    en: { 
      title: "The Digital Stronghold", 
      sub: "Marketing Exam Study Buddy", 
      btn: "Activate Navigation", 
      placeholder: "Ask anything about the material...", 
      upload: "Upload Photo", 
      modalTitle: "The Digital Stronghold",
      modalIntro: "Welcome to your personal marketing exam companion.",
      modalCapabilities: "Capabilities: Concept analysis, exam question solving, and OCR scanning of handwritten notes.",
      modalUsage: "How to use? Enter a query or upload a photo of your material. The system will analyze the data and provide focused exam insights.",
      close: "Let's Get Started" 
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
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input, image }),
      });
      const data = await res.json();
      setResponse(data.message || data.error);
    } catch { setResponse("שגיאה בחיבור למערכת הארכיטקט."); }
    setLoading(false);
  };

  return (
    <div style={{ direction: isHebrew ? 'rtl' : 'ltr', width: '100%', display: 'flex', justifyContent: 'center' }}>
      
      {/* פופ-אפ הסבר מפורט */}
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontSize: '1.8rem', marginBottom: '15px'}}>
              {curr.modalTitle}
            </h2>
            <div style={{textAlign: isHebrew ? 'right' : 'left', color: '#94a3b8', lineHeight: '1.6'}}>
               <p><strong>מה זה הכלי?</strong> {curr.modalIntro}</p>
               <p><strong>מהן היכולות?</strong> {curr.modalCapabilities}</p>
               <p><strong>איך עובדים?</strong> {curr.modalUsage}</p>
            </div>
            <button onClick={() => setShowPopup(false)} className="main-btn" style={{marginTop: '25px'}}>
              {curr.close}
            </button>
          </div>
        </div>
      )}

      <div className="modern-card">
        <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
          <p style={{color: '#94a3b8', fontSize: '12px', margin: 0}}>{isHebrew ? 'סטטוס: פעיל' : 'STATUS: ONLINE'}</p>
          <button onClick={() => setIsHebrew(!isHebrew)} style={{background: 'none', border: '1px solid var(--glass-border)', color: '#94a3b8', cursor: 'pointer', borderRadius: '8px', padding: '5px 12px'}}>
            {isHebrew ? 'Switch to EN' : 'עבור לעברית'}
          </button>
        </div>

        <h1 style={{fontSize: '2.2rem', margin: '20px 0 5px 0', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: '800'}}>
          {curr.title}
        </h1>
        <p style={{color: '#94a3b8', fontSize: '1.1rem', marginTop: 0, marginBottom: '30px'}}>{curr.sub}</p>
        
        <input 
          value={input} 
          onChange={(e) => setInput(e.target.value)} 
          placeholder={curr.placeholder} 
        />
        
        <div style={{marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px'}}>
          <input type="file" id="file" hidden onChange={handleFile} accept="image/*" />
          <label htmlFor="file" style={{cursor: 'pointer', color: '#6366f1', fontSize: '14px', fontWeight: '600'}}>
            📷 {curr.upload}
          </label>
          {image && <span style={{fontSize: '12px', color: '#10b981'}}>✓ {isHebrew ? 'הקובץ מוכן' : 'Ready'}</span>}
        </div>

        <button onClick={handleExecute} disabled={loading} className="main-btn">
          {loading ? (isHebrew ? 'מעבד נתונים...' : 'Processing...') : curr.btn}
        </button>

        {response && (
          <div style={{marginTop: '30px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid var(--glass-border)'}}>
            <p style={{color: '#4fd1c5', fontSize: '12px', margin: '0 0 10px 0'}}>// SYSTEM_RESPONSE:</p>
            <p style={{lineHeight: '1.8', whiteSpace: 'pre-wrap', color: '#f8fafc'}}>{response}</p>
          </div>
        )}
      </div>

      {/* כפתור עזרה צף */}
      <button 
        className="help-btn" 
        onClick={() => setShowPopup(true)} 
        style={{position: 'fixed', bottom: '30px', right: '30px', borderRadius: '50%', width: '60px', height: '60px', background: 'var(--accent-gradient)', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold', fontSize: '24px', boxShadow: '0 10px 30px rgba(99, 102, 241, 0.4)'}}
      >
        ?
      </button>
    </div>
  );
}
