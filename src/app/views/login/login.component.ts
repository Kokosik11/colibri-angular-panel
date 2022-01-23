import {Component, OnDestroy, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {Subscription} from "rxjs";
import {Router} from "@angular/router";

import { AuthService } from '../../shared/services/auth.service';
import {HttpErrorResponse} from "@angular/common/http";
import {animate, style, transition, trigger} from "@angular/animations";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({ transform: 'translateY(-100px)', opacity: 0 }),
        animate('0.5s')
      ]),
      transition(':leave', [
        animate('0.5s', style({ transform: 'translateY(-100px)', opacity: 0 }))
      ]),
    ])
  ]
})
export class LoginComponent implements OnInit, OnDestroy {
  declare googleAuth: FormGroup;
  declare emailAuth: FormGroup;

  declare emailSub: Subscription;
  declare errorMsg: string;

  showForm: boolean = false;

  constructor (private auth: AuthService,
               private router: Router) { }

  ngOnInit(): void {
    this.showForm = true;
    this.googleAuth = new FormGroup({});
    this.emailAuth = new FormGroup({
      email: new FormControl(null, [ Validators.required, Validators.email ]),
      password: new FormControl(null, [ Validators.required, Validators.minLength(8) ]),
    });
  }

  ngOnDestroy(): void {
    if (this.emailSub) this.emailSub.unsubscribe();
  }

  get emailForm () {
    return this.emailAuth.controls;
  }

  handleInput () {
    console.log(this.emailAuth.value)
  }

  hideForm () {
    this.showForm = false;
  }

  onGoogleSubmit () {

  }

  onEmailSubmit () {
    this.emailAuth.disable();

    this.emailSub = this.auth.signin(this.emailAuth.value).subscribe(
      () => {
        setTimeout(() => {
          this.hideForm()
        }, 0)

        setTimeout(() => {
          this.router.navigate(['/'])
        }, 500)
      },
      (err: HttpErrorResponse) => {
        console.log(err.error)
        this.errorMsg = err.error;
        this.emailAuth.enable();
      }
    )
  }

}
