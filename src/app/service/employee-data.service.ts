import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private _http: HttpClient) { }

  addEmployee(payload: any) {
    return this._http.post('http://localhost:3000/employee', payload);
  }

  getEmployeeData() {
    return this._http.get('http://localhost:3000/employee')
    .pipe(
      map((employee: any) => employee.filter((employee: any) => employee.active))
    )
  }

  mapEmployeeProjectIds() {
    
  }
}
