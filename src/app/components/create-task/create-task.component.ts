import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TaskService } from '../../services/task.service';

@Component({
  selector: 'app-create-task',
  standalone: true,
  templateUrl: './create-task.component.html',
  styleUrls: ['./create-task.component.css'],
  imports: [ReactiveFormsModule, FormsModule, CommonModule],
})
export class CreateTaskComponent {
  taskForm: FormGroup;
  isSubmitted = false;
  nameError: string = '';
  dateError: string = '';
  minDateTime: string | undefined;

  constructor(private fb: FormBuilder, private taskService: TaskService, private router: Router) {
    this.taskForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      dateTime: ['', Validators.required],
      priority: ['Low', Validators.required],
      description: ['Sample'],
      completed: [false]
    });
    const now = new Date();
    this.minDateTime = now.toISOString().slice(0, 16);
  }

  get formControls() {
    return this.taskForm.controls;
  }
  // checking errors
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
  showDateError(): any {

    const date: any = this.taskForm.get('dateTime');
    if (!date.valid) {
      if (date.errors.required) {
        return "Date is requireds"
      }
    }
  }
  // Creating task
  onSubmit() {
    this.isSubmitted = true;
    if (this.taskForm.invalid) {
      if (this.showNameError()) {
        this.nameError = this.showNameError()
      } else {
        this.nameError = ''
      }
      if (this.showDateError()) {
        this.dateError = this.showDateError()
      }
      return;
    } this.dateError = ''

    // Posting data to JSON server
    this.taskService.createTask(this.taskForm.value).subscribe(
      (response) => {
        alert('Task Created Successfully');
        window.location.reload()
      },
      (error) => {
        alert('something went worng');
      }
    );
  }
}
