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
    he: { title: "נווט השיווק", sub: "מערכת הארכיטקט", btn: "הפעלת ניווט", placeholder: "שאל כל דבר...", upload: "העלה צילום חומר", modalTitle: "ברוכים הבאים", modalBody: "השתמשו בכלי כדי לסכם חומר, לנתח תמונות מהמחברת ולתרגל למבחן.", close: "הבנתי, קדימה" },
    en: { title: "Marketing Navigator", sub: "The Architect System", btn: "Activate Navigation", placeholder: "Ask anything...", upload: "Upload Photo", modalTitle: "Welcome", modalBody: "Use this tool to summarize material, analyze handwritten notes, and practice for exams.", close: "Let's Go" }
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
    setLoading(true);
    setResponse('');
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt: input, image }),
      });
      const data = await res.json();
      setResponse(data.message || data.error);
    } catch { setResponse("Error connecting to system."); }
    setLoading(false);
  };

  return (
    <div style={{ direction: isHebrew ? 'rtl' : 'ltr', width: '100%', display: 'flex', justifyContent: 'center' }}>
      {showPopup && (
        <div className="modal-overlay">
          <div className="modal">
            <h2 style={{background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{curr.modalTitle}</h2>
            <p style={{color: '#94a3b8', lineHeight: '1.6'}}>{curr.modalBody}</p>
            <button onClick={() => setShowPopup(false)} className="main-btn">{curr.close}</button>
          </div>
        </div>
      )}

      <div className="modern-card">
        <button onClick={() => setIsHebrew(!isHebrew)} style={{background: 'none', border: '1px solid var(--glass-border)', color: '#94a3b8', cursor: 'pointer', borderRadius: '8px', padding: '5px 10px', float: isHebrew ? 'left' : 'right'}}>{isHebrew ? 'EN' : 'עב'}</button>
        <h1 style={{fontSize: '2.5rem', margin: '10px 0', background: 'var(--accent-gradient)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent'}}>{curr.title}</h1>
        <p style={{color: '#94a3b8'}}>{curr.sub}</p>
        
        <input value={input} onChange={(e) => setInput(e.target.value)} placeholder={curr.placeholder} />
        
        <div style={{marginBottom: '15px'}}>
          <input type="file" id="file" hidden onChange={handleFile} accept="image/*" />
          <label htmlFor="file" style={{cursor: 'pointer', color: '#6366f1', fontSize: '14px'}}>📷 {curr.upload}</label>
          {image && <span style={{fontSize: '12px', color: '#10b981', marginLeft: '10px'}}> ✓ Ready</span>}
        </div>

        <button onClick={handleExecute} disabled={loading} className="main-btn">
          {loading ? '...' : curr.btn}
        </button>

        {response && (
          <div style={{marginTop: '30px', padding: '20px', background: 'rgba(0,0,0,0.2)', borderRadius: '16px', border: '1px solid var(--glass-border)'}}>
            <p style={{lineHeight: '1.8', whiteSpace: 'pre-wrap'}}>{response}</p>
          </div>
        )}
      </div>
      <button onClick={() => setShowPopup(true)} style={{position: 'fixed', bottom: '20px', right: '20px', borderRadius: '50%', width: '50px', height: '50px', background: 'var(--accent-gradient)', border: 'none', color: 'white', cursor: 'pointer', fontWeight: 'bold'}}>?</button>
    </div>
  );
}
