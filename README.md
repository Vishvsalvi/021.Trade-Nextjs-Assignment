# Open Order Assignment

A simple order management web application built with Next.js. The main feature is an interactive table that displays and filters dummy order data, allowing users to search and interact with the data in a user-friendly way.

## Project Structure

```
open_order_assignment/
│
├── src/
│   ├── app/
│   │   ├── Dummydata.ts       # Contains the order data and its TypeScript interface
│   │   ├── page.tsx           # Main page, sets up columns and renders the DataTable
│   │   └── layout.tsx         # Page layout
│   ├── components/
│   │   ├── DataTable.tsx      # The main table component (filtering, pagination, selection)
│   │   └── ui/
│   │       ├── table.tsx      # Table UI components (Table, TableHeader, etc.)
│   │       └── checkbox.tsx   # Custom Checkbox UI component using shadcn/ui
│   └── lib/
│       └── utils.ts           # Utility functions
│
├── public/                    # Static assets
├── package.json               # Project dependencies and scripts
└── README.md                  # Project documentation
```

## Libraries Used

- **Next.js**: React framework for SSR and routing
- **React**: UI library
- **@tanstack/react-table**: For advanced table features (filtering, pagination, selection)
- **shadcn/ui**: Component library for consistent, accessible UI elements
- **lucide-react**: Icon library (used for icons like Radio and Check)
- **Tailwind CSS**: Utility-first CSS framework
- **clsx** and **class-variance-authority**: For conditional className handling

## Features

The application provides the following functionality:

- Display a table of dummy order data (from Dummydata.ts)
- Search/filter by client name or ticker symbol
- Select rows with custom checkboxes
- Display a radio icon next to selected tickers
- Paginate through the data

## Implementation Details

- The main logic resides in `DataTable.tsx`, which uses `@tanstack/react-table` hooks for state management, filtering, and pagination
- UI components are separated for reusability:
  - `ui/table.tsx` contains the table components
  - `ui/checkbox.tsx` provides custom checkbox implementation
- The application follows a component-based architecture for better maintainability

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the development server:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:3000](http://localhost:3000) in your browser to see the application

## Development Notes

- The checkboxes are currently visually hidden but functional
- The application uses shadcn/ui components for consistency and accessibility
- Tailwind CSS is used for styling throughout the application