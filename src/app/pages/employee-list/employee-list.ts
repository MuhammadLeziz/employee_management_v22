import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { RouterLink } from "@angular/router";
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../core/model/classes/Employee.model';
import { EmployeeService } from '../../core/services/employee-service';

@Component({
  selector: 'app-employee-list',
  imports: [RouterLink,AsyncPipe],
  templateUrl: './employee-list.html',
  styleUrl: './employee-list.css',
})
export class EmployeeList {

  employeeList$ : Observable<EmployeeModel[]> = new Observable<EmployeeModel[]>;
  empSrv = inject(EmployeeService);

  constructor() {
    this.employeeList$ = this.empSrv.getAllEmpoyee();
  }

}
