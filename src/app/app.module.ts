import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { TimerComponent } from './View/timer/timer.component';
import { BreakTimerComponent } from './View/break-timer/break-timer.component';
import { TaskListComponent } from './View/task-list/task-list.component';
import { AddNewTaskComponent } from './View/add-new-task/add-new-task.component';
import { HomeComponent } from './View/home/home.component';
import { AppRoutingModule } from './app-routing.module';
import { SettingComponent } from './View/setting/setting.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { FormsModule } from '@angular/forms';
import { UserGuideComponent } from './View/user-guide/user-guide.component';

@NgModule({
  declarations: [
    AppComponent,
    TimerComponent,
    BreakTimerComponent,
    TaskListComponent,
    AddNewTaskComponent,
    HomeComponent,
    SettingComponent,
    UserGuideComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
