import { Component, inject, OnInit, signal, WritableSignal } from '@angular/core';
import { EmployeeModel } from '../../core/model/classes/Employee.model';
import { FormsModule } from '@angular/forms';
import { EmployeeService } from '../../core/services/employee-service';
import { MasterSrv } from '../../core/services/master-srv';
import { IApiResponseModel, IChildDept, IParentDept } from '../../core/model/Interfaces/User.Model';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-employee-form',
  imports: [FormsModule],
  templateUrl: './employee-form.html',
  styleUrl: './employee-form.css',
})
export class EmployeeForm implements OnInit {

  employeeObj: EmployeeModel = new EmployeeModel();

  empSrv  = inject(EmployeeService);
  masterSrv  = inject(MasterSrv);
  activatedRoute  = inject(ActivatedRoute);

  parentDeptList: WritableSignal<IParentDept[]> = signal([]);
  childDeptList: WritableSignal<IChildDept[]> = signal([]);

  currentEditEmpid: number = 0;

  ngOnInit(): void {
    this.activatedRoute.params.subscribe({
      next:(res:any)=>{
        debugger;
        this.currentEditEmpid =  res.id;
        if(this.currentEditEmpid != 0) {
          this.getEmmDetails();
        }
      }
    })
    this.getParentDept();
  }

  getParentDept() {
    this.masterSrv.getAllParentDept().subscribe({
      next:(res:IApiResponseModel)=>{
        this.parentDeptList.set(res.data)
      }
    })
  }

  getEmmDetails() {
    this.empSrv.getEmpoyeeById(this.currentEditEmpid).subscribe({
      next:(res:EmployeeModel)=>{
        this.employeeObj = res;
      }
    })
  }

  onChangeParent(event: any) {
    const id=  event.target.value;
    
    this.masterSrv.getAllChildtDeptByParentId(id).subscribe({
      next:(res:IApiResponseModel)=>{
        this.childDeptList.set(res.data);
      }
    })
  }


  onSaveEmp() {
    this.empSrv.onCreateEmployee(this.employeeObj).subscribe({
      next:(res:EmployeeModel)=>{
        alert("Employee Created Success")
      },
      error:(err:any)=>{

      }
    })
  }

}
