import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateEmployeeComponent } from './create-employee/create-employee.component';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EmployeeDetailsComponent } from './employee-details/employee-details.component';
import { HomeModule } from './home/home.module';
import { EmployeeDetailsModule } from './employee-details/employee-details.module';

const routes: Routes = [
  { path: '', component: AppComponent },
  { path: 'employee', loadChildren: () =>
      import('./create-employee/employee.module').then((module) => module.EmployeeModule),
  },
  { path: 'employee-details', loadChildren: () =>
      import('./employee-details/employee-details.module').then((module) => module.EmployeeDetailsModule),
  },
 // { path: 'employee-details', component: EmployeeDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes), HomeModule, EmployeeDetailsModule],
  exports: [RouterModule]
})
export class AppRoutingModule { }
