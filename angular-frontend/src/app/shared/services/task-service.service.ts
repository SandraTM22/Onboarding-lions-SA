// src/app/task.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Task } from '../interfaces/task';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  private apiUrl = 'http://localhost:8000/api/tasks'; //Apunta al backend(entrada de los datos)

  constructor(private http: HttpClient) {}

  //http.get<Task[]>(this.apiUrl): Llama a la URL de la API (this.apiUrl), 
  //que devuelve todas las tareas en formato JSON. El tipo Task[] nos dice que esperamos una lista de tareas.

  //Observable:  emitirá las tareas cuando la petición se complete. Esto permite trabajar con los datos de manera asíncrona

  getTasks(): Observable<Task[]> {
    return this.http.get<Task[]>(this.apiUrl);
  }

  addTask(task: Task): Observable<Task> {
    return this.http.post<Task>(this.apiUrl, task);
  }
  
  updateTask(task: Task): Observable<Task> {
    return this.http.put<Task>(`${this.apiUrl}/${task.id}`, task);
  }
  

  deleteTask(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
