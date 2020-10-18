import { Component, OnInit } from '@angular/core';
import { Task } from '@app/_models/todo.model';
import { TODOListService } from '@app/_services/todolist.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  taskList: Task[] = [];
  constructor(private todolistService:TODOListService) { }

  ngOnInit() {
    this.todolistService.findTaksForUser().subscribe(data =>{
      this.taskList = data;
    })
  }

}
