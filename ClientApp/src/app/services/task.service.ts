import { Injectable, Inject } from '@angular/core';
import { HttpClient , HttpHeaders } from '@angular/common/http';

import { Observable, of, observable } from 'rxjs';
import { catchError , map, tap } from 'rxjs/operators';
import { Task} from '../models/task';

const httpOptions = {
headers: new HttpHeaders ({ 'Content-Type': 'application/json'})
};

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl:string) { }

  addTask(task:Task): Observable<Task> {
    return this.http.post<Task>(this.baseUrl+'api/Task',task,httpOptions).pipe(
      tap((newTask: Task) => this.log(`added NewTask w/ id=${newTask.id}`)),
      catchError(this.handleError<Task>('addTask'))
    );
  }

  getAll():Observable<Task[]>{
    return this.http.get<Task[]>(this.baseUrl+'api/Task').pipe(
      tap(_=>this.log('Se consulta la información')),
      catchError(this.handleError<Task[]>('getAll'))
    );
  }
  get(id: number): Observable<Task>
  {
    const url=`${this.baseUrl + 'api/Task'}/${id}`;
    return this.http.get<Task>(url).pipe(
      tap(_=>this.log(`fetched task id=${id}`)),
      catchError(this.handleError<Task>(`getHero id=${id}`))
    );
  }
  update(task: Task): Observable<any> {
    const url=`${this.baseUrl + 'api/Task'}/${task.id}`;
    return this.http.put(url,task,httpOptions).pipe(
      tap(_=>this.log(`updated task id=${task.id}`)),
      catchError(this.handleError<any>('task'))
    );
  }
  delete(task: Task | number): Observable<Task>{
    const id= typeof task === 'number' ? task: task.id;
    const url= `${this.baseUrl + 'api/Task'}/${id}`;

    return this.http.delete<Task>(url,httpOptions).pipe(
      tap(_=>this.log(`deleted task id=${id}`)),
      catchError(this.handleError<Task>('deletedTask'))
    );
  }
  private handleError<T>(operation = 'operation', result?: T){
    return (error: any): Observable<T> => {
      console.error(error);
      this.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
  private log(message: string){
    alert(`TaskService: ${message}`);
  }
}
