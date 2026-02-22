import { useState } from 'react';
import { ROLES } from '../data/constants';
import '../styles/auth.css';

function Auth({ onLogin }) {
  const [role, setRole] = useState('admin');
  const [user, setUser] = useState('');
  const [pass, setPass] = useState('');
  const [err, setErr]   = useState('');

  const submit = e => {
    e.preventDefault();
    if (!user.trim() || !pass.trim()) { setErr('Username and password required.'); return; }
    onLogin({ name: user.trim(), role, initials: user.trim().slice(0,2).toUpperCase() });
  };
  const demo = (r='admin') => onLogin({ name: r === 'admin' ? 'Alex Admin' : r === 'manager' ? 'Morgan Mgr' : 'Val Viewer', role: r, initials: r === 'admin' ? 'AA' : r === 'manager' ? 'MM' : 'VV' });

  return (
    <div className="auth-screen">
      <div className="auth-grid-bg"/>
      <div className="auth-panel">
        <div className="auth-header">
          <div className="auth-logo-icon">
            <svg width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
              <rect x="2" y="7" width="20" height="14" rx="1"/><path d="M16 7V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v2"/><line x1="12" y1="12" x2="12" y2="16"/><circle cx="12" cy="12" r="1" fill="currentColor"/>
            </svg>
          </div>
          <div>
            <div className="auth-logo-name">Stock<span>OS</span></div>
            <div className="auth-logo-sub">Inventory Management System</div>
          </div>
        </div>
        <div className="auth-body">
          {err && <div className="auth-error">⚠ {err}</div>}
          <div className="auth-section-label">Select Role</div>
          <div className="auth-role-grid">
            {Object.entries(ROLES).map(([k,v]) => (
              <button key={k} className={`auth-role-btn${role===k?' selected':''}`} onClick={() => { setRole(k); setErr(''); }}>
                <div className="auth-role-name">{v.label}</div>
                <div className="auth-role-desc">
                  {k==='admin'?'Full access':''}
                  {k==='manager'?'Edit, no delete':''}
                  {k==='viewer'?'Read only':''}
                </div>
              </button>
            ))}
          </div>
          <form onSubmit={submit}>
            <div className="auth-section-label" style={{marginBottom:10}}>Credentials</div>
            <div className="auth-field">
              <label>Username</label>
              <input className="auth-input" type="text" placeholder="enter username"
                value={user} onChange={e=>{setUser(e.target.value);setErr('');}} />
            </div>
            <div className="auth-field">
              <label>Password</label>
              <input className="auth-input" type="password" placeholder="••••••••"
                value={pass} onChange={e=>{setPass(e.target.value);setErr('');}} />
            </div>
            <button className="auth-submit" type="submit">Sign In →</button>
          </form>
          <div className="auth-demo">
            Quick demo:&nbsp;
            <a onClick={()=>demo('admin')}>Admin</a> ·&nbsp;
            <a onClick={()=>demo('manager')}>Manager</a> ·&nbsp;
            <a onClick={()=>demo('viewer')}>Viewer</a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Auth;
