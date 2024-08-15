import { Routes } from '@angular/router';
import { LoginComponent } from './Login/login/login.component';
import { RegisterComponent } from './Login/register/register.component';
import { NGOComponent } from './Content/Donation/ngo.component';
import { ReceiverComponent } from './Content/Navbar/Receiver/receiver/receiver.component';
import { AboutusComponent } from './home/aboutus/aboutus.component';
import { ContactusComponent } from './home/contactus/contactus.component';
import { HomeComponent } from './home/home.component';
import { AppHomeComponent } from './Content/Navbar/AppHome/app-home/app-home.component';
import { NavbarComponent } from './Content/Navbar/navbar/navbar.component';

export const routes: Routes = [
  { path: '', component:HomeComponent},
  {path:'Home' ,component:HomeComponent},
  { path: 'about', component: AboutusComponent },
  { path: 'contact', component: ContactusComponent },
  {path: 'login', component: LoginComponent },
  {path : 'register',component:RegisterComponent},
  
  {
    path: 'apphome',
    // component:AppHomeComponent,
    component:NavbarComponent,
    children:[
      {
        path:'hunger',
        component:AppHomeComponent
      },
      {
        path: 'receiver',
        component: ReceiverComponent,
      },
      {
        path:'donor',
        component:NGOComponent
      },
    ]
  },      
  // {
  //   path: 'receiver',
  //   component: ReceiverComponent,
  // },
  // {
  //   path:'donor',
  //   component:NGOComponent
  // },

  {path:'**',component: LoginComponent },


];
