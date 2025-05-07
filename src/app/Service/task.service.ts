// task.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class TaskService {
  private taskUpdatedSource = new BehaviorSubject<boolean>(false);
  taskUpdated$ = this.taskUpdatedSource.asObservable();

  notifyTaskUpdated() {
    this.taskUpdatedSource.next(true); // trigger notification
  }
}
