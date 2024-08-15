import { Component, OnInit, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormField } from '@angular/material/form-field';
import { MatDialogModule } from '@angular/material/dialog';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { NgIf } from '@angular/common';
import { Requests } from './Requests';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatExpansionModule} from '@angular/material/expansion';
import { DonorService } from '../../../Services/DonorServices/donor.service';
import { PortfolioService } from '../../../Services/PortfolioService/portfolio.service';
import {MatSelectModule} from '@angular/material/select';

import { switchMap } from 'rxjs';
@Component({
  selector: 'app-ngo-request',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormField,
    MatDialogModule,
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    NgIf,
    MatDatepickerModule,
    MatNativeDateModule,
    MatExpansionModule,
    MatSelectModule,
    ],
  templateUrl: './donation-request.component.html',
  styleUrl: './donation-request.component.css',
})
export class DonationRequestComponent implements OnInit {
  // private Id:number=0;
  private DonorService = inject(DonorService);
  private PortfolioService = inject(PortfolioService);
  private DonorId!:number;
  requests: Requests[] = [];

  Donation = new FormGroup({
    foodDetails: new FormControl('', Validators.required),
    Description: new FormControl('', Validators.required),
    // ExpDate:new FormControl(null,Validators.required),
    // time:new FormControl('',Validators.required),
    foodType : new FormControl('',Validators.required),
    Address:new FormGroup({
      addressLine:new FormControl('',Validators.required),
      state: new FormControl('',Validators.required),
      city : new FormControl('',Validators.required),
      pincode : new FormControl('',Validators.required)
    })
  });

  ngOnInit(){
    // this.loadRequest();
  }



  addRequest() {

    const formData = this.Donation.value;
    const Address = formData.Address;

    const detail =String(formData.foodDetails) ;
    const Description = String(formData.Description);
    const foodType = String(formData.foodType);
    const Addressline=String(Address?.addressLine);
    const city = String(Address?.city);
    const state = String(Address?.state);
    const pincode = Number(Address?.pincode);
    const combinedDateTime= this.setDateTime(foodType);

   
      this.DonorService.post(detail,Description ,combinedDateTime,foodType).pipe(
        switchMap(response => {
          this.DonorId = response.id;
          return this.DonorService.postAddress(Addressline, city, state, pincode, this.DonorId);
        }),
        switchMap(response => {
          return this.PortfolioService.postPortFolio(this.DonorId);
        })
      ).subscribe({
        next: response => {
          alert("Request successfully added");
          this.PortfolioService.getPortFolio();
        },
        error: err => {
          alert("An unknown error occurred");
        }
      });


  }



  setDateTime(value:string):string{
    const type = value.toLowerCase();
    const currentDate = new Date();
    if(type=="cooked food"){
      // currentDate.setHours(currentDate.getHours() + 7);
        currentDate.setMinutes(currentDate.getMinutes()+5);
    }
    else if(type=="bakery items"){
      // currentDate.setDate(currentDate.getDate()+3);
      currentDate.setMinutes(currentDate.getMinutes()+1);
    }
    else if (type=="packed food"){
      currentDate.setDate(currentDate.getDate()+10);
    }
    return currentDate.toLocaleString();;
  }
}
