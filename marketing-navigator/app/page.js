"use client";
import { useState } from 'react';

export default function Page() {
  const [input, setInput] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const handleExecute = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/generate', {
        method: 'POST',
        body: JSON.stringify({ prompt: input }),
      });
      const data = await res.json();
      setResponse(data.message || data.error);
    } catch (err) {
      setResponse("Error connecting to system.");
    }
    setLoading(false);
  };

  return (
    <div className="window">
      <div className="title-bar">
        <div className="dot r"></div><div className="dot y"></div><div className="dot g"></div>
        <span style={{fontSize: '12px', color: '#718096', marginLeft: '10px'}}>architect_terminal.exe</span>
      </div>

      <div className="content">
        <h1 style={{color: '#3b82f6'}}>> Marketing Navigator_</h1>
        
        <div style={{marginTop: '20px'}}>
          <input 
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Enter marketing command..." 
          />
          <button onClick={handleExecute} disabled={loading}>
            {loading ? 'EXECUTING...' : 'EXECUTE'}
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
  );
}
