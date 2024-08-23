import { Component, Inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TaskService } from '../../services/task.service';
import { Router } from '@angular/router';
import { MatDialogModule, MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Task } from '../../models/task.model';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-task',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule, MatDialogModule,CommonModule],
  templateUrl: './edit-task.component.html',
  styleUrl: './edit-task.component.css'
})
export class EditTaskComponent {
  taskForm: FormGroup;
  isSubmitted = false;
  nameError: string = '';
  dateError: string = '';
  minDateTime: string | undefined;
  task!: Task

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router, private dialoge: MatDialog,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.task = data.task
    this.taskForm = this.fb.group({
      id: [this.task.id, Validators.required],
      name: [this.task.name, [Validators.required, Validators.minLength(3)]],
      dateTime: [this.task.dateTime, Validators.required],
      priority: [this.task.priority, Validators.required],
      description: [this.task.description],
      completed: [this.task.completed]
    });

  }
  ngOnInit() {
    console.log(this.data)
  }
  showNameError(): any {

    const name: any = this.taskForm.get('name');
    if (!name.valid) {
      if (name.errors.required) {
        return "Name is requireds"
      }
      if (name.errors.minlength) {
        return 'Name should be of minimum 3 characters';
      }
    }
  }
  onSubmit() {
    this.isSubmitted = true;
    if (this.taskForm.invalid) {
      if (this.showNameError()) {
        this.nameError = this.showNameError()
      } 
      return
    }this.nameError = ''
    this.taskService.updateTask(this.taskForm.value).subscribe(
      (response) => {
        alert('Task updated Successfully');
        window.location.reload()
      },
      (error) => {
        alert('something went worng');
      }
    );
  }
}
