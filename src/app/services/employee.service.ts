import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {

  constructor(private _http: HttpClient) { }
  addEmployee(data:any): Observable<any>{
    return this._http.post('http://localhost:3000/emlopees', data);
  }

  updateEmployee(id: number,data:any): Observable<any>{
    return this._http.put(`http://localhost:3000/emlopees/${id}`, data);
  }

  getEmployeeList(data:any): Observable<any>{
    return this._http.get('http://localhost:3000/emlopees');
  }

  deleteEmployee(id: number): Observable<any> {
    return this._http.delete(`http://localhost:3000/emlopees/${id}`);

  }
}
