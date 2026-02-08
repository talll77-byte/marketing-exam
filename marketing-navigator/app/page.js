export default function Page() {
  return (
    <div className="window">
      {/* סרגל macOS */}
      <div className="title-bar">
        <div className="dot r"></div>
        <div className="dot y"></div>
        <div className="dot g"></div>
        <span style={{fontSize: '12px', color: '#718096', marginLeft: '10px'}}>architect_terminal.exe</span>
      </div>

      <div className="content">
        <h1 style={{color: '#3b82f6'}}>> Marketing Navigator_</h1>
        <p style={{color: '#a0aec0'}}>System ready. Knowledge base loaded.</p>
        
        <div style={{marginTop: '40px'}}>
          <label>ENTER COMMAND / PROMPT:</label>
          <input type="text" placeholder="Type your marketing question..." />
          <button>EXECUTE</button>
        </div>

        <div style={{marginTop: '30px', fontSize: '14px', color: '#4fd1c5'}}>
          // Connection Status: Secure
        </div>
      </div>
    </div>
  );
}
