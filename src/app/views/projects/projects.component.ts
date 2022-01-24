import {Component, OnDestroy, OnInit} from '@angular/core';
import {IProject} from "../../shared/interfaces";
import {ProjectService} from "../../shared/services/project.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-projects',
  templateUrl: './projects.component.html',
  styleUrls: ['./projects.component.scss']
})
export class ProjectsComponent implements OnInit, OnDestroy {
  declare projectSub: Subscription;
  declare projects: [IProject];
  // projects: [IProject] = [{
  //   _id: "blablabla",
  //   title: "Colibri DC Project",
  //   imageUrl: "../../../assets/imgs/project.png"
  // }]

  constructor(private projectsService: ProjectService) { }

  ngOnInit(): void {
    this.projectSub = this.projectsService.getProjects().subscribe(({ projects }) => {
      this.projects = projects;
    });
  }

  ngOnDestroy(): void {
    this.projectSub.unsubscribe();
  }

}
