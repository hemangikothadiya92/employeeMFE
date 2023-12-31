import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EmployeeDataService } from '../service/employee-data.service';
import { CreateEmployeeComponent } from './create-employee.component';

const routes: Routes = [
  {
    path: '',
    component: CreateEmployeeComponent
  }
];

@NgModule({
  declarations: [
    CreateEmployeeComponent
  ],
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule,
    MatSlideToggleModule,
    MatInputModule,
    HttpClientModule,
    RouterModule,
    MatTableModule,
    RouterModule.forChild(routes),
  ],
  providers: [EmployeeDataService],
  exports: [RouterModule]
})
export class EmployeeModule { }
