import { Component } from '@angular/core';
import {animate, style, transition, trigger} from "@angular/animations";

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
export class AuthLayoutComponent {
}
