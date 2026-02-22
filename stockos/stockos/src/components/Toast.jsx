import { useEffect } from 'react';

function Toast({ msg, color='var(--cyan)', onDone }) {
  useEffect(() => { const t = setTimeout(onDone, 2800); return () => clearTimeout(t); }, []);
  return (
    <div className="toast">
      <div className="toast-bar" style={{background:color}}/>
      {msg}
    </div>
  );
}

export default Toast;
