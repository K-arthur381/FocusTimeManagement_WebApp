import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-add-new-task',
  templateUrl: './add-new-task.component.html',
  styleUrls: ['./add-new-task.component.css']
})
export class AddNewTaskComponent {

  taskName = '';
  intervalCount = 1;
  currentintervalCount=0;
  note = '';
  status='';
  currentTask= 0;
  index: number = -1;

  constructor(
    public dialogRef: MatDialogRef<AddNewTaskComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data?.task) {
      this.taskName = data.task.taskName;
      this.intervalCount = data.task.intervalCount;
      this.note = data.task.note;
      this.index = data.index;
      this.status=data.task.status,
      this.currentTask=data.task.currentTask,
      this.currentintervalCount=data.task.currentintervalCount
    }
  }

  saveTask(taskForm: any): void {

    if (taskForm.valid && this.intervalCount>0) {

      const taskData = {
        taskName: this.taskName,
        intervalCount: this.intervalCount,
        note: this.note,
        status:'Start',
        currentTask:0,
        currentintervalCount:0
      };

      let existingTasks = JSON.parse(localStorage.getItem('TaskData') || '[]');

      if (this.index !== -1) {
        // Edit existing task
        existingTasks[this.index] = taskData;
      } else {
        // Add new task
        existingTasks.push(taskData);
      }

      localStorage.setItem('TaskData', JSON.stringify(existingTasks));
      this.dialogRef.close(); // Close dialog
    } else {
      alert('လုပ်ဆောင်မည့် အရေအတွက် သည် တစ်ကြိမ်ထက်(သို့)တစ်ကြိမ် ဖစ်ရန်လိုအပ်သည်');
    }
  }

  closeDialog() {
    this.dialogRef.close();
    }
}
