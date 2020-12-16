import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {
  menu: string;
  constructor() { }

  ngOnInit() {
    this.menu = "1"; 
  }
  
  GoToFunction(option:string){
    this.menu = option;
  }
}
