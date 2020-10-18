import { Component, OnInit } from '@angular/core';
import { Task } from '@app/_models/todo.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  taskList: Task[] = [];
  constructor() { }

  ngOnInit() {
    
  }

}
