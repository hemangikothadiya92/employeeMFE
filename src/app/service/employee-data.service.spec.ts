import { TestBed } from '@angular/core/testing';

import { EmployeeDataService } from './employee-data.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

describe('EmployeeDataService', () => {
  let service: EmployeeDataService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [EmployeeDataService],
    });
    service = TestBed.inject(EmployeeDataService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should send an HTTP POST request to add an employee', () => {
    const employeeData = {
      employeeId: 1,
      active: true,
      address: '123 Main St',
      email: 'john@example.com',
      firstname: 'John',
      lastname: 'Doe',
      mobile: '1234567890',
    };

    service.addEmployee(employeeData).subscribe((response: any) => {
      expect(response).toBeTruthy();
    });

    const req = httpTestingController.expectOne('http://localhost:3000/employee');
    expect(req.request.method).toBe('POST');
    req.flush({ success: true }); 

    httpTestingController.verify();
  });

  it('should send an HTTP GET request to retrieve employee data', () => {
    const mockEmployeeData = [
      { Employeeid: 1, firstname: 'John', lastname: 'Doe', email: 'john@example.com', mobile: '1234567890', address: '123 Main St', active: true },
    ];

    service.getEmployeeData().subscribe((employeeData: any) => {
      expect(employeeData).toEqual(mockEmployeeData);
    });

    const req = httpTestingController.expectOne('http://localhost:3000/employee');
    expect(req.request.method).toBe('GET');
    req.flush(mockEmployeeData); 

    httpTestingController.verify();
  });
});
