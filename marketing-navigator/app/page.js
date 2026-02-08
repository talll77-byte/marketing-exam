"use client";
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    if (!input) return;
    setLoading(true);
    setResponse(''); // ניקוי תשובה קודמת
    
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt: input }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        setResponse(data.message);
      } else {
        setResponse("ERROR: " + (data.error || "Unknown system failure"));
      }
    } catch (err) {
      setResponse("CRITICAL ERROR: Connection to Architect-Mainframe lost.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="window">
      <div className="title-bar">
        <div className="dot r"></div><div className="dot y"></div><div className="dot g"></div>
        <span style={{fontSize: '12px', color: '#718096', marginLeft: '10px'}}>architect_terminal.v1</span>
      </div>

      <div className="content">
        <h1 style={{color: '#3b82f6'}}>> Marketing Navigator_</h1>
        <p style={{color: '#a0aec0', marginBottom: '20px'}}>Ready for commands. Knowledge base initialized.</p>
        
        <div style={{marginTop: '20px'}}>
          <label style={{fontSize: '12px', color: '#4fd1c5'}}>PROMPT_INPUT:</label>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleExecute()}
            placeholder="Ask about Marketing vs Selling, Supply & Demand..." 
          />
          <button onClick={handleExecute} disabled={loading || !input}>
            {loading ? 'EXECUTING... [7%]' : 'RUN COMMAND'}
          </button>
        </div>

        {response && (
          <div style={{marginTop: '25px', padding: '15px', background: '#0f172a', border: '1px solid #334155', borderRadius: '4px'}}>
            <p style={{color: '#4fd1c5', margin: '0 0 10px 0'}}>// SYSTEM_OUTPUT:</p>
            <p style={{lineHeight: '1.6', color: '#f8fafc'}}>{response}</p>
          </div>
        )}

        <div style={{marginTop: '20px', fontSize: '11px', color: '#4a5568'}}>
          STATUS: ONLINE | ENCRYPTION: ACTIVE | PORT: 3000
        </div>
      </div>
    </div>
  );
}
