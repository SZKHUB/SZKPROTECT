import { useRef, useState } from "react";
import {
  Shield, Code2, ChevronDown, ArrowUpRight, Copy, Download, Upload,
  Trash2, LockKeyhole, Github, MessageCircle, Mail, Check, Sparkles,
  Menu, X, Terminal, ShieldCheck
} from "lucide-react";

const SAMPLE = `-- Welcome to SZKPROTECT
local function greet(name)
    local message = "Hello, " .. name
    print(message)
end

greet("world")`;

export default function App() {
  const [page, setPage] = useState("home");
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");
  const [notice, setNotice] = useState("");
  const [menuOpen, setMenuOpen] = useState(false);
  const fileRef = useRef(null);

  const notify = (message) => {
    setNotice(message);
    window.setTimeout(() => setNotice(""), 3200);
  };

  const copyOutput = async () => {
    if (!output) return notify("There is no output to copy yet.");
    try {
      await navigator.clipboard.writeText(output);
      notify("Output copied to clipboard.");
    } catch {
      notify("Clipboard access was blocked by your browser.");
    }
  };

  const downloadOutput = () => {
    if (!output) return notify("There is no output to download yet.");
    const blob = new Blob([output], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "szkprotected.lua";
    a.click();
    URL.revokeObjectURL(url);
  };

  const chooseFile = (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    if (!file.name.toLowerCase().endsWith(".lua")) {
      notify("Please upload a .lua file.");
      event.target.value = "";
      return;
    }
    if (file.size > 500 * 1024) {
      notify("File is too large. Maximum size is 500 KB.");
      event.target.value = "";
      return;
    }
    const reader = new FileReader();
    reader.onload = () => {
      setCode(String(reader.result || ""));
      setOutput("");
      notify(`${file.name} loaded.`);
    };
    reader.onerror = () => notify("Could not read that file.");
    reader.readAsText(file);
    event.target.value = "";
  };

  const startObfuscation = () => {
    if (!code.trim()) return notify("Paste or upload Lua code first.");
    notify("Obfuscation engine is not connected yet. No fake result was generated.");
  };

  const showLogin = () => notify("Authentication setup is required before sign-in is available.");

  return (
    <div className="app-shell">
      <header className="topbar">
        <button className="brand" onClick={() => setPage("home")} aria-label="SZKPROTECT home">
          <span className="brand-mark"><Shield size={21} strokeWidth={2.3} /></span>
          <span>SZK<span className="brand-muted">PROTECT</span><small> LUA PROTECTION</small></span>
        </button>
        <nav className={menuOpen ? "nav-links open" : "nav-links"}>
          <button className={page === "home" ? "nav-link active" : "nav-link"} onClick={() => {setPage("home"); setMenuOpen(false);}}>Home</button>
          <button className={page === "v1" ? "nav-link active" : "nav-link"} onClick={() => {setPage("v1"); setMenuOpen(false);}}>Version 1.0</button>
          <button className={page === "v2" ? "nav-link active" : "nav-link"} onClick={() => {setPage("v2"); setMenuOpen(false);}}>Premium <span className="soon-pill">SOON</span></button>
        </nav>
        <div className="nav-actions">
          <button className="btn btn-ghost login-btn" onClick={showLogin}>Log in</button>
          <button className="btn btn-white nav-cta" onClick={() => setPage("v1")}>Open workspace <ArrowUpRight size={15}/></button>
        </div>
        <button className="mobile-menu" aria-label="Toggle menu" onClick={() => setMenuOpen(!menuOpen)}>{menuOpen ? <X/> : <Menu/>}</button>
      </header>

      {page === "v2" ? (
        <main className="coming-page">
          <div className="eyebrow"><LockKeyhole size={14}/> PREMIUM ACCESS LOCKED</div>
          <div className="coming-icon"><ShieldCheck size={34}/></div>
          <h1>More protection.<br/><span>Not quite yet.</span></h1>
          <p className="coming-copy">SZKPROTECT 2.0 is being prepared. Premium access and payments are disabled for now and will remain locked until the official release.</p>
          <div className="release-card">
            <div><span className="muted-label">PLANNED PRICE</span><strong>$1 <small>/ month</small></strong></div>
            <div className="release-divider"/>
            <div><span className="muted-label">STATUS</span><strong className="release-status"><span className="status-dot"/> Coming soon</strong></div>
          </div>
          <button className="btn btn-white" onClick={() => setPage("v1")}>Back to version 1.0 <ArrowUpRight size={16}/></button>
          <p className="tiny-note">No checkout is available. No payment will be collected.</p>
        </main>
      ) : page === "v1" ? (
        <main className="workspace-page">
          <div className="workspace-heading">
            <div><div className="eyebrow"><span className="live-dot"/> STANDARD WORKSPACE</div><h1>Lua <span>workspace.</span></h1><p>Paste your Lua source below. Engine integration is required to run real obfuscation.</p></div>
            <div className="version-tag"><span className="version-dot"/> SZKPROTECT 1.0</div>
          </div>
          <div className="editor-grid">
            <section className="editor-card">
              <div className="editor-head"><div><span className="file-icon">{"</>"}</span><strong>Input source</strong><span className="file-ext">LUA</span></div><div className="editor-tools"><button title="Upload .lua file" onClick={() => fileRef.current?.click()}><Upload size={15}/> <span>Upload</span></button><button title="Clear input" onClick={() => {setCode("");setOutput("");}}><Trash2 size={15}/></button></div></div>
              <div className="editor-body"><div className="line-numbers">{Array.from({length: Math.max(12, code.split("\n").length)}, (_, i) => <span key={i}>{i+1}</span>)}</div><textarea spellCheck="false" aria-label="Lua source code" value={code} onChange={e => setCode(e.target.value)} placeholder={"-- Paste your Lua code here\n\nlocal function hello()\n    print(\"Hello world\")\nend"} /></div>
              <div className="editor-foot"><span>{code.length.toLocaleString()} characters</span><span>Max file size: 500 KB</span></div>
            </section>
            <section className="editor-card output-card">
              <div className="editor-head"><div><span className="output-icon"><Shield size={15}/></span><strong>Protected output</strong><span className="file-ext">LUA</span></div><div className="editor-tools"><button onClick={copyOutput}><Copy size={15}/><span>Copy</span></button><button onClick={downloadOutput}><Download size={15}/></button></div></div>
              <div className="editor-body output-body">{output ? <><div className="line-numbers">{Array.from({length: output.split("\n").length}, (_, i) => <span key={i}>{i+1}</span>)}</div><textarea readOnly aria-label="Obfuscated Lua output" value={output}/></> : <div className="output-empty"><div className="empty-icon"><LockKeyhole size={21}/></div><strong>Your output will appear here</strong><p>Run the configured obfuscation engine to generate protected Lua.</p></div>}</div>
              <div className="editor-foot"><span>{output ? `${output.length.toLocaleString()} characters` : "Waiting for a job"}</span><span className="privacy-label"><ShieldCheck size={13}/> Private workspace UI</span></div>
            </section>
          </div>
          <div className="run-row"><div className="run-info"><ShieldCheck size={16}/><span>Lua only · Input limit 500 KB · Server engine not connected</span></div><button className="btn btn-white run-btn" onClick={startObfuscation}><Sparkles size={16}/> Obfuscate Lua <ArrowUpRight size={15}/></button></div>
          <div className="setup-warning"><LockKeyhole size={17}/><div><strong>Engine setup required</strong><p>This starter intentionally does not fake obfuscation. Connect an authorized Lua obfuscation engine on the server before enabling the action.</p></div></div>
        </main>
      ) : (
        <main>
          <section className="hero">
            <div className="hero-copy">
              <div className="eyebrow"><span className="live-dot"/> LUA CODE PROTECTION WORKSPACE</div>
              <h1>Your Lua.<br/><span>Your rules.</span></h1>
              <p className="hero-sub">A clean workspace for Lua code protection. Paste your script, prepare your workflow, and keep your projects organized.</p>
              <div className="hero-buttons"><button className="btn btn-white btn-large" onClick={() => setPage("v1")}>Open free workspace <ArrowUpRight size={17}/></button><button className="btn btn-outline btn-large" onClick={() => setPage("v2")}><LockKeyhole size={15}/> Explore Premium</button></div>
              <div className="trust-line"><span><Check size={14}/> Lua-focused</span><span><Check size={14}/> Black & white</span><span><Check size={14}/> Premium locked for now</span></div>
            </div>
            <div className="hero-visual">
              <div className="visual-top"><div className="window-dots"><i/><i/><i/></div><span>example.lua</span><span className="lua-tag">LUA</span></div>
              <div className="code-preview"><div><em>01</em><span className="code-purple">local</span> <span className="code-blue">function</span> <span className="code-white">protect</span><span className="code-muted">(source)</span></div><div><em>02</em>  <span className="code-purple">if</span> <span className="code-white">source</span> <span className="code-purple">then</span></div><div><em>03</em>    <span className="code-blue">return</span> <span className="code-green">"ready"</span></div><div><em>04</em>  <span className="code-purple">end</span></div><div><em>05</em><span className="code-purple">end</span></div><div><em>06</em></div><div><em>07</em><span className="code-muted">-- Your workflow starts here</span></div></div>
              <div className="visual-bottom"><span><span className="status-dot"/> Editor ready</span><span>UTF-8 <b>·</b> Lua</span></div>
              <div className="floating-chip"><ShieldCheck size={16}/><span><strong>Built security-first</strong><small>Server-side validation planned</small></span></div>
            </div>
            <div className="hero-gridline"/>
          </section>
          <section className="feature-section">
            <div className="section-heading"><div className="eyebrow">THE WORKSPACE</div><h2>Everything in its <span>right place.</span></h2><p>A focused interface, built around your Lua workflow.</p></div>
            <div className="feature-grid">
              <article className="feature-card"><div className="feature-icon"><Code2 size={20}/></div><h3>Lua-first editor</h3><p>A dedicated space to paste or upload Lua source, with clear input and output panels.</p><span className="feature-index">01 / EDIT</span></article>
              <article className="feature-card"><div className="feature-icon"><ShieldCheck size={20}/></div><h3>Security-minded</h3><p>Designed around server-side validation and keeping private service credentials off the client.</p><span className="feature-index">02 / PROTECT</span></article>
              <article className="feature-card"><div className="feature-icon"><LockKeyhole size={20}/></div><h3>Premium, later</h3><p>Version 2.0 is visible for transparency, but subscriptions and checkout stay disabled until launch.</p><span className="feature-index">03 / COMING SOON</span></article>
            </div>
          </section>
          <section className="version-section">
            <div><div className="eyebrow">PICK YOUR WORKSPACE</div><h2>Start free.<br/><span>Premium comes later.</span></h2></div>
            <div className="version-cards">
              <button className="version-card" onClick={() => setPage("v1")}><span className="version-card-top">SZKPROTECT 1.0 <span className="available">AVAILABLE UI</span></span><strong>Free</strong><p>Standard workspace and Lua input/output interface.</p><span className="card-link">Open version 1.0 <ArrowUpRight size={15}/></span></button>
              <button className="version-card premium-card" onClick={() => setPage("v2")}><span className="version-card-top">SZKPROTECT 2.0 <span className="locked">LOCKED</span></span><strong>$1 <small>/ month</small></strong><p>Planned Premium release. No payments or subscriptions yet.</p><span className="card-link">View release status <ArrowUpRight size={15}/></span></button>
            </div>
          </section>
          <section className="community-strip"><div className="community-icon"><MessageCircle size={21}/></div><div><strong>Find your people.</strong><p>Join the community for announcements and release updates.</p></div><a className="btn btn-outline" href="https://discord.gg/kfhnayRegX" target="_blank" rel="noreferrer">Join Discord <ArrowUpRight size={15}/></a></section>
        </main>
      )}

      <footer className="footer"><button className="brand footer-brand" onClick={() => setPage("home")}><span className="brand-mark"><Shield size={17}/></span><span>SZK<span className="brand-muted">PROTECT</span></span></button><span>Lua protection workspace <span className="footer-sep">/</span> Built with care.</span><div className="footer-links"><a href="https://discord.gg/kfhnayRegX" target="_blank" rel="noreferrer">Discord <ArrowUpRight size={12}/></a><a href="https://github.com/" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={12}/></a></div></footer>
      <input ref={fileRef} type="file" accept=".lua,text/plain" hidden onChange={chooseFile}/>
      {notice && <div className="toast" role="status"><Terminal size={16}/>{notice}</div>}
    </div>
  );
}