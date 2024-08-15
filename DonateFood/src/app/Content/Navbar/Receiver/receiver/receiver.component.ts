import { Component, inject } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatTabsModule } from '@angular/material/tabs';
import { CommonModule, NgFor } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { DonorService } from '../../../../Services/DonorServices/donor.service';
import { PortfolioService } from '../../../../Services/PortfolioService/portfolio.service';
import { Requests } from '../../../Donation/Donor-request/Requests';
import { AuthService } from '../../../../Services/AuthServices/auth.service';
import { interval, Observable, Subscription, switchMap, takeWhile } from 'rxjs';
import { RouterLink } from '@angular/router';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ViewitemComponent } from './viewitem/viewitem.component';

@Component({
  selector: 'app-receiver',
  standalone: true,
  imports: [
    MatIconModule,
    MatDialogModule,
    MatTabsModule,
    MatButtonModule,
    NgFor,
    CommonModule,
    RouterLink,
    MatSnackBarModule,
  ],
  templateUrl: './receiver.component.html',
  styleUrl: './receiver.component.css',
})
export class ReceiverComponent {
  private readonly donorService = inject(DonorService);
  private readonly portfolioService = inject(PortfolioService);
  private readonly authService = inject(AuthService);
  loading = false;
  private dialog = inject(MatDialog);

  requestsArray$ = this.donorService.requests$;
  timers: { Id: number; targetTime: Date; remainingTime: string }[] = [];

  ngOnInit(): void {
    this.donorService.getAll().subscribe({
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
    this.requestsArray$.subscribe((requests) => {
      this.timers = requests.map((request) => ({
        Id: request.id,
        targetTime: new Date(request.expDate),
        remainingTime: this.calculateRemainingTime(
          new Date(),
          new Date(request.expDate)
        ),
      }));
    });
  }

  calculateRemainingTime(currentTime: Date, targetTime: Date): string {
    const remainingTime = targetTime.getTime() - currentTime.getTime();
    const days = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const hours = Math.floor(
      (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
    );
    const minutes = Math.floor(
      (remainingTime % (1000 * 60 * 60)) / (1000 * 60)
    );
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

  Accept(item: Requests) {
    this.loading = true; // Set loading to true when accept is clicked
    this.portfolioService.setLoading(true);
    const currentUserId = this.authService.getUserID();
    console.log("Came here");
    this.portfolioService
      .getPortFolioById(item.id)
      .pipe(
        switchMap((response) => {
          if (response.appUserId === currentUserId) {
            alert('You cannot accept your own requests');
            throw new Error('Cannot accept own request');
          }
          return this.authService.getUserByID(response.appUserId).pipe(
            switchMap((secondResponse) => {
              console.log(secondResponse);
              const to = String(this.authService.getEMail());
              const subject = 'Details of your accepted request';
              const body = `Food Details: ${item.description}\nPickup Location: ${item.address.addressLine}, ${item.address.city}, ${item.address.pincode}
              Details of the Donator User Name ${secondResponse.userName} ${secondResponse.phoneNumber} ${secondResponse.email} `;
              return this.authService.sendMail(to, subject, body).pipe(
                switchMap(() => {
                  const secondTo = `${secondResponse.email}`;
                  const secondSubject = 'Your request has been accepted';
                  const secondBody = `Accepted by UserName ${this.authService.getUsername()} contact info ${this.authService.getEMail()} ${this.authService.getPhone()}`;
                  return this.authService
                    .sendMail(secondTo, secondSubject, secondBody)
                    .pipe(
                      switchMap(() => {
                        alert('Please check your registered email');
                        return this.donorService.delete(item.id);
                      })
                    );
                })
              );
            })
          );
        })
      )
      .subscribe({
        next: (finalResponse) => {
          console.log('Final response:', finalResponse);
          this.initializeTimers(); // Reinitialize timers after accepting a request
          this.loading = false; // Set loading to false after process is complete
          this.portfolioService.setLoading(false);
        },
        error: (err) => {
          console.log(err);
          this.loading = false; // Set loading to false in case of an error
          this.portfolioService.setLoading(false);
        },
      });
  }


  View(item:Requests){
    this.dialog.open(ViewitemComponent, {
      width: '400px',
      data: {
        Description:item.description, 
        foodType: item.foodType,
        foodDetails: item.foodDetails
      }
    });
  }
}
