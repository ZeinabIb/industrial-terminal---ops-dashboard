# StockOS – Inventory Management System

A modern, feature-rich inventory management application built with React and Vite. StockOS provides role-based access control, real-time inventory tracking, AI-powered insights, and a beautiful dark-themed UI inspired by Apple's design language.

## Features

- **Role-Based Access Control**: Admin, Manager, and Viewer roles with granular permissions
- **Real-Time Inventory Tracking**: Monitor stock levels, quantities, and values
- **AI Insights**: Smart suggestions and analytics for inventory optimization
- **Advanced Filtering & Search**: Filter by category, status, and search across multiple fields
- **Sortable Tables**: Click column headers to sort inventory items
- **Status Management**: Track items as In Stock, Low Stock, Ordered, or Discontinued
- **Responsive Design**: Works seamlessly on desktop and mobile devices
- **Modern UI**: Dark theme with smooth animations and Apple-inspired aesthetics

## Tech Stack

- **React 18.2** - UI library
- **Vite 5** - Build tool and dev server
- **Vanilla CSS** - Custom styling with CSS variables
- **ES Modules** - Modern JavaScript module system

## Getting Started

### Prerequisites

- Node.js 16+ and npm (or yarn/pnpm)

### Installation

1. Clone or download this repository
2. Navigate to the project directory:
   ```bash
   cd stockos
   ```

3. Install dependencies:
   ```bash
   npm install
   ```

### Development

Start the development server:

```bash
npm run dev
```

The app will be available at `http://localhost:5173` (or another port if 5173 is in use).

### Build for Production

Create an optimized production build:

```bash
npm run build
```

The built files will be in the `dist/` directory.

### Preview Production Build

Preview the production build locally:

```bash
npm run preview
```

## Project Structure

```
stockos/
├── public/
│   └── index.html              # HTML shell
├── src/
│   ├── components/
│   │   ├── Auth.jsx            # Login/authentication screen
│   │   ├── Dashboard.jsx       # Main dashboard with inventory table
│   │   ├── ItemCard.jsx        # Table row component for items
│   │   ├── ItemForm.jsx        # Add/edit item form
│   │   ├── ItemDetail.jsx      # Item detail modal
│   │   ├── StatusBadge.jsx     # Status indicator component
│   │   ├── Clock.jsx           # Real-time clock component
│   │   └── Toast.jsx           # Toast notification component
│   ├── styles/
│   │   ├── auth.css            # Authentication screen styles
│   │   └── dashboard.css       # Dashboard and main app styles
│   ├── data/
│   │   └── constants.js        # ROLES, STATUSES, CATEGORIES, SEED data, AI arrays
│   ├── utils/
│   │   └── helpers.js          # Utility functions (fmtCurrency, qtyColor, can, sku)
│   ├── App.jsx                 # Root component (manages auth state)
│   └── main.jsx                # Application entry point
├── package.json
├── vite.config.js
└── README.md
```

## Usage

### Demo Accounts

On the login screen, click the quick demo links to sign in as:

- **Admin** - Full access (view, create, edit, delete, change status)
- **Manager** - Can view, create, edit, and change status (no delete)
- **Viewer** - Read-only access

Or enter any username/password to create a custom account with your selected role.

### Managing Inventory

- **Add Items**: Click "+ Add Item" button (Admin/Manager only)
- **Edit Items**: Click the ✏️ icon in the table or "Edit Item" in detail view
- **Delete Items**: Click the 🗑️ icon (Admin only)
- **View Details**: Click any table row to open the detail modal
- **Change Status**: Use status buttons in the detail modal (Admin/Manager only)
- **Search**: Use the search bar to filter by name, SKU, category, or supplier
- **Filter**: Use dropdown filters for category and status
- **Sort**: Click column headers to sort ascending/descending

## Deployment

### Deploy to Netlify

1. **Via Netlify CLI**:
   ```bash
   npm install -g netlify-cli
   npm run build
   netlify deploy --prod --dir=dist
   ```

2. **Via Netlify UI**:
   - Push your code to GitHub/GitLab/Bitbucket
   - Connect your repository to Netlify
   - Build settings:
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - Deploy!

### Deploy to Vercel

1. **Via Vercel CLI**:
   ```bash
   npm install -g vercel
   vercel
   ```

2. **Via Vercel UI**:
   - Push your code to GitHub/GitLab/Bitbucket
   - Import your repository on Vercel
   - Vercel auto-detects Vite settings
   - Deploy!

### Environment Variables

This app doesn't require any environment variables for basic operation. All data is stored in-memory (resets on page reload). For production use, you would integrate a backend API and database.

## Customization

### Modify Seed Data

Edit `src/data/constants.js` to change the initial inventory items in the `SEED` array.

### Add Categories

Update the `CATEGORIES` array in `src/data/constants.js`.

### Customize Roles

Modify the `ROLES` object in `src/data/constants.js` to add new roles or change permissions.

### Theme Colors

All colors are defined as CSS variables in `src/styles/auth.css` and `src/styles/dashboard.css`. Edit the `:root` section to customize the color scheme.

## Browser Support

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - feel free to use this project for personal or commercial purposes.

## Credits

Built with ❤️ using React and Vite. Design inspired by Apple's Human Interface Guidelines.
