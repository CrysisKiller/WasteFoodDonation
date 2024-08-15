import { Component, OnInit, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DonationRequestComponent } from './Donor-request/donation-request.component';
import { MatTabsModule } from '@angular/material/tabs';
import { Requests } from './Donor-request/Requests';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DonorService } from '../../Services/DonorServices/donor.service';
import { PortfolioService } from '../../Services/PortfolioService/portfolio.service';
import { interval, switchMap, takeWhile } from 'rxjs';
import { AuthService } from '../../Services/AuthServices/auth.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-ngo',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    CommonModule,
    NgFor,
    MatButtonModule,
    RouterLink
  ],
  templateUrl: './ngo.component.html',
  styleUrl: './ngo.component.css',
})
export class NGOComponent implements OnInit {

  private readonly dialog = inject(MatDialog);
  private readonly portfolioService = inject(PortfolioService);
  private readonly authService = inject(AuthService);

  timers: { Id: number, targetTime: Date, remainingTime: string }[] = [];
  requests$ = this.portfolioService.requests$;

  ngOnInit(): void {
    this.portfolioService.getPortFolio().subscribe({
      next: () => {
        this.initializeTimers();
        this.startTimer();
      },
      error: (err) => {
        console.log(err);
      },
    });
  }


  initializeTimers() {
    this.requests$.subscribe(requests => {
      this.timers = requests.map((request) => ({
        Id: request.id,
        targetTime: new Date(request.expDate),
        remainingTime: this.calculateRemainingTime(new Date(), new Date(request.expDate)),
      }));
    });
  }

  calculateRemainingTime(currentTime: Date, targetTime: Date): string {
    const remainingTime = targetTime.getTime() - currentTime.getTime();
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

    if (remainingTime <= 0) return '0d 0h 0m 0s';
    if (days > 1) return `${days}d ${hours}h`;
    
    return `${days}d ${hours}h ${minutes}m ${seconds}s`;
  }

  startTimer() {
    interval(1000).subscribe(() => {
      const now = new Date();
      this.timers = this.timers.map((timer) => ({
        Id: timer.Id,
        targetTime: timer.targetTime,
        remainingTime: this.calculateRemainingTime(now, timer.targetTime),
      }));
    });
  }

  
  getRemainingTime(expDate: string): string {
    const targetTime = new Date(expDate);
    const now = new Date();
    return this.calculateRemainingTime(now, targetTime);
  }

  openDialog() {
    const dialogRef = this.dialog.open(DonationRequestComponent);
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.portfolioService.getPortFolio().subscribe({
          next: () => {
            this.initializeTimers();
            this.startTimer();
          },    
        });
      }
    });
  }
}
