import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-user-guide',
  templateUrl: './user-guide.component.html',
  styleUrl: './user-guide.component.css'
})
export class UserGuideComponent {

constructor( public dialogRef: MatDialogRef<UserGuideComponent>){}

  closeDialog() {
    this.dialogRef.close();
    }
}
