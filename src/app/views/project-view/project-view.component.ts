import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {IProject} from "../../shared/interfaces";
import {ProjectService} from "../../shared/services/project.service";
import {ActivatedRoute, Router} from "@angular/router";
import {Subscription} from "rxjs";
import {FormControl, FormGroup, Validators} from "@angular/forms";


@Component({
  selector: 'app-project-view',
  templateUrl: './project-view.component.html',
  styleUrls: ['./project-view.component.scss']
})
export class ProjectViewComponent implements OnInit, OnDestroy {
  declare projectSub: Subscription;
  declare project: IProject;
  declare projectForm: FormGroup;
  declare image: File;
  declare imagePreview: string | ArrayBuffer | null;

  disabledSave: boolean = false;

  projectId: string = this.activeRoute.snapshot.params['id'];

  @ViewChild('input') declare inputRef: ElementRef;

  constructor(private projectService: ProjectService,
              private activeRoute: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    this.projectForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      link: new FormControl(null, [Validators.required]),
      image: new FormControl(null, [Validators.required]),
    })

    this.projectSub = this.projectService.getProjectById(this.projectId).subscribe((project) => {
      this.project = project;
      this.projectForm.controls['title'].setValue(this.project.title);
      this.projectForm.controls['link'].setValue(this.project.link);
      this.imagePreview = this.project.imageURL;
    });

  }

  ngOnDestroy() {
    this.projectSub.unsubscribe();
  }

  triggerInput() {
    this.inputRef.nativeElement.click();
  }

  onFileUpload(event: any) {
    const file = event.target.files[0];
    this.image = file;

    const reader = new FileReader();

    reader.onload = () => {
      this.imagePreview = reader.result;
    }

    reader.readAsDataURL(file);
  }

  onSubmit(): void {
    this.disabledSave = true;

    this.projectService.updateProjectById(this.projectId, this.projectForm.controls['title'].value, this.projectForm.controls['link'].value, this.image)
      .subscribe(() => {
        this.router.navigate(['content', 'projects'], {
          queryParams: {
            saved: true
          }
        })

        this.disabledSave = false;
      },
        () => {
        this.disabledSave = false;
      });
  }

  removeProject(): void {
    this.projectService.remove(this.projectId).subscribe(
      () => {
        this.router.navigate(['content', 'projects'])
      },
      (e) => {
        console.log(e);
      }
    );
  }
}
