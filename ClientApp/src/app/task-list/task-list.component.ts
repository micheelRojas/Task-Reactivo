import { Component, OnInit } from '@angular/core';
import { TaskService } from '../services/task.service';
import { Task } from '../models/task';
//import { getAllDebugNodes } from '@angular/core/src/debug/debug_node';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks:Task[];
  constructor(private taskservice:TaskService) { }

  ngOnInit() {
    this.getAll();
  }
  
  getAll(){
    this.taskservice.getAll().subscribe(tasks=>this.tasks=tasks);
  }
}
