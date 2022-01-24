import {Injectable} from "@angular/core";
import {HttpClient} from "@angular/common/http";
import {IProject} from "../interfaces";
import {Observable} from "rxjs";

interface IHTTPProjects {
  projects: [IProject];
}

@Injectable({
  providedIn: 'root',
})
export class ProjectService {

  constructor(private http: HttpClient) {
  }

  getProjects(): Observable<IHTTPProjects> {
    return this.http.get<IHTTPProjects>('/api/project')
  }

  getProjectById(id: string): Observable<IProject> {
    return this.http.get<IProject>(`/api/project/${id}`);
  }

  updateProjectById(id: string, title: string, link: string, image?: File): Observable<IProject> {
    const fd = new FormData();

    if (image) fd.append('project-img', image, image.name);
    fd.append('title', title);
    fd.append('link', link);

    return this.http.patch<IProject>(`/api/project/${id}`, fd);
  }

  create(title: string, link: string, image: File): Observable<IProject> {
    const fd = new FormData();

    fd.append('title', title);
    fd.append('link', link);
    fd.append('project-img', image, image.name);

    return this.http.post<IProject>('/api/project/create', fd);
  }

  remove(id: string): Observable<IProject> {
    return this.http.delete<IProject>('/api/project/' + id);
  }
}
