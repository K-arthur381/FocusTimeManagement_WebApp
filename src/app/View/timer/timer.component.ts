import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TaskService } from '../../Service/task.service';


@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrl: './timer.component.css'
})
export class TimerComponent {

  LocalStorage_SettingData:any;
  timeLeft: number = 1500; // 12 minutes in seconds
  minutes: number = 25;
  seconds: number = 0;
  interval: any;
  TaskData:any;
  isRunning: boolean = false;
  isCompleted: boolean = false; // Track if timer is completed
  audio = new Audio('assets/digital-clock-digital-alarm-buzzer.wav'); 
  ProgressData: any;
  selectedSound:any;

  constructor(private route: Router ,private taskService:TaskService){  }
  ngOnInit() {
    this.taskService.taskUpdated$.subscribe(() => {
      this.loadTimerData();
    });
  
    // Ask for permission early
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }
  }
  
  
  loadTimerData(){
    this.LocalStorage_SettingData= JSON.parse(localStorage.getItem('SettingData') || '[]');
     if(this.LocalStorage_SettingData[0]){
       this.minutes=this.LocalStorage_SettingData[0].timer,
      // this.breaktime=this.LocalStorage_SettingData[0].breaktime,
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
    this.TaskData = JSON.parse(localStorage.getItem('TaskData') || '[]');
    this.ProgressData = this.TaskData.filter((t: { status: string }) => t.status !== 'Finish');
  
    if (this.ProgressData.length > 0) {
      if (!this.isRunning) {
        this.isRunning = true;
        this.isCompleted = false;
  
        const startTime = Date.now();
        const endTime = startTime + this.timeLeft * 1000;
  
        this.interval = setInterval(() => {
          const now = Date.now();
          const diff = Math.floor((endTime - now) / 1000);
  
          if (diff >= 0) {
            this.timeLeft = diff;
            this.minutes = Math.floor(diff / 60);
            this.seconds = diff % 60;
          } else {
            this.CheckTask();
            this.stopTimer();
            this.playSound();
            this.showNotification();
            this.isCompleted = true;
          }
        }, 1000);
      }
    } else {
      alert("လုပ်ဆောင်မည့် လုပ်ငန်းဆောင်တာ အား ဉီးစွာထည့်ပေးပါရန်");
    }
  }
  

  pauseTimer() {
    if (this.isRunning) {
      clearInterval(this.interval);
      this.isRunning = false;
    }
  }

  stopTimer() {
    clearInterval(this.interval);
    this.isRunning = false;
  }

  playSound() {
    this.audio.play();
  }

  breakTimer(){
    this.audio.pause();
    this.route.navigate(['breaktimer']); 
  }

  resetTimer() {
    this.stopTimer();
    this.timeLeft = 5;
    this.minutes = 0;
    this.seconds = 5;
    this.isCompleted = false;
    this.audio.pause();
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
  

  CheckTask() {
    this.TaskData=JSON.parse(localStorage.getItem('TaskData') || '[]');
    console.log("Arrive first",this.TaskData)
    for (let i = 0; i < this.TaskData.length; i++) {
      let task = this.TaskData[i];
  
      if (task.status !== 'Finish' && task.currentTask==1) {    
          task.currentintervalCount += 1;
   
        if (task.currentintervalCount >= task.intervalCount) {
          task.status = 'Finish';
          task.currentTask=0;
        } else {
          task.status = 'Progress';
        }
  
        break; // Stop after updating the first non-finished task
      }
      this.TaskData[i] =task;
    }
    console.log("Arrive",this.TaskData)
    localStorage.setItem('TaskData', JSON.stringify(this.TaskData));
    this.taskService.notifyTaskUpdated(); // ✅ notify other components 
  }
  
  
}
