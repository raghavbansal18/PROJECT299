import Papa from 'papaparse';

// Function to read and parse CSV data
export const parseCSVData = async () => {
  try {
    const response = await fetch('/data/customers.csv');
    const csvText = await response.text();
    
    return new Promise((resolve) => {
      Papa.parse(csvText, {
        header: true,
        complete: (results) => {
          resolve(results.data);
        }
      });
    });
  } catch (error) {
    console.error('Error parsing CSV data:', error);
    return [];
  }
};

// Predefined queries with their descriptions and expected results
export const predefinedQueries = [
  {
    id: 1,
    name: 'Select All Customers',
    query: 'SELECT * FROM Customers',
    description: 'Retrieves all customer records',
    processor: (data) => data
  },
  {
    id: 2,
    name: 'Customers from Germany',
    query: 'SELECT * FROM Customers WHERE country = "Germany"',
    description: 'Retrieves all customer records from Germany',
    processor: (data) => data.filter(customer => customer.country === 'Germany')
  },
  {
    id: 3,
    name: 'Customer Company Names and Contacts',
    query: 'SELECT companyName, contactName, contactTitle FROM Customers',
    description: 'Retrieves company names and contact information',
    processor: (data) => data.map(({ companyName, contactName, contactTitle }) => ({ 
      companyName, 
      contactName, 
      contactTitle 
    }))
  },
  {
    id: 4,
    name: 'Customers from UK Ordered by Company',
    query: 'SELECT * FROM Customers WHERE country = "UK" ORDER BY companyName',
    description: 'Retrieves UK customers sorted by company name',
    processor: (data) => {
      const filteredData = data.filter(customer => customer.country === 'UK');
      return filteredData.sort((a, b) => a.companyName.localeCompare(b.companyName));
    }
  },
  {
    id: 5,
    name: 'Count Customers by Country',
    query: 'SELECT country, COUNT(*) as customerCount FROM Customers GROUP BY country ORDER BY customerCount DESC',
    description: 'Counts customers by country and sorts by count',
    processor: (data) => {
      const countByCountry = data.reduce((acc, customer) => {
        acc[customer.country] = (acc[customer.country] || 0) + 1;
        return acc;
      }, {});
      
      return Object.entries(countByCountry)
        .map(([country, customerCount]) => ({ country, customerCount }))
        .sort((a, b) => b.customerCount - a.customerCount);
    }
  }
];

// Function to execute a query (mock implementation)
export const executeQuery = async (queryString, allData) => {
  try {
    // Find a matching predefined query
    const matchingQuery = predefinedQueries.find(q => q.query.toLowerCase() === queryString.toLowerCase().trim());
    
    if (matchingQuery) {
      return matchingQuery.processor(allData);
    }
    
    // If no matching query is found, return the first 10 records
    return allData.slice(0, 10);
  } catch (error) {
    console.error('Error executing query:', error);
    return [];
  }
}; 