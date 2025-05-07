import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { TaskService } from '../../Service/task.service';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrl: './setting.component.css'
})
export class SettingComponent {

  LocalStorage_SettingData:any;
  timer=25;
  breaktime=5;
  selectedSound: string = 'digital-clock';  // default selection
  audio = new Audio();

 constructor(public dialogRef: MatDialogRef<SettingComponent>,private taskService:TaskService) {

 this.LocalStorage_SettingData= JSON.parse(localStorage.getItem('SettingData') || '[]');
 console.log(this.LocalStorage_SettingData)
  if(this.LocalStorage_SettingData[0]){
    this.timer=this.LocalStorage_SettingData[0].timer,
    this.breaktime=this.LocalStorage_SettingData[0].breaktime,
    this.selectedSound=this.LocalStorage_SettingData[0].selectedSound
  }
 }

  closeDialog(): void {
    this.audio.pause();   
    this.dialogRef.close();
  }

  saveSetting(SettingForm: any): void  {

    const SettingData = {
     timer:this.timer,
     breaktime:this.breaktime,
    selectedSound:this.selectedSound
    };
    let existingData = [];   
    existingData.push(SettingData);

    localStorage.setItem('SettingData', JSON.stringify(existingData));
    this.taskService.notifyTaskUpdated(); // ✅ notify other components 
    this.audio.pause();
    this.dialogRef.close(); // Close dialog
    }

    playSelectedSound() {
      const soundMap: { [key: string]: string } = {
        'digital-clock': 'assets/digital-clock-digital-alarm-buzzer.wav',
        'rooster-crowing': 'assets/mixkit-rooster-crowing-in-the-morning-2462.wav',
        'slot-win': 'assets/mixkit-slot-machine-win-alarm-1995.wav' 
      };

      const soundUrl = soundMap[this.selectedSound];
      if (soundUrl) {
        this.audio.pause();        // Stop previous sound
        this.audio.src = soundUrl;
        this.audio.load();
        this.audio.play().catch(error => console.error("Audio playback failed:", error));
      }
    }
}
