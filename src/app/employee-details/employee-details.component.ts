import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeDataService } from '../service/employee-data.service';
import { Employee } from '../employee.interface';
import { FormControl } from '@angular/forms';
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
  filterStatus = 'all';
  employeeData: any[] = [];
  searchControl = new FormControl('');

  constructor(private _employeeDataService: EmployeeDataService, private cdr: ChangeDetectorRef) {}

  /**
   * Angular Life cycle hook
   */
  ngOnInit() {
    this._employeeDataService.getEmployeeData()
      .subscribe((employeeData: Employee[]) => {
        this.employeeData = employeeData;
        this.employeeDataSource = new MatTableDataSource(employeeData);
      })
      
  }

 
  /**
   * Filter the table data
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    console.log('filter value', filterValue);
    this.employeeDataSource.filter = filterValue.trim().toLowerCase();
  }

  


  get filteredEmployees() {
    return this.employeeData.filter(
     (employee: any) => (this.filterStatus == 'all' || this.filterStatus == 'active' && employee.active) ||
     (this.filterStatus == 'inactive' && !employee.active))
  }
}
