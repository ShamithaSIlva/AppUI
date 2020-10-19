import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Task } from '@app/_models/todo.model';
import { FormGroup, Validators,FormBuilder,  } from '@angular/forms';
import { TODOListService } from '@app/_services/todolist.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-todotask',
  templateUrl: './todotask.component.html',
  styleUrls: ['./todotask.component.css'],
  providers: [DatePipe]
})
export class TodotaskComponent implements OnInit {
  @Input() task:Task;
  @Input() isNew:boolean;
  @Output() taskAdded: EventEmitter<Task> = new EventEmitter<Task>();
  @Output() deleteTaskEvent: EventEmitter<any> = new EventEmitter<any>();
  taskForm:FormGroup;

  constructor(private todoListService:TODOListService,private fb: FormBuilder,private datePipe:DatePipe) { }

  ngOnInit() {
    if(this.task == null)
    {
       this.task = {lastUpdated:this.datePipe.transform(new Date(),  'yyyy-MM-dd')};
    }
    this.createForm();
  }

  onSubmit() {
    if (this.taskForm.valid) {
      this.taskForm.value['lastUpdated'] =  this.datePipe.transform(new Date(),  'yyyy-MM-dd');
      this.taskForm.value['id'] =  this.task.id;
      this.taskForm.value['taskName'] =  this.task.taskName;
      this.todoListService.updateTask(this.taskForm.value).subscribe(data=>{
        this.task = data;
      });
    }
  }

  createForm() {
    this.taskForm = this.fb.group({
      checked: [this.task.checked],
      taskName: [this.task.taskName],
      description: [this.task.description]
    });
  }

  deleteTask(id:any){
    this.todoListService.deleteTask(id).subscribe(data=>{
      this.deleteTaskEvent.emit(id);
    },err=>{
      console.log('DELETE ERROR');
    });
  }

  saveTask(){
    if (this.taskForm.valid) {
      this.taskForm.value['lastUpdated'] =  this.datePipe.transform(new Date(),  'yyyy-MM-dd');
      this.todoListService.saveTask(this.taskForm.value).subscribe(data=>{
        this.taskAdded.emit(data);
        this.taskForm.reset();
      });
    }
  }

}
