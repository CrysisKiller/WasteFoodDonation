import { Component, inject } from '@angular/core';
import { HeaderComponent } from '../header/header.component';
import { MatFormField } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../Services/AuthServices/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-contactus',
  standalone: true,
  imports: [
    HeaderComponent,
    MatFormField,
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatSnackBarModule,
  ],
  templateUrl: './contactus.component.html',
  styleUrl: './contactus.component.css',
})
export class ContactusComponent {
  contactus = new FormGroup({
    name: new FormControl(''),
    email: new FormControl(''),
    message: new FormControl(''),
  });
  private readonly authService = inject(AuthService);
  private snackbar= inject(MatSnackBar);


  sendMail() {
    console.log(this.contactus.value);
    const to = String(this.contactus.get('email')?.value);
    const name = this.contactus.get('name')?.value;
    const message =
      `User ${name} Has requested to contact you ` +
      this.contactus.get('message')?.value;
    const subject = 'Contact us';
    this.authService.sendMail(to, subject, message).subscribe((success) => {
      this.openSnackBar("Thank You For Contacting us we will get back to you soon");
    });
  }

  openSnackBar(message:string){
    
    this.snackbar.open(message,'' ,{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration:2000
    });
  }
}
