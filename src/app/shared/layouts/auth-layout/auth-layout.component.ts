import { Component, OnInit } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";
import {ActivatedRoute, Router} from "@angular/router";

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  animations: [
    trigger('showInOut', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('1s')
      ]),
      transition(':leave', [
        animate('1s', style({ opacity: 0 }))
      ]),
    ])
  ]
})
export class AuthLayoutComponent implements OnInit {
  constructor(private router: Router,
              private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      console.log(params)
      this.router.navigate(['auth', 'signin'], {
        queryParams: { ...params }
      });
    })
  }
}
