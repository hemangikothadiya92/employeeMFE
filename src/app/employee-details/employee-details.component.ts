import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeDataService } from '../service/employee-data.service';
import { Employee } from '../employee.interface';
import { BehaviorSubject, Subject, combineLatest, debounceTime, distinctUntilChanged, map, switchMap, tap } from 'rxjs';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.scss'],
})
export class EmployeeDetailsComponent implements OnInit {
  displayedColumns: string[] = [
    'Employeeid',
    'firstname',
    'lastname',
    'email',
    'mobile',
    'address',
    'active',
  ];
  employeeDataSource = new MatTableDataSource<any>();
  selectedStatusFilter = 'all';
  searchCriteria = '';
  statusFilter$ = new BehaviorSubject<string>('all');
  searchCriteria$ = new BehaviorSubject<string>('');

  constructor(private _employeeDataService: EmployeeDataService, private cdr: ChangeDetectorRef) {}

  /**
   * Angular Life cycle hook
   */
  ngOnInit() {
    combineLatest([this.statusFilter$, this.searchCriteria$]).subscribe(([status, search]) => {
      this._employeeDataService.getEmployeeData().pipe(
        map((employees: Employee[]) => {
          if (status === 'active') {
            return employees.filter(emp => emp.active === true);
          } else if (status === 'inactive') {
            return employees.filter(emp => emp.active === false);
          } else {
            return employees;
          }
        }),
        map(filteredEmployees => {
          return filteredEmployees.filter(emp =>
            emp.firstName.toLowerCase().includes(search.toLowerCase()) ||
            emp.lastName.toLowerCase().includes(search.toLowerCase())
          );
        })
      ).subscribe(filteredData => {
        this.employeeDataSource.data = filteredData;
      });
    });
  }
      
  /**
   * call when user search
   */
  search() {
    this.searchCriteria$.next(this.searchCriteria);
  }

  /**
   * call when user change the status
   */
  filterByStatus() {
    this.statusFilter$.next(this.selectedStatusFilter);
  }
}
