import { Routes } from '@angular/router';
import { StockListComponent } from './features/trading/stock-list/stock-list.component';
import { UserListComponent } from './features/trading/user-list/user-list.component';

export const routes: Routes = [
    { path: '', component: UserListComponent },
    { path: 'users', component: UserListComponent },
    { path: 'trade/:clientId', component: StockListComponent }];
