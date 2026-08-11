import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { EmployeeModel } from '../model/classes/Employee.model';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { GlobalConstant } from '../globalConstant/Global.constant';

@Service()
export class EmployeeService {

    http = inject(HttpClient);

    constructor() {

    }

    getAllEmpoyee():Observable<EmployeeModel[]> {
        return this.http.get<EmployeeModel[]>(environment.API_URL + GlobalConstant.API_METHOD.GET_ALL_EMPLOYEE)
    }

    getEmpoyeeById(ID: number):Observable<EmployeeModel> {
        return this.http.get<EmployeeModel>(environment.API_URL + GlobalConstant.API_METHOD.GET_EMPLOYEE_BY_ID +ID )
    }
 
    onCreateEmployee(obj: EmployeeModel):Observable<EmployeeModel> {
        return this.http.post<EmployeeModel>(environment.API_URL + GlobalConstant.API_METHOD.CREATE_EMPLOYEE, obj)
    }

}
