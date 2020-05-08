import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  test = 0;
  constructor() { }
  

  ngOnInit(): void {
  }

  onclick(): void {
    this.test = 2;
  }

  find(): void {
    
  }
}
