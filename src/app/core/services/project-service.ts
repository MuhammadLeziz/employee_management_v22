import { HttpClient } from '@angular/common/http';
import { inject, Service } from '@angular/core';
import { environment } from '../../../environments/environment';
import { GlobalConstant } from '../globalConstant/Global.constant';
import { Observable } from 'rxjs';
import { IProject, NewProjectModel } from '../model/Interfaces/User.Model';

@Service()
export class ProjectService {

    http = inject(HttpClient);

    getAllProjects() :Observable<IProject[]> {
        return this.http.get<IProject[]>(environment.API_URL + GlobalConstant.API_METHOD.GET_ALL_PROJECTS)
    }

    createProject(obj: NewProjectModel) : Observable<NewProjectModel>{
        return this.http.post<NewProjectModel>(environment.API_URL + GlobalConstant.API_METHOD.CRRATE_NEW_PROJECT,obj)
    }

    getAllProjectEmployee() {
        return this.http.get(environment.API_URL + GlobalConstant.API_METHOD.GET_ALL_PROJECT_EMPLOYEE)
    }

    assignEmp(obj: any) : Observable<any>{
        return this.http.post<any>(environment.API_URL + 'CreateProjectEmployee',obj)
    }
 
}
