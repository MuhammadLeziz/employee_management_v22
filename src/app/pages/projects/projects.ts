import { Component, ElementRef, inject, OnInit, signal, ViewChild, viewChild, WritableSignal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProjectService } from '../../core/services/project-service';
import { IProject, NewProjectModel } from '../../core/model/Interfaces/User.Model';
import { AsyncPipe, DatePipe, NgClass } from '@angular/common';
import { EmployeeService } from '../../core/services/employee-service';
import { Observable } from 'rxjs';
import { EmployeeModel } from '../../core/model/classes/Employee.model';

@Component({
  selector: 'app-projects',
  imports: [ReactiveFormsModule,FormsModule, NgClass,DatePipe,AsyncPipe],
  templateUrl: './projects.html',
  styleUrl: './projects.css',
})
export class Projects implements OnInit {

  projectForm!: FormGroup;
  projectSrv = inject(ProjectService);
  empSr =  inject(EmployeeService);
  projectList = signal<IProject[]>([]);
  projectEmployeeList = signal<any[]>([]);

  currentSelectedProjectEmp: WritableSignal<any>   = signal<any[]>([]);
  isFormVisiable: boolean = false;
  empList$ : Observable<EmployeeModel[]> = new Observable<EmployeeModel[]>();
  @ViewChild('empModal') modalForm!: ElementRef;
  currentProjectId: number = 0;

  assignEmpObj: any = {
  "empProjectId": 0,
  "projectId": 0,
  "empId": 0,
  "assignedDate": "",
  "role": "",
  "isActive": false
}

  constructor(){
    this.initializeFormn();
    this.empList$ = this.empSr.getAllEmpoyee();
  }


  ngOnInit(): void {
    this.loadProject();
    this.loadProjectEmployee();
  }

  showFormPanel() {
    this.isFormVisiable = true;
  }

  openEmpModal(projcetId: number) {
    this.currentProjectId =  projcetId;
    this.assignEmpObj.projectId = projcetId;
    this.currentSelectedProjectEmp.set(this.projectEmployeeList().filter(m=>m.projectId == projcetId))
    if(this.modalForm) {
      this.modalForm.nativeElement.style.display = 'block'
    }
  }

  assignEmp() {
    this.projectSrv.assignEmp(this.assignEmpObj).subscribe({
      next:(res:any)=>{
        alert("EMployee Assigned to Project");
        this.loadProjectEmployee();
      }
    })
  }

   closeEmpModal() {
    if(this.modalForm) {
      this.modalForm.nativeElement.style.display = 'none'
    }
  }

  loadProject() {
    this.projectSrv.getAllProjects().subscribe({
      next:(res:IProject[])=>{
        this.projectList.set(res)
      }
    })
  }

   loadProjectEmployee() {
    this.projectSrv.getAllProjectEmployee().subscribe({
      next:(res:any)=>{
        this.projectEmployeeList.set(res);
        if(this.currentProjectId != 0) {
           this.currentSelectedProjectEmp.set(this.projectEmployeeList().filter(m=>m.projectId == this.currentProjectId))
        } 
      }
    })
  }
  initializeFormn() {
    this.projectForm =  new FormGroup({ 
      projectId: new FormControl(0),
      projectName: new FormControl(""),
      clientName: new FormControl(""),
      startDate: new FormControl(""),
      leadByEmpId: new FormControl(""),
      contactPerson: new FormControl(""),
      contactNo: new FormControl(""),
      emailId: new FormControl(""),
    })
  }

  saveProject() {
    const formValue : NewProjectModel =  this.projectForm.value;
    this.projectSrv.createProject(formValue).subscribe({
      next:(response: NewProjectModel)=>{
        alert("Projectc Created Success");
        this.loadProject();
      }
    })
  }
}
