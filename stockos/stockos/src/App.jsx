import { useState } from 'react';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);
  return user
    ? <Dashboard user={user} onLogout={()=>setUser(null)}/>
    : <Auth onLogin={setUser}/>;
}

export default App;
