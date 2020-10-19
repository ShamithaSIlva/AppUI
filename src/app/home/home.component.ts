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

  newTaskAdded(task:Task){
    this.taskList.push(task);
  }

  deletedTask(id:any)
  {
    for(var i = 0; i < this.taskList.length; i++) {
      if(this.taskList[i].id == id) {
         this.taskList.splice(i, 1);
          break;
      }
    }
  }
}
