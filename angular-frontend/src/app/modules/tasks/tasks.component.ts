import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../shared/services/task-service.service';
import { Task } from '../../shared/interfaces/task';
import { RouterModule } from '@angular/router';
import {
  FormControl,
  ReactiveFormsModule,
  Validator,
  Validators,
} from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';

@Component({
  selector: 'app-tasks',
  imports: [
    CommonModule,
    RouterModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  describe = new FormControl('', Validators.required);

  tasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => (this.tasks = tasks),
      (error) => console.error('Error fetching tasks:', error)
    );
  }

  addTask(title: string): void {
    if (this.title.invalid || this.describe.invalid) return;

    const newTask: Task = { id: 0, title, completed: false };
    this.taskService.addTask(newTask).subscribe(() => this.loadTasks());
  }

  toggleTask(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe(() => this.loadTasks());
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe(() => this.loadTasks());
  }
}
