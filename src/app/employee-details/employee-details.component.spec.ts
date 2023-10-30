import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployeeDetailsComponent } from './employee-details.component';
import { EmployeeDataService } from '../service/employee-data.service';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { HttpClientModule } from '@angular/common/http';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterModule } from '@angular/router';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { of } from 'rxjs';

describe('EmployeeDetailsComponent', () => {
  let component: EmployeeDetailsComponent;
  let fixture: ComponentFixture<EmployeeDetailsComponent>;
  let employeeDataService: jasmine.SpyObj<EmployeeDataService>;

  beforeEach(async () => {
    const employeeDataServiceSpy = jasmine.createSpyObj('EmployeeDataService', ['getEmployeeData']);
    
    await TestBed.configureTestingModule({
      declarations: [ EmployeeDetailsComponent ],
      imports: [ReactiveFormsModule, FormsModule, BrowserAnimationsModule, HttpClientTestingModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        MatSlideToggleModule,
        MatInputModule,
        HttpClientModule,
        RouterModule,
        MatTableModule],
        providers: [
          { provide: EmployeeDataService, useValue: employeeDataServiceSpy },
        ],
    });
    fixture = TestBed.createComponent(EmployeeDetailsComponent);
    component = fixture.componentInstance;
    employeeDataService = TestBed.inject(EmployeeDataService) as jasmine.SpyObj<EmployeeDataService>;
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load employee data on ngOnInit', () => {
    const mockEmployeeData = [
      {
        Employeeid: 1,
        firstname: 'John',
        lastname: 'Doe',
        email: 'john@example.com',
        mobile: '1234567890',
        address: '123 Main St',
        active: true,
      },
    ];
    employeeDataService.getEmployeeData.and.returnValue(of(mockEmployeeData));
    component.ngOnInit();

    expect(employeeDataService.getEmployeeData).toHaveBeenCalled();
    expect(component.employeeDataSource.data).toEqual(mockEmployeeData);
  });

  it('should apply a filter to the table data', () => {
    const mockEmployeeData = [
      { Employeeid: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com', mobile: '1234567890', address: '123 Main St', active: true },
    ];

    employeeDataService.getEmployeeData.and.returnValue(of(mockEmployeeData));

    component.ngOnInit();

    const filterValue = 'john';
    component.applyFilter({ target: { value: filterValue } } as unknown as Event);

    expect(component.employeeDataSource.filter).toBe(filterValue);
  });

});
