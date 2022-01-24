import {Component, Input, OnInit} from '@angular/core';
import {IProject} from "../../shared/interfaces";

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  @Input()
  project!: IProject;
  // title: string = "Colibri DC Project";
  constructor() {
  }

  ngOnInit(): void {
  }

}
