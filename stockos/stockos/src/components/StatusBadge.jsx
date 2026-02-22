import { STATUSES } from '../data/constants';

const StatusBadge = ({ status }) => {
  const s = STATUSES[status];
  return <span className={`badge ${s.cls}`}>{s.label}</span>;
};

export default StatusBadge;
