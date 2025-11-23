import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environment/environment';
import { ClientStatusDto } from '../../models/entities';
import { ApiResponse, StockOrderResponse } from '../../models/responses';

@Injectable({ providedIn: 'root' })
export class TradingService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  buy(clientId: string, stockId: string, shares: number): Observable<ApiResponse<StockOrderResponse>> {
    return this.http.post<ApiResponse<StockOrderResponse>>(`${this.base}/trading/buy`, {
      clientId, stockId, shares
    });
  }

  sell(clientId: string, stockId: string, shares: number): Observable<ApiResponse<StockOrderResponse>> {
    return this.http.post<ApiResponse<StockOrderResponse>>(`${this.base}/trading/sell`, {
      clientId, stockId, shares
    });
  }
}
