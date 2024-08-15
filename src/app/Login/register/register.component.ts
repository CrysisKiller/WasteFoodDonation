import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { Router, RouterLink } from '@angular/router';
import { NgIf } from '@angular/common';
import { AuthService } from '../../Services/AuthServices/auth.service';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatIconModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    FormsModule,
    RouterLink,
    NgIf,
    MatSnackBarModule
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  hide = true;
  RegisterForm = new FormGroup({
    UserName: new FormControl('', [Validators.required]),
    Email: new FormControl('', [Validators.required, Validators.email]),
    Password: new FormControl('', [
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
      Validators.required,
    ]),

    ConfirmPassword: new FormControl('', [
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
      Validators.required,
    ]),
    Phone: new FormControl('',[Validators.required])
  });
  private service = inject(AuthService);
  private route=inject(Router);
  private snackBar = inject(MatSnackBar);


  Register(): void {
    if(this.RegisterForm.invalid){
      this.openSnackBar('Please fill all the details');
      return;
    }
    const Password = String(this.RegisterForm.get('Password')?.value);
    const Email = String(this.RegisterForm.get('Email')?.value);
    const UserName = String(this.RegisterForm.get('UserName')?.value);
    const ConfirmPassword = String(this.RegisterForm.get('ConfirmPassword')?.value);
    const PhoneNumber = Number(this.RegisterForm.get('Phone')?.value);
    if (Password != ConfirmPassword){
      this.openSnackBar('Password does not match');
      return;
    }

    if (!this.RegisterForm.invalid) {
      this.service.Register(UserName, Password, Email,PhoneNumber).subscribe({
        next:(response)=>{   
          this.openSnackBar("Registered Successfully please login using ur Credentials")
          this.route.navigateByUrl('login');
        },
        error:err=>{
          const errors =err.error[0];
          this.openSnackBar(`${errors.description}\n Please Enter a different username`);
        }
      });
    }
  }

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  openSnackBar(message:string){
    this.snackBar.open(message,'',{
      horizontalPosition:'center',
      verticalPosition:'top',
      duration:3000 
    })
  }
}
