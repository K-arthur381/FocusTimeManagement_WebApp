import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './View/home/home.component';
import { TimerComponent } from './View/timer/timer.component';
import { BreakTimerComponent } from './View/break-timer/break-timer.component';
import { TaskListComponent } from './View/task-list/task-list.component';
import { AddNewTaskComponent } from './View/add-new-task/add-new-task.component';
import { SettingComponent } from './View/setting/setting.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'timer', component: TimerComponent },
  { path: 'breaktimer', component: BreakTimerComponent },
  { path: 'tasklist', component: TaskListComponent },
  { path: 'addnewtask', component: AddNewTaskComponent },
  { path: 'setting', component: SettingComponent },
  { path: '', redirectTo: '/timer', pathMatch: 'full' },
  { path: '**', redirectTo: '/timer' } // wildcard route to handle 404
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
