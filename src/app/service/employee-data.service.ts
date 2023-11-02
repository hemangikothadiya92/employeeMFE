import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Employee } from '../employee.interface';

@Injectable({
  providedIn: 'root'
})
export class EmployeeDataService {

  constructor(private _http: HttpClient) { }

  /**
   * POST request to add employee 
   * @param payload 
   * @returns Observable
   */
  addEmployee(payload: any): Observable<Employee[]> {
    return this._http.post<Employee[]>('http://localhost:3000/employee', payload);
  }

  /**
   * GET request to get active employee data
   * @returns Observable
   */
  getEmployeeData():  Observable<Employee[]> {
    return this._http.get<Employee[]>('http://localhost:3000/employee');
  }

}
