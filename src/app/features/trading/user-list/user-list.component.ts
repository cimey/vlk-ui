import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { ClientsService } from '../../../core/services/clients.service';
import { ClientDto, ClientStatusDto } from '../../../models/entities';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-user-list',
  imports: [CommonModule],
  templateUrl: './user-list.component.html',
  styleUrl: './user-list.component.scss',
})
export class UserListComponent implements OnInit {

  users: ClientDto[] = [];
  loading = false;
  error: string | null = null;

  constructor(private clientsService: ClientsService, private router: Router, private cdr: ChangeDetectorRef) { }
  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers() {
    this.loading = true;
    this.error = null;

    this.clientsService.getClients().subscribe({
      next: (res) => {
        if (!res.success) {

          this.error = res.message ?? '';
          this.cdr.detectChanges();
          return;
        }
        this.users = res.data!;
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: () => {
        this.error = 'Failed to load users.';
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  goToTrade(userId: string) {
    this.router.navigate(['/trade', userId]);
  }
}
