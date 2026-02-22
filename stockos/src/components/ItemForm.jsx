import { useState } from 'react';
import { STATUSES, CATEGORIES, AI_SUGGESTIONS } from '../data/constants';
import { sku } from '../utils/helpers';

function ItemForm({ item, onSave, onCancel, role }) {
  const [f, setF] = useState(item || { name:'', sku:sku(), category:'Electronics', quantity:'', maxQty:'', price:'', status:'in-stock', description:'', supplier:'' });
  const [aiMsg, setAiMsg] = useState('');
  const set = (k,v) => setF(p=>({...p,[k]:v}));

  const getAI = () => {
    const fn = AI_SUGGESTIONS[Math.floor(Math.random()*AI_SUGGESTIONS.length)];
    setAiMsg(fn({...f, quantity:Number(f.quantity)||0, maxQty:Number(f.maxQty)||100, price:Number(f.price)||0}));
  };

  const submit = e => {
    e.preventDefault();
    if (!f.name.trim() || !f.quantity) return;
    onSave({ ...f, id: f.id||Date.now(), quantity:Number(f.quantity), maxQty:Number(f.maxQty)||100, price:Number(f.price)||0 });
  };

  return (
    <form onSubmit={submit}>
      <div className="form-group">
        <label className="form-label">Item Name *</label>
        <input className="form-input" type="text" placeholder="e.g. Wireless Mouse Logitech MX3"
          value={f.name} onChange={e=>set('name',e.target.value)} required/>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">SKU</label>
          <input className="form-input" type="text" value={f.sku} onChange={e=>set('sku',e.target.value)}/>
        </div>
        <div className="form-group">
          <label className="form-label">Category</label>
          <select className="form-input form-select" value={f.category} onChange={e=>set('category',e.target.value)}>
            {CATEGORIES.map(c=><option key={c}>{c}</option>)}
          </select>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Quantity *</label>
          <input className="form-input" type="number" min="0" placeholder="0"
            value={f.quantity} onChange={e=>set('quantity',e.target.value)} required/>
        </div>
        <div className="form-group">
          <label className="form-label">Max Capacity</label>
          <input className="form-input" type="number" min="1" placeholder="100"
            value={f.maxQty} onChange={e=>set('maxQty',e.target.value)}/>
        </div>
      </div>
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Unit Price ($)</label>
          <input className="form-input" type="number" min="0" step="0.01" placeholder="0.00"
            value={f.price} onChange={e=>set('price',e.target.value)}/>
        </div>
        <div className="form-group">
          <label className="form-label">Status</label>
          <select className="form-input form-select" value={f.status} onChange={e=>set('status',e.target.value)}>
            {Object.entries(STATUSES).map(([k,v])=><option key={k} value={k}>{v.label}</option>)}
          </select>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Supplier</label>
        <input className="form-input" type="text" placeholder="e.g. TechDist Co."
          value={f.supplier} onChange={e=>set('supplier',e.target.value)}/>
      </div>
      <div className="form-group">
        <label className="form-label">Description</label>
        <textarea className="form-input form-textarea" placeholder="Item details, notes..."
          value={f.description} onChange={e=>set('description',e.target.value)}/>
      </div>

      <button type="button" className="btn btn-secondary btn-sm" onClick={getAI} style={{marginBottom: aiMsg?0:4}}>
        ✦ AI Analysis
      </button>
      {aiMsg && (
        <div style={{background:'linear-gradient(135deg,rgba(10,132,255,0.07),rgba(191,90,242,0.05))',border:'1px solid rgba(10,132,255,0.18)',borderRadius:'12px',padding:'12px 14px',marginTop:8,marginBottom:4}}>
          <div style={{fontSize:'0.66rem',fontWeight:600,textTransform:'uppercase',letterSpacing:'0.08em',color:'var(--cyan)',marginBottom:5}}>✦ AI Analysis</div>
          <div style={{fontSize:'0.8rem',color:'var(--text2)',lineHeight:1.6}}>{aiMsg}</div>
        </div>
      )}

      <div className="form-actions">
        <button type="button" className="btn btn-secondary" onClick={onCancel}>Cancel</button>
        <button type="submit" className="btn btn-primary">{item ? 'Save Changes' : 'Add Item'}</button>
      </div>
    </form>
  );
}

export default ItemForm;
