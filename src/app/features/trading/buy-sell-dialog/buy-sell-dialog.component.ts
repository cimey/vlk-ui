import { CommonModule } from "@angular/common";
import { Component, Inject } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { TradingService } from "../../../core/services/trading.service";
import { BuySellDialogData } from "../../../models/model";
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from "@angular/material/dialog";

@Component({
  selector: 'app-buy-sell-dialog',
  standalone: true,
  imports: [CommonModule, FormsModule, MatDialogModule],
  templateUrl: './buy-sell-dialog.component.html'
})
export class BuySellDialogComponent {

  shares: number = 1;
  loading = false;
  error: string | null = null;

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: BuySellDialogData,
    private dialogRef: MatDialogRef<BuySellDialogComponent>,
    private tradingService: TradingService
  ) { }

  totalCost(): number {
    return this.shares * this.data.price;
  }

  canBuy(): boolean {
    return this.totalCost() <= this.data.balance && this.shares > 0;
  }

  buy() {
    this.loading = true;
    this.error = null;

    this.tradingService.buy(this.data.clientId, this.data.stockId, this.shares)
      .subscribe({
        next: () => this.dialogRef.close({ success: true }),
        error: (err: { error: string; }) => {
          this.error = 'Failed to buy the stock.';
          this.loading = false;
          this.dialogRef.close({ success: false, error: this.error })
        }
      });
  }

  sell() {
    this.loading = true;
    this.error = null;

    this.tradingService.sell(this.data.clientId, this.data.stockId, this.shares)
      .subscribe({
        next: () => this.dialogRef.close({ success: true }),
        error: (err: { error: string; }) => {
          this.error = 'Failed to sell the stock.';
          this.loading = false;
          this.dialogRef.close({ success: false, error: this.error })
        }
      });
  }

  close() {
    this.dialogRef.close();
  } 
  
  get sharesError(): string | null {
    if (!this.shares || this.shares <= 0) {
      return "Enter a valid number of shares.";
    }

    if (this.data.mode === 'sell' && this.shares > this.data.stockCount) {
      return "You cannot sell more shares than you own.";
    }

    if (this.data.mode === 'buy' && this.totalCost() > this.data.balance) {
      return "You don't have enough balance.";
    }

    return null;
  }
}