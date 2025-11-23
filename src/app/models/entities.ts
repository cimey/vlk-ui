export interface Stock {
  id: string;
  symbol: string;
  name: string;
  currentPrice: number;
}
export interface StockPosition {
  stockId: string;
  shares: number;
  stockName?: string;
  stockPrice?: number;
}

export interface ClientStatusDto {
  clientId: string;
  name: string;
  email: string;
  cashBalance: number;
  stockPositions: StockPosition[];
}

export interface ClientDto {
  clientId: string;
  name: string;
  email: string;
}
