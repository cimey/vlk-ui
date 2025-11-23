export interface StockOrderResponse {
  id: string;
  clientId: string;
  stockId: string;
  type: string; // "Buy" | "Sell"
  shares: number;
  pricePerShare: number;
  totalPrice: number;
  createdAt: string;
}
export interface ApiResponse<T> {
  success: boolean;
  message?: string | null;
  data?: T | null;
}
