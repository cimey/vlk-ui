import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Stock } from '../../models/entities';
import { environment } from '../../../environment/environment';
import { ApiResponse } from '../../models/responses';

@Injectable({ providedIn: 'root' })
export class StockService {
  private base = environment.apiBaseUrl;

  constructor(private http: HttpClient) {}

  getStocks(): Observable<ApiResponse<Stock[]>> {
    return this.http.get<ApiResponse<Stock[]>>(`${this.base}/stocks`);
  }

  // optionally: get stock by id if backend exposes it
  getStock(id: string) {
    return this.http.get<ApiResponse<Stock>>(`${this.base}/stocks/${id}`);
  }
}
