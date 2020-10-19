import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Task } from '@app/_models/todo.model';

@Injectable({
    providedIn: 'root'
})
export class TODOListService{

    constructor(private http: HttpClient) {}

    public findTaksForUser():Observable<Task[]>{
        return this.http.get<Task[]>(environment.apiUrl+'/tasks');
    }

    public updateTask(formData:any){
        return this.http.put<Task>(environment.apiUrl+'/tasks/update',formData);
    }

    public deleteTask(id:number){
        return this.http.delete(environment.apiUrl+'/tasks/delete/'+id.toString());
    }

    public saveTask(formData:any){
        return this.http.post<Task>(environment.apiUrl+'/tasks/add',formData);
    }
}