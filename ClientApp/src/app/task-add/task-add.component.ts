import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
import{FormBuilder,FormGroup,Validators} from '@angular/forms';

@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  registerForm: FormGroup;
  submitted= false;
  constructor(private taskService: TaskService,private formBuilder:FormBuilder) { }
  task: Task;
  ngOnInit() {
    this.registerForm = this.formBuilder.group({title:['',[Validators.required,Validators.minLength(3)]], description:['',Validators.required],priority:['']});
    
  }
  
  add(){
    this.task= this.registerForm.value;
    this.taskService.addTask(this.task)
    .subscribe(task => {
      alert('Se agregó una nueva tarea')
    });
  }
  get f(){return this.registerForm.controls;}
  onSubmit(){
    this.submitted=true;
    if(this.registerForm.invalid){
      return;
    }
    this.add();
  }
  onReset(){
    this.submitted=false;
    this.registerForm.reset();
  }
}
