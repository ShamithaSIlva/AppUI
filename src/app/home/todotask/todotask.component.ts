import { Component, OnInit, Input } from '@angular/core';
import { Task } from '@app/_models/todo.model';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-todotask',
  templateUrl: './todotask.component.html',
  styleUrls: ['./todotask.component.css']
})
export class TodotaskComponent implements OnInit {
  @Input() task:Task;
  taskForm:FormGroup;

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    if (this.taskForm.valid) {
      
    }
  }

}
