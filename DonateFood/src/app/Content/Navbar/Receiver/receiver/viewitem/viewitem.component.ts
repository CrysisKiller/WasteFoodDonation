import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA,MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'app-viewitem',
  standalone: true,
  imports: [MatDialogModule,MatButtonModule],
  templateUrl: './viewitem.component.html',
  styleUrl: './viewitem.component.css',
})
export class ViewitemComponent {
  constructor(
    public dialogRef: MatDialogRef<ViewitemComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { foodType: string; foodDetails: string,Description:string }
  ) {}

  onClose(): void {
    this.dialogRef.close();
  }
}
