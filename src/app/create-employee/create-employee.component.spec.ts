import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEmployeeComponent } from './create-employee.component';
import { EmployeeDataService } from '../service/employee-data.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { of } from 'rxjs';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';

describe('CreateEmployeeComponent', () => {
  let component: CreateEmployeeComponent;
  let fixture: ComponentFixture<CreateEmployeeComponent>;
  let employeeDataService: jasmine.SpyObj<EmployeeDataService>;
  let router: jasmine.SpyObj<Router>;

  beforeEach(async () => {
    const routerSpy = jasmine.createSpyObj('Router', ['navigateByUrl']);
    await TestBed.configureTestingModule({
      declarations: [ CreateEmployeeComponent ],
      imports: [ReactiveFormsModule, FormsModule, BrowserAnimationsModule,
        MatButtonModule,
        MatCardModule,
        MatFormFieldModule,
        FormsModule,
        ReactiveFormsModule,
        MatSlideToggleModule,
        MatInputModule,
        HttpClientModule,
        RouterModule,
        MatTableModule],
      providers: [
        EmployeeDataService,
        { provide: Router, useValue: routerSpy },
      ],
    })
    .compileComponents();

    fixture = TestBed.createComponent(CreateEmployeeComponent);
    component = fixture.componentInstance;
    employeeDataService = TestBed.inject(EmployeeDataService) as jasmine.SpyObj<EmployeeDataService>;
    router = TestBed.inject(Router) as jasmine.SpyObj<Router>;
    spyOn(employeeDataService, 'addEmployee').and.returnValue(of());
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize the form with default values', () => {
    component.ngOnInit();
    const form = component.employeeForm;
    expect(form).toBeDefined();

    expect(form.get('employeeId')).toBeDefined();
    expect(form.get('firstName')).toBeDefined();
    expect(form.get('lastName')).toBeDefined();
    expect(form.get('email')).toBeDefined();
    expect(form.get('mobile')).toBeDefined();
    expect(form.get('address')).toBeDefined();
    expect(form.get('active')).toBeDefined();

  });

  xit('should call onSubmit() and add employee', () => {
    const employeeData = {
      employeeId: '123',
      firstName: 'John',
      lastName: 'Doe',
      email: 'john@example.com',
      mobile: '1234567890',
      address: '123 Main St',
      active: false,
    };
    
    component.ngOnInit();
    const form = component.employeeForm;

   employeeDataService.addEmployee.and.returnValue(of([employeeData]));

    component.onSubmit();

    expect(employeeDataService.addEmployee).toHaveBeenCalledWith(component.employeeForm.value);
    expect(router.navigateByUrl).toHaveBeenCalledWith('employee-details');
  });

  it('should not call onSubmit() if the form is invalid', () => {
    component.ngOnInit();

    component.onSubmit();
    expect(router.navigateByUrl).not.toHaveBeenCalled();
  });

  

});
