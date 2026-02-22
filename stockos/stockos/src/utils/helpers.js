import { ROLES } from '../data/constants';

export const fmtCurrency = n => '$' + Number(n).toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g,',');

export const qtyColor = (qty, max) => {
  const r = qty / max;
  if (r === 0) return 'var(--red)';
  if (r < 0.2) return 'var(--red)';
  if (r < 0.4) return 'var(--yellow)';
  return 'var(--green)';
};

export const can = (role, action) => ROLES[role]?.can.includes(action);

export const sku = () => 'SKU-' + Math.random().toString(36).slice(2,7).toUpperCase();
