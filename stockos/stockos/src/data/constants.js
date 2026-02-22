export const ROLES = {
  admin:   { label:'Admin',    can:['view','create','edit','delete','status'] },
  manager: { label:'Manager',  can:['view','create','edit','status'] },
  viewer:  { label:'Viewer',   can:['view'] },
};

export const STATUSES = {
  'in-stock':     { label:'In Stock',     cls:'badge-in-stock',     opt:'s-in-stock'    },
  'low-stock':    { label:'Low Stock',    cls:'badge-low-stock',    opt:'s-low-stock'   },
  'ordered':      { label:'Ordered',      cls:'badge-ordered',      opt:'s-ordered'     },
  'discontinued': { label:'Discontinued', cls:'badge-discontinued', opt:'s-discontinued'},
};

export const CATEGORIES = ['Electronics','Office Supplies','Furniture','Hardware','Safety','Packaging','Cleaning','Tools','Other'];

export const SEED = [
  {id:1,name:'Mechanical Keyboard MX Blue',sku:'SKU-KBD01',category:'Electronics',quantity:24,maxQty:50,price:129.99,status:'in-stock',description:'Full-size mechanical keyboard with Cherry MX Blue switches. Ideal for office workstations.',supplier:'TechDist Co.'},
  {id:2,name:'Ergonomic Office Chair',sku:'SKU-CHR02',category:'Furniture',quantity:6,maxQty:20,price:349.00,status:'low-stock',description:'Lumbar support mesh chair with adjustable armrests and height.',supplier:'FurnWorld'},
  {id:3,name:'USB-C Hub 7-in-1',sku:'SKU-HUB03',category:'Electronics',quantity:0,maxQty:40,price:49.99,status:'ordered',description:'7-port USB-C hub with HDMI 4K, 3x USB-A, SD card, and 100W PD.',supplier:'TechDist Co.'},
  {id:4,name:'Whiteboard Markers Set',sku:'SKU-WBM04',category:'Office Supplies',quantity:120,maxQty:200,price:12.50,status:'in-stock',description:'Assorted 12-pack dry-erase markers. Odorless, low-VOC.',supplier:'SupplyPlus'},
  {id:5,name:'Safety Helmet Class E',sku:'SKU-SAF05',category:'Safety',quantity:3,maxQty:30,price:28.00,status:'low-stock',description:'ANSI/ISEA Z89.1 Class E rated safety helmet. Adjustable suspension.',supplier:'SafetyFirst LLC'},
  {id:6,name:'Label Printer LW-400',sku:'SKU-LBL06',category:'Tools',quantity:8,maxQty:15,price:89.99,status:'in-stock',description:'Thermal label printer, compatible with DYMO labels. USB + Bluetooth.',supplier:'PrintWorld'},
  {id:7,name:'Bubble Wrap Roll 24"',sku:'SKU-PKG07',category:'Packaging',quantity:0,maxQty:10,price:22.00,status:'discontinued',description:'Small bubble 24" x 50ft roll. No longer carried by primary supplier.',supplier:'PackCo'},
  {id:8,name:'Standing Desk Converter',sku:'SKU-DSK08',category:'Furniture',quantity:11,maxQty:25,price:219.00,status:'in-stock',description:'Height-adjustable desk converter. Fits monitors up to 27". Easy lift mechanism.',supplier:'FurnWorld'},
];

export const AI_INSIGHTS = [
  s => `<strong>${s.filter(i=>i.status==='low-stock').length} items</strong> are low on stock. Consider reordering: ${s.filter(i=>i.status==='low-stock').map(i=>i.name.split(' ')[0]).join(', ')}.`,
  s => `Total inventory value: <strong>$${s.reduce((a,i)=>a+i.price*i.quantity,0).toLocaleString('en-US',{minimumFractionDigits:2})}</strong> across ${s.length} SKUs.`,
  s => `<strong>${s.filter(i=>i.status==='discontinued').length} discontinued item(s)</strong> still in your catalog. Review and archive if no longer needed.`,
  s => `Your best-stocked category: <strong>${(()=>{const cats={};s.forEach(i=>{cats[i.category]=(cats[i.category]||0)+i.quantity});return Object.entries(cats).sort((a,b)=>b[1]-a[1])[0]?.[0]||'N/A'})()}</strong>.`,
];

export const AI_SUGGESTIONS = [
  i => `"${i.name}" has ${i.quantity} units left out of max ${i.maxQty}. ${i.quantity/i.maxQty < 0.2 ? 'Recommend reordering soon.' : 'Stock level looks healthy.'}`,
  i => `Supplier "${i.supplier}" also provides similar items. Bundle orders to reduce shipping costs.`,
  i => `At current stock, "${i.name}" ${i.quantity > 0 ? `will last approximately ${Math.round(i.quantity / 2)} weeks at average consumption.` : 'is out of stock — order immediately.'}`,
  i => `Price point $${i.price.toFixed(2)} for "${i.name}" is within market range for ${i.category}.`,
];
