import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { StockService } from '../../../core/services/stock.service';
import { TradingService } from '../../../core/services/trading.service';
import { ClientStatusDto, Stock } from '../../../models/entities';
import { ApiResponse, StockOrderResponse } from '../../../models/responses';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { BuySellDialogComponent } from '../buy-sell-dialog/buy-sell-dialog.component';
import { count } from 'rxjs';
import { ClientsService } from '../../../core/services/clients.service';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-stock-list.component',
  imports: [CommonModule],
  templateUrl: './stock-list.component.html',
  styleUrl: './stock-list.component.scss',
})
export class StockListComponent implements OnInit {
  stocks: Stock[] = [];
  clientStatus: ClientStatusDto | null = null;
  loading = false;
  error = '';
  // change to actual seeded client id
  clientId = '00000000-0000-0000-0000-000000000001';

  constructor(private cdr: ChangeDetectorRef,
    private stockService: StockService,
    private clientsService: ClientsService,
    private route: ActivatedRoute,
    private dialog: MatDialog,
    private snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.clientId = this.route.snapshot.paramMap.get('clientId') ?? this.clientId;
    this.loadStocks();
    this.loadClientStatus();
  }

  getOwnedShares(stockId: string): number {
    const pos = this.clientStatus?.stockPositions.find(p => p.stockId === stockId);
    return pos ? pos.shares : 0;
  }

  hasStock(stockId: string) {
    return this.clientStatus?.stockPositions.some(pos => pos.stockId === stockId) ?? false;
  }

  loadClientStatus() {

    this.loading = true;
    this.clientsService.getClientStatus(this.clientId).subscribe({
      next: (res: ApiResponse<ClientStatusDto>) => {
        if (!res.success) {
          this.error = res.message ?? '';
          return;
        }
        this.clientStatus = res.data ?? null;
        this.loading = false;

        this.cdr.detectChanges();

      },
      error: (err) => {
        this.error = 'Failed to load status';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadStocks() {
    this.loading = true;
    this.stockService.getStocks().subscribe({
      next: (res: ApiResponse<Stock[]>) => {

        if (!res.success) {
          this.error = res.message ?? '';
          return;
        }
        this.stocks = res.data ?? [];
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Failed to load stocks';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }
  openTrade(stock: any, mode: string) {
    const dialogRef = this.dialog.open(BuySellDialogComponent, {
      width: '400px',
      data: {
        clientId: this.clientStatus!.clientId,
        stockId: stock.id,
        stockName: stock.name,
        price: stock.currentPrice,
        balance: this.clientStatus!.cashBalance,
        stockCount: this.getOwnedShares(stock.id),
        mode: mode
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result?.success) {
        this.loadClientStatus(); // refresh balance & holdings
        this.snackBar.open('Trade completed successfully!', 'OK', {
          duration: 2500,
          panelClass: 'snackbar-success'
        });
      }
      else if (result?.error) {
        this.snackBar.open(result.error, 'Close', {
          duration: 3500,
          panelClass: 'snackbar-error'
        });
      }
    });
  }
}
