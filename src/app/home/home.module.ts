import { RouterModule, Routes } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
//mport { CreateEmployeeComponent } from '../create-employee/create-employee.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';


const routes: Routes = [
  //{ path: '', component: CreateEmployeeComponent },
  { path: '', component: HomeComponent },
  // {
  //   path: 'employee-details',
  //   loadChildren: () =>
  //     import('../employee-details/employee-details.module').then(
  //       (m) => m.EmployeeDetailsModule
  //     ),
  // },
  
];

@NgModule({
  declarations: [
    HomeComponent,
   // CreateEmployeeComponent,
   //EmployeeDetailsComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
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
})
export class HomeModule {}
