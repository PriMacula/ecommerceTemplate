import { clsx } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs))
}
export const  convertToCSV = (data) => {
  // Define CSV headers
  const headers = ['Order ID', 'Customer Name', 'Order Date', 'Total', 'Status'];
  
  // Map each order to a row in the CSV
  const rows = data.map(order => {
    const formattedDate = new Date(order.createdAt).toLocaleDateString('en-US', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit'
    });

    return [
      order.orderId,
      order.customerName,
      formattedDate,
      `$${order.totalAmount.toFixed(2)}`,
      order.status
    ];
  });

  // Create CSV content
  let csvContent = 'data:text/csv;charset=utf-8,' + headers.join(',') + '\n' + rows.map(e => e.join(',')).join('\n');

  return csvContent;
};

