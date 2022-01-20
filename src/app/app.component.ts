import {Component, OnInit} from '@angular/core';
import {AuthService} from "./shared/services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'colibri-angular-panel';

  constructor(private auth: AuthService,
              private router: Router) {
  }

  ngOnInit() {
    const potentialToken = localStorage.getItem('auth-token');
    if (potentialToken) {
      this.auth.setToken(potentialToken);
      this.auth.verifyToken().subscribe(
        null,
        () => { this.router.navigate(['auth', 'signin'] )}
      )

    }
  }
}
