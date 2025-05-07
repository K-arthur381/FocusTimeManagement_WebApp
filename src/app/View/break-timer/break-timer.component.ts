import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../Service/task.service';

@Component({
  selector: 'app-break-timer',
  templateUrl: './break-timer.component.html',
  styleUrl: './break-timer.component.css'
})
export class BreakTimerComponent {

  timeLeft: number = 300; // total time in seconds for the countdown.
  minutes: number = 5;
  seconds: number = 0;
  interval: any;      //reference to the setInterval timer (so we can stop it).
  audio = new Audio('assets/digital-clock-digital-alarm-buzzer.wav'); 
  LocalStorage_SettingData:any;
selectedSound:any;

constructor(private route: Router,private taskService:TaskService){
  this.startTimer();
}

ngOnInit() {
  this.taskService.taskUpdated$.subscribe(() => {
    this.loadBreaktimeData(); // reload logic
  });
    // Ask for permission early
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
}


loadBreaktimeData(){
  this.LocalStorage_SettingData= JSON.parse(localStorage.getItem('SettingData') || '[]');
   if(this.LocalStorage_SettingData[0]){
    // this.minutes=this.LocalStorage_SettingData[0].timer,
     this.minutes=this.LocalStorage_SettingData[0].breaktime,
     this.selectedSound=this.LocalStorage_SettingData[0].selectedSound
     this.timeLeft=this.minutes*60;

      const soundMap: { [key: string]: string } = {
        'digital-clock': 'assets/digital-clock-digital-alarm-buzzer.wav',
        'rooster-crowing': 'assets/mixkit-rooster-crowing-in-the-morning-2462.wav',
        'slot-win': 'assets/mixkit-slot-machine-win-alarm-1995.wav' 
      };

      const soundUrl = soundMap[this.selectedSound];
        this.audio.pause();        // Stop previous sound
        this.audio.src = soundUrl;
   }
}

  startTimer() {  
    const startTime = Date.now();
    const endTime = startTime + this.timeLeft * 1000;

    this.interval = setInterval(() => {
      const now = Date.now();
      const diff = Math.floor((endTime - now) / 1000);

      if (diff > 0) {
        this.timeLeft = diff;
        this.minutes = Math.floor(diff / 60);
        this.seconds = diff % 60;
      } else {
        this.stopTimer();
        this.playSound();
        this.showNotification();
      }
    }, 1000);
  }

  stopTimer() {
    clearInterval(this.interval);
  }

  AddSecond(){
    this.timeLeft+=20;
    this.seconds+=20;

    if(this.seconds>=60){
      this.seconds-=60;
      this.minutes+=1;
    }
  }
  
  playSound() {
    this.audio.play();
  }
 
  showNotification() {
    if (Notification.permission === 'granted') {
      new Notification('⏰ Alarm', {
        body: 'Time is up! Go back to work.',
        icon: 'assets/timer-icon.png' // optional
      });
    } else {
      Notification.requestPermission().then(permission => {
        if (permission === 'granted') {
          new Notification('⏰ Alarm', {
            body: 'Time is up! Go back to work.'
          });
        }
      });
    }
  }

  Skip(){
    this.audio.pause();
    this.route.navigate(['timer']);
  }
}
