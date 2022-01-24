import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ProjectService} from "../../shared/services/project.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-project-create',
  templateUrl: './project-create.component.html',
  styleUrls: ['./project-create.component.scss', '../project-view/project-view.component.scss']
})
export class ProjectCreateComponent implements OnInit {
  declare projectForm: FormGroup;
  declare imagePreview: string | ArrayBuffer | null;
  declare image: File;

  disabledCreate: boolean = false;

  @ViewChild('input') declare inputRef: ElementRef;

  constructor(private projectService: ProjectService,
              private router: Router) { }

  ngOnInit(): void {
    this.imagePreview = '../../../assets/imgs/choose-img.svg';

    this.projectForm = new FormGroup({
      title: new FormControl(null, [Validators.required]),
      link: new FormControl(null, [Validators.required]),
    })
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

  onSubmit() {
    this.disabledCreate = true;
    this.projectService.create(this.projectForm.controls['title'].value, this.projectForm.controls['link'].value, this.image).subscribe(
      () => {
        this.router.navigate(['content', 'projects'])
        this.disabledCreate = false;
      },
      () => {
        this.disabledCreate = false;
      }
    )
  }
}
