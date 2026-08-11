import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Observable } from 'rxjs';
import { IApiResponseModel, IDashboard } from '../model/Interfaces/User.Model';
import { GlobalConstant } from '../globalConstant/Global.constant';

@Service()
export class MasterSrv {

    http = inject(HttpClient)


    getAllParentDept(): Observable<IApiResponseModel> {
        return this.http.get<IApiResponseModel>(environment.API_URL + "GetParentDepartment")
    }

    getAllChildtDeptByParentId(id: number): Observable<IApiResponseModel> {
        return this.http.get<IApiResponseModel>(environment.API_URL + "GetChildDepartmentByParentId?deptId=" +id)
    }

    getDashboard(): Observable<IDashboard> {
        return this.http.get<IDashboard>(environment.API_URL + GlobalConstant.API_METHOD.GET_DASHBOARD)
    }
}
