import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrls: ['./project.component.scss']
})
export class ProjectComponent implements OnInit {
  title: string = "Colibri DC Project";

  constructor() { }

  ngOnInit(): void {
  }

}