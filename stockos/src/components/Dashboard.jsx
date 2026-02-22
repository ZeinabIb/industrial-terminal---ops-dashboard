import { useState, useMemo } from 'react';
import { ROLES, STATUSES, CATEGORIES, SEED, AI_INSIGHTS } from '../data/constants';
import { can, fmtCurrency } from '../utils/helpers';
import Clock from './Clock';
import Toast from './Toast';
import ItemCard from './ItemCard';
import ItemForm from './ItemForm';
import ItemDetail from './ItemDetail';
import '../styles/dashboard.css';

function Dashboard({ user, onLogout }) {
  const [items, setItems] = useState(SEED);
  const [modal, setModal] = useState(null);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortDir, setSortDir] = useState('asc');
  const [navItem, setNavItem] = useState('inventory');
  const [toast, setToast] = useState(null);
  const [aiIdx] = useState(()=>Math.floor(Math.random()*AI_INSIGHTS.length));

  const showToast = (msg, color='var(--cyan)') => setToast({msg,color});

  const filtered = useMemo(() => {
    let list = [...items];
    if (filterCat !== 'all') list = list.filter(i => i.category === filterCat);
    if (filterStatus !== 'all') list = list.filter(i => i.status === filterStatus);
    if (search.trim()) {
      const q = search.toLowerCase();
      list = list.filter(i =>
        i.name.toLowerCase().includes(q) ||
        i.sku.toLowerCase().includes(q) ||
        i.category.toLowerCase().includes(q) ||
        (i.supplier||'').toLowerCase().includes(q)
      );
    }
    list.sort((a,b) => {
      let va = a[sortBy], vb = b[sortBy];
      if (typeof va === 'string') va = va.toLowerCase();
      if (typeof vb === 'string') vb = vb.toLowerCase();
      return sortDir === 'asc' ? (va > vb ? 1 : -1) : (va < vb ? 1 : -1);
    });
    return list;
  }, [items, filterCat, filterStatus, search, sortBy, sortDir]);

  const stats = useMemo(() => ({
    total: items.length,
    inStock: items.filter(i=>i.status==='in-stock').length,
    lowStock: items.filter(i=>i.status==='low-stock').length,
    totalValue: items.reduce((a,i)=>a+i.price*i.quantity,0),
  }), [items]);

  const handleSort = col => {
    if (sortBy === col) setSortDir(d => d === 'asc' ? 'desc' : 'asc');
    else { setSortBy(col); setSortDir('asc'); }
  };

  const saveItem = item => {
    setItems(prev => {
      const idx = prev.findIndex(i => i.id === item.id);
      if (idx >= 0) { const n=[...prev]; n[idx]=item; return n; }
      return [...prev, item];
    });
    setModal(null);
    showToast(items.find(i=>i.id===item.id) ? '✓ Item updated' : '✓ Item added to inventory', 'var(--green)');
  };
  const deleteItem = id => {
    setItems(prev => prev.filter(i => i.id !== id));
    showToast('✓ Item removed', 'var(--red)');
  };
  const changeStatus = (id, status) => {
    setItems(prev => prev.map(i => i.id===id ? {...i,status} : i));
    showToast(`✓ Status → ${STATUSES[status].label}`, 'var(--cyan)');
    if (modal?.type==='detail') setModal(m=>({...m, item:{...m.item,status}}));
  };

  const openDetail = item => setModal({type:'detail', item});

  const NAVS = [
    {id:'inventory',icon:'📦',label:'Inventory',badge:items.length},
    {id:'low-stock',icon:'⚠️',label:'Low Stock',badge:items.filter(i=>i.status==='low-stock').length},
    {id:'ordered',icon:'🔄',label:'On Order',badge:items.filter(i=>i.status==='ordered').length},
    {id:'discontinued',icon:'🚫',label:'Discontinued',badge:items.filter(i=>i.status==='discontinued').length},
  ];

  const handleNav = id => {
    setNavItem(id);
    if (id === 'inventory') setFilterStatus('all');
    else setFilterStatus(id);
  };

  const SortTh = ({ col, label }) => (
    <div className="th" onClick={() => handleSort(col)}>
      {label}
      <span className={`sort-arrow${sortBy===col?' active':''}`}>{sortBy===col&&sortDir==='desc'?'↓':'↑'}</span>
    </div>
  );

  const aiText = AI_INSIGHTS[aiIdx](items);

  return (
    <div className="app">
      <aside className="sidebar">
        <div className="sidebar-logo">
          <div className="sidebar-logo-icon">📦</div>
          <div className="sidebar-logo-text">Stock<span>OS</span></div>
        </div>

        <nav className="sidebar-nav">
          <div className="nav-group-label">Inventory</div>
          {NAVS.map(n => (
            <button key={n.id} className={`nav-item${navItem===n.id?' active':''}`} onClick={()=>handleNav(n.id)}>
              <span className="nav-item-icon">{n.icon}</span>
              {n.label}
              <span className="nav-badge">{n.badge}</span>
            </button>
          ))}
          <div className="nav-group-label" style={{marginTop:16}}>Reports</div>
          {[
            {id:'value',icon:'💰',label:'Valuation'},
            {id:'activity',icon:'📋',label:'Audit Log'},
          ].map(n=>(
            <button key={n.id} className={`nav-item${navItem===n.id?' active':''}`}
              onClick={()=>{ setNavItem(n.id); showToast('Module coming soon', 'var(--yellow)'); }}>
              <span className="nav-item-icon">{n.icon}</span>
              {n.label}
            </button>
          ))}
        </nav>

        <div className="sidebar-user" onClick={onLogout} title="Sign out">
          <div className="user-avatar">{user.initials}</div>
          <div>
            <div className="user-name">{user.name}</div>
            <div className="user-role">{ROLES[user.role]?.label}</div>
          </div>
          <span className="user-signout">↩</span>
        </div>
      </aside>

      <main className="main">
        <div className="topbar">
          <div className="topbar-breadcrumb">
            StockOS <span className="sep">/</span>
            <span>{navItem === 'inventory' ? 'All Items' : STATUSES[navItem]?.label || navItem.charAt(0).toUpperCase()+navItem.slice(1)}</span>
          </div>
          <div className="topbar-right">
            <div className="status-dot"/>
            <Clock/>
            <span className={`role-tag ${user.role}`}>{ROLES[user.role]?.label}</span>
            {can(user.role,'create') && (
              <button className="btn btn-primary btn-sm" onClick={()=>setModal({type:'create'})}>
                + Add Item
              </button>
            )}
          </div>
        </div>

        <div className="content">
          <div className="stats-row">
            {[
              {label:'Total SKUs',    value:stats.total,    cls:'c-cyan',   color:'c-cyan'},
              {label:'In Stock',      value:stats.inStock,  cls:'c-green',  color:'c-green'},
              {label:'Low / Ordered', value:stats.lowStock, cls:'c-yellow', color:'c-yellow'},
              {label:'Total Value',   value:fmtCurrency(stats.totalValue), cls:'c-cyan', color:'c-cyan', small:true},
            ].map((s,i)=>(
              <div key={i} className={`stat-card ${s.cls}`}>
                <div className="stat-label">{s.label}</div>
                <div className={`stat-value ${s.color}`} style={s.small?{fontSize:'1.3rem'}:{}}>{s.value}</div>
                <div className="stat-sub">
                  {i===0&&`${filtered.length} shown`}
                  {i===1&&`${Math.round(stats.inStock/stats.total*100)}% of catalog`}
                  {i===2&&`${items.filter(i=>i.status==='ordered').length} on order`}
                  {i===3&&`avg ${fmtCurrency(stats.totalValue/Math.max(items.reduce((a,i)=>a+i.quantity,0),1))}/unit`}
                </div>
              </div>
            ))}
          </div>

          <div className="ai-panel">
            <div className="ai-panel-icon">AI</div>
            <div>
              <div className="ai-panel-label">AI Inventory Insight</div>
              <div className="ai-panel-text" dangerouslySetInnerHTML={{__html: aiText}}/>
            </div>
          </div>

          <div className="toolbar">
            <div className="search-wrap">
              <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
              </svg>
              <input className="search-input" type="text" placeholder="Search by name, SKU, category, supplier..."
                value={search} onChange={e=>setSearch(e.target.value)}/>
            </div>
            <select className="filter-select" value={filterCat} onChange={e=>setFilterCat(e.target.value)}>
              <option value="all">All Categories</option>
              {CATEGORIES.map(c=><option key={c}>{c}</option>)}
            </select>
            <select className="filter-select" value={filterStatus} onChange={e=>setFilterStatus(e.target.value)}>
              <option value="all">All Statuses</option>
              {Object.entries(STATUSES).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
            </select>
          </div>

          <div className="table-wrap">
            <div className="table-header-row">
              <SortTh col="name" label="Item / SKU"/>
              <SortTh col="category" label="Category"/>
              <SortTh col="quantity" label="Qty"/>
              <SortTh col="status" label="Status"/>
              <SortTh col="price" label="Price"/>
              <div className="th">Actions</div>
            </div>

            {filtered.length === 0 ? (
              <div className="empty">
                <div className="empty-icon">📦</div>
                <h3>No items found</h3>
                <p>Try adjusting your filters or add a new item.</p>
              </div>
            ) : filtered.map(item => (
              <ItemCard
                key={item.id}
                item={item}
                onEdit={item=>setModal({type:'edit',item})}
                onDelete={deleteItem}
                onDetail={openDetail}
                role={user.role}
              />
            ))}
          </div>
        </div>
      </main>

      {modal && (
        <div className="overlay" onClick={e=>e.target===e.currentTarget&&setModal(null)}>
          <div className="modal">
            {modal.type === 'create' && (
              <>
                <div className="modal-header">
                  <div className="modal-title">New Item</div>
                  <button className="modal-close" onClick={()=>setModal(null)}>✕</button>
                </div>
                <div className="modal-body">
                  <ItemForm onSave={saveItem} onCancel={()=>setModal(null)} role={user.role}/>
                </div>
              </>
            )}
            {modal.type === 'edit' && (
              <>
                <div className="modal-header">
                  <div className="modal-title">Edit Item</div>
                  <button className="modal-close" onClick={()=>setModal(null)}>✕</button>
                </div>
                <div className="modal-body">
                  <ItemForm item={modal.item} onSave={saveItem} onCancel={()=>setModal(null)} role={user.role}/>
                </div>
              </>
            )}
            {modal.type === 'detail' && (
              <ItemDetail
                item={modal.item}
                onClose={()=>setModal(null)}
                onEdit={item=>setModal({type:'edit',item})}
                onDelete={deleteItem}
                onStatusChange={changeStatus}
                role={user.role}
              />
            )}
          </div>
        </div>
      )}

      {toast && <Toast msg={toast.msg} color={toast.color} onDone={()=>setToast(null)}/>}
    </div>
  );
}

export default Dashboard;
