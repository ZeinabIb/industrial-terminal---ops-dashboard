import { STATUSES } from '../data/constants';
import { can, fmtCurrency } from '../utils/helpers';
import StatusBadge from './StatusBadge';

function ItemDetail({ item, onClose, onEdit, onDelete, onStatusChange, role }) {
  return (
    <div>
      <div className="detail-header">
        <div style={{display:'flex',justifyContent:'space-between',alignItems:'flex-start'}}>
          <div>
            <div className="detail-sku">{item.sku}</div>
            <div className="detail-name">{item.name}</div>
            <StatusBadge status={item.status}/>
          </div>
          <button className="modal-close" onClick={onClose}>✕</button>
        </div>
        {can(role,'status') && (
          <div>
            <div style={{fontSize:'0.68rem',fontWeight:500,textTransform:'uppercase',letterSpacing:'0.06em',color:'var(--text3)',marginTop:14,marginBottom:8}}>Update Status</div>
            <div className="status-row">
              {Object.entries(STATUSES).map(([k,v])=>(
                <button key={k} className={`status-opt${item.status===k?' '+STATUSES[k].opt:''}`}
                  onClick={()=>onStatusChange(item.id,k)}>
                  {v.label}
                </button>
              ))}
            </div>
          </div>
        )}
        <div className="detail-grid">
          {[
            ['Category', item.category],
            ['Supplier', item.supplier||'—'],
            ['Quantity', `${item.quantity} / ${item.maxQty} units`],
            ['Unit Price', fmtCurrency(item.price)],
            ['Total Value', fmtCurrency(item.price * item.quantity)],
            ['Stock Level', `${Math.round(item.quantity/item.maxQty*100)}%`],
          ].map(([l,v])=>(
            <div key={l} className="detail-field">
              <div className="detail-field-label">{l}</div>
              <div className="detail-field-value">{v}</div>
            </div>
          ))}
        </div>
        {item.description && (
          <div className="detail-desc">{item.description}</div>
        )}
      </div>
      <div className="detail-footer">
        {can(role,'delete')
          ? <button className="btn btn-danger btn-sm" onClick={()=>{onDelete(item.id);onClose();}}>Delete</button>
          : <div className="role-locked">🔒 Insufficient permissions</div>
        }
        <div style={{display:'flex',gap:8}}>
          <button className="btn btn-secondary btn-sm" onClick={onClose}>Close</button>
          {can(role,'edit')
            ? <button className="btn btn-primary btn-sm" onClick={()=>{onEdit(item);onClose();}}>Edit Item</button>
            : null
          }
        </div>
      </div>
    </div>
  );
}

export default ItemDetail;
