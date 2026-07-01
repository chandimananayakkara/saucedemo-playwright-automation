
export function generateRandomString(length: number = 5): string {
  const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';

  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
   
  }

  return result;
}


export function generateCustomerData() {
  const randomSuffix = generateRandomString(4);
  return {
    firstName: `Test_${randomSuffix}`,
    lastName: `User_${randomSuffix}`,
    zip: '10001',
  };
}


export function parsePrice(priceText: string): number {
  return parseFloat(priceText.replace('$', ''));
}


export function formatPrice(amount: number): string {
  return `$${amount.toFixed(2)}`;
  
}


export function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
 
}


export function calculateOrderTotal(prices: number[]) {
  const TAX_RATE = 0.08; 

  const subtotal = prices.reduce((sum, price) => sum + price, 0);
 

  const tax = Math.round(subtotal * TAX_RATE * 100) / 100;
  
  const total = Math.round((subtotal + tax) * 100) / 100;

  return { subtotal, tax, total };
}