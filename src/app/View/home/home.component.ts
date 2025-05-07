import { Component, ElementRef, HostListener } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { SettingComponent } from '../setting/setting.component';
import { UserGuideComponent } from '../user-guide/user-guide.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {

  showOptions:boolean=false;
  
  constructor(public dialog: MatDialog,private eRef: ElementRef){}
  
  OpenSettingDialog(): void {
      this.dialog.open(SettingComponent, {
        width: '400px', 
        position: { right: '10px' } // Optional: Set dialog width
      });
    }

    OpenUserGuideDialog(){
      this.dialog.open(UserGuideComponent, {
        width: '400px', 
       
      });
    }

    @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showOptions = false;
    }
  }

}
