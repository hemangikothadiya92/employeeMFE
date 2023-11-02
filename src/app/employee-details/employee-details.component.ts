import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeDataService } from '../service/employee-data.service';
import { Employee } from '../employee.interface';

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


  constructor(private _employeeDataService: EmployeeDataService, private cdr: ChangeDetectorRef) {}

  /**
   * Angular Life cycle hook
   */
  ngOnInit() {
    this._employeeDataService.getEmployeeData()
      .subscribe((employeeData: Employee[]) => {
        this.employeeDataSource = new MatTableDataSource(employeeData);
      })
  }

  /**
   * Filter the table data
   * @param event 
   */
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeDataSource.filter = filterValue.trim().toLowerCase();
  }
}
