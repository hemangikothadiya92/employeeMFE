import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { EmployeeDataService } from '../service/employee-data.service';

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

  ngOnInit() {
    this._employeeDataService.getEmployeeData()
      .subscribe((employeeData: any) => {
        console.log('employee data: ', employeeData);
        this.employeeDataSource = new MatTableDataSource(employeeData);
      })
  }


  applyFilter(event: Event) {
    console.log('apply filter: ', event);
    const filterValue = (event.target as HTMLInputElement).value;
    this.employeeDataSource.filter = filterValue.trim().toLowerCase();
  }
}
