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



