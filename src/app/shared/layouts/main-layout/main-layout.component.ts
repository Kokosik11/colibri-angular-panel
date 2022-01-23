import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-layout',
  templateUrl: './main-layout.component.html',
  styleUrls: ['./main-layout.component.scss']
})
export class MainLayoutComponent implements OnInit {
  declare isMenuOpened: boolean;

  constructor() { }

  ngOnInit(): void {
    this.isMenuOpened = true;
  }

  onBurgerBtnClick() {
    this.isMenuOpened = !this.isMenuOpened;
  }
}
