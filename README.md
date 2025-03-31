# SQL Playground

A web-based application to run SQL queries and visualize results. This interactive query tool allows users to execute SQL queries against a sample dataset and view the results in a tabular format.

## Features

- **SQL Editor**: Write and execute SQL queries with syntax highlighting
- **Predefined Queries**: Choose from a selection of predefined SQL queries
- **Query History**: Track and revisit previously executed queries
- **Results Visualization**: View query results in a responsive, paginated table
- **Mobile Responsive**: Works on both desktop and mobile devices

## Getting Started

### Prerequisites

- Node.js (v12.0.0 or higher)
- npm (v6.0.0 or higher)

### Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies:

```bash
npm install
```

### Running the Application

To start the development server:

```bash
npm start
```

This will launch the application on [http://localhost:3000](http://localhost:3000).

### Building for Production

To create a production build:

```bash
npm run build
```

The built files will be in the `build` directory.

## Sample Queries

The application comes with several predefined queries, including:

1. `SELECT * FROM Customers`
2. `SELECT * FROM Customers WHERE country = "Germany"`
3. `SELECT companyName, contactName, contactTitle FROM Customers`
4. `SELECT * FROM Customers WHERE country = "UK" ORDER BY companyName`
5. `SELECT country, COUNT(*) as customerCount FROM Customers GROUP BY country ORDER BY customerCount DESC`

## Technologies Used

- React
- styled-components for styling
- react-ace for the SQL editor
- papaparse for CSV parsing

## Dataset

The application uses a sample customer dataset in CSV format, containing information about customer companies, contact details, and locations.


