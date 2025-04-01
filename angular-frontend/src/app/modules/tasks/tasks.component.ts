import { Component, OnInit } from '@angular/core';
import { TaskService } from '../../shared/services/task-service.service';
import { Task } from '../../shared/interfaces/task';
import { RouterModule } from '@angular/router';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { ErrorMessageComponent } from './error-message/error-message.component';
import { debounceTime, switchMap, map } from 'rxjs/operators';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-tasks',
  standalone: true,
  imports: [
    RouterModule,
    ReactiveFormsModule,
    ErrorMessageComponent,
    CommonModule
  ],
  templateUrl: './tasks.component.html',
  styleUrls: ['./tasks.component.css'],
})
export class TasksComponent implements OnInit {
  //Validaciones
  title = new FormControl('', [Validators.required, Validators.minLength(3)]);
  describe = new FormControl('', Validators.required);

  //Busqueda
  searchControl = new FormControl('');

  tasks: Task[] = [];

  //Las tareas filtradas seran un array de objetos de tareas
  filteredTasks: Task[] = [];

  constructor(private taskService: TaskService) {}

  ngOnInit(): void {
    //Carga las tareas al montar el componente
    this.loadTasks();

    // Detectar cambios en el campo de búsqueda, pipe es para encadenar
    this.searchControl.valueChanges //valueChanges es otro observable que va a proporcionar un valor cuando cambie el campo
      .pipe(
        debounceTime(300), // Espera 300ms después del último cambio
        map((searchTerm) => searchTerm || ''), //Transforma el termino, si es null lo reemplaza con ''
        switchMap((searchTerm) => //Cada vez que cambie el valor de búsqueda), se cancela la búsqueda anterior y emite una nueva
          this.taskService.searchTasks(searchTerm ?? '')) // Llama al método de búsqueda
      )
      .subscribe( //cuando la accion esta completa (detectar los cambios)
        (tasks) => {
          this.filteredTasks = tasks; // Actualiza las tareas filtradas en el componente
        },
        (error) => console.error('Error fetching tasks:', error) // Maneja errores
      );
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe(
      (tasks) => {
        this.tasks = tasks;
        this.filteredTasks = tasks; // Para que se actualice cuando se añade una tarea nueva
      },
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
