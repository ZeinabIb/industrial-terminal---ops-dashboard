import { can, fmtCurrency, qtyColor } from '../utils/helpers';
import StatusBadge from './StatusBadge';

function ItemCard({ item, onEdit, onDelete, onDetail, role }) {
  return (
    <div className="table-row" onClick={()=>onDetail(item)}>
      <div className="td">
        <div className="td-name">{item.name}</div>
        <div className="td-sku">{item.sku}</div>
      </div>
      <div className="td">{item.category}</div>
      <div className="td">
        <div className="qty-wrap">
          <span style={{color: qtyColor(item.quantity, item.maxQty), minWidth:28}}>{item.quantity}</span>
          <div className="qty-bar-track">
            <div className="qty-bar-fill" style={{
              width:`${Math.min(100,Math.round(item.quantity/item.maxQty*100))}%`,
              background: qtyColor(item.quantity, item.maxQty)
            }}/>
          </div>
        </div>
      </div>
      <div className="td"><StatusBadge status={item.status}/></div>
      <div className="td">{fmtCurrency(item.price)}</div>
      <div className="td td-actions" onClick={e=>e.stopPropagation()}>
        {can(role,'edit') && (
          <button className="icon-btn" title="Edit" onClick={()=>onEdit(item)}>✏️</button>
        )}
        {can(role,'delete') && (
          <button className="icon-btn" title="Delete" onClick={()=>{ onDelete(item.id); }}>🗑️</button>
        )}
        {!can(role,'edit') && (
          <span style={{fontSize:'0.68rem',color:'var(--text3)'}}>View</span>
        )}
      </div>
    </div>
  );
}

export default ItemCard;
