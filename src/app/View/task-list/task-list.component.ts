import { Component, ElementRef, HostListener } from '@angular/core';
import { AddNewTaskComponent } from '../add-new-task/add-new-task.component';
import { MatDialog } from '@angular/material/dialog';
import { TaskService } from '../../Service/task.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrl: './task-list.component.css'
})
export class TaskListComponent {

showOptions = false;
TaskData:any;
ProgressData:any;
FinishData:any;
temp:any;

constructor(public dialog: MatDialog,private taskService:TaskService,private eRef: ElementRef){
  this.loadTaskData();
}

ngOnInit() {
  this.taskService.taskUpdated$.subscribe(() => {
    this.loadTaskData(); // reload logic
  });
}

 @HostListener('document:click', ['$event'])
  onClickOutside(event: Event) {
    if (!this.eRef.nativeElement.contains(event.target)) {
      this.showOptions = false;
    }
  }

loadTaskData(){
  this.temp=JSON.parse(localStorage.getItem('TaskData') || '[]');
  if (this.temp.length > 0) {
    for (let i = 0; i < this.temp.length; i++) {
      if(this.temp[i].status!='Finish'){
        this.temp[i].currentTask=1;
        break;
      }
    }
  }
  localStorage.setItem('TaskData', JSON.stringify(this.temp));// Update localStorage 
  this.TaskData=JSON.parse(localStorage.getItem('TaskData') || '[]');    
  this.ProgressData=this.TaskData.filter((t: { status: string; }) => t.status !== 'Finish');
  this.FinishData=this.TaskData.filter((t: { status: string; }) => t.status == 'Finish');
}

openTaskDialog(): void {
  const dialogRef = this.dialog.open(AddNewTaskComponent, {
    width: '800px',
  });
  dialogRef.afterClosed().subscribe(() => {
    // Refresh TaskData from localStorage
    this.loadTaskData();
  });
}

  // Open dialog to edit task
  editTask(index: number): void {
    const dialogRef = this.dialog.open(AddNewTaskComponent, {
      width: '800px',
      data: { task: this.TaskData[index], index } // Pass task data to dialog
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        // Update the task data in TaskData and localStorage
        this.TaskData[result.index] = result.task;
        localStorage.setItem('TaskData', JSON.stringify(this.TaskData));// Update localStorage     
      }
      this.loadTaskData();
    });
  }

  // Delete task from TaskData and localStorage
  deleteTask(index: number): void {
    if (confirm("Are you sure you want to delete this task?")) {
      this.TaskData.splice(index, 1); // Remove task from array
      localStorage.setItem('TaskData', JSON.stringify(this.TaskData)); // Update localStorage
      this.loadTaskData();
    }
  }

  
  deleteAllTasks() {
    this.TaskData=[];
    localStorage.setItem('TaskData', JSON.stringify(this.TaskData)); // Update localStorage
    this.showOptions = false;
    this.loadTaskData();
  }
  
  deleteAllFinishTasks() {
    // Filter out the tasks that have the status 'Finish'
  this.TaskData = this.TaskData.filter((t: { status: string; }) => t.status !== 'Finish');
    localStorage.setItem('TaskData', JSON.stringify(this.TaskData)); // Update localStorage
    this.showOptions = false;
    this.loadTaskData();
  }
  


}
