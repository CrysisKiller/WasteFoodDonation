import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { AuthService } from '../../Services/AuthServices/auth.service';
import { HeaderComponent } from '../../home/header/header.component';
import {MatSnackBarModule,MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatIconModule,
    RouterLink,
    HeaderComponent,
    MatSnackBarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = true;
  loginForm = new FormGroup({
    Username: new FormControl('', [Validators.required]),
    Password: new FormControl('', [
      Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/),
      Validators.required,
    ]),
  });
  UserName = '';
  private route = inject(Router);
  private service = inject(AuthService);
  private snackbar= inject(MatSnackBar);

  Login() {
    const password = String(this.loginForm.get('Password')?.value);
    const userName = String(this.loginForm.get('Username')?.value);
    if( userName==''&&password=='' ){
      this.openSnackBar('Please enter username and password');
      return;
    }
    // console.log(this.loginForm.value);
    this.service.login(userName, password).subscribe({
      next: (response) => {
         console.log(response);
        this.service.setUserDetails(response.userName,response.token,response.email,response.id,response.phoneNumber)
        this.route.navigateByUrl('apphome/hunger');
      },
      error: (err) => {
        // alert('Incorrect Username or password');
        this.openSnackBar('Incorrect Username or password!!');
      },
    });
  }
  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }
  openSnackBar(message:string){    
    this.snackbar.open(message,'' ,{
      horizontalPosition: 'center',
      verticalPosition: 'top',
      duration:2000
    });
  }
}
