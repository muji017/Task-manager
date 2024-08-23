import { Component } from '@angular/core';
import { Task } from '../../models/task.model';
import { TaskService } from '../../services/task.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CreateTaskComponent } from '../create-task/create-task.component';
import { MatDialogModule,MatDialog } from '@angular/material/dialog';
import { EditTaskComponent } from '../edit-task/edit-task.component';


@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [FormsModule,CommonModule,MatDialogModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {
  tasks: Task[] = [];
  searchTerm: string = '';
  filterPriority: string = '';
  filterStatus: string = '';
  filterDate: string = '';

  constructor(private taskService: TaskService, private dialog:MatDialog) {}

  ngOnInit(): void {
    this.getTasks();
  }

  getTasks(): void {
    this.taskService.getTasks().subscribe((tasks) => (this.tasks = tasks));
  }
  //Matdialog to create task
  createTask(){
    this.dialog.open(CreateTaskComponent, {
      enterAnimationDuration: 1200,
      exitAnimationDuration: 1200,
    })
  }
  // Filter and searching 
  filteredTasks(): Task[] {
    return this.tasks.filter(task =>
      (this.searchTerm === '' || task.name.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.searchTerm === '' || task.description?.toLowerCase().includes(this.searchTerm.toLowerCase())) &&
      (this.filterPriority === '' || task.priority === this.filterPriority) &&
      (this.filterStatus === '' || task.completed.toString() === this.filterStatus) &&
      (this.filterDate === '' || new Date(task.dateTime).toDateString() === new Date(this.filterDate).toDateString())
    );
  }
// marking completed
  markCompleted(task: Task): void {
    task.completed = !task.completed;
    this.taskService.updateTask(task).subscribe();
  }

  deleteTask(id: number | any): void {
    // Confirmation alert before deleting
    const isConfirmed = window.confirm('Are you sure you want to delete this task?');
  
    if (isConfirmed) {
      // If user confirms, proceed with deletion
      this.taskService.deleteTask(id).subscribe(() => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        alert('Task deleted successfully.');
      });
    }
  }

  // edit task Matdialog
  editTask(task: Task): void {
    const data={
      task:task
    }
    this.dialog.open(EditTaskComponent, {
      enterAnimationDuration: 1200,
      exitAnimationDuration: 1200,
      data:data
    })
  }

  // gettin total number of tasks
  get totalTasks(): number {
    return this.tasks.length;
  }
 
  // filtering completed tasks
  get completedTasks(): number {
    return this.tasks.filter(task => task.completed).length;
  }

  trackById(index: number, task: Task): number|any {
    return task.id;
  }

  // getting first letter of priority
  getPriorityLetter(priority: string): string {
    switch (priority) {
      case 'Low':
        return 'L';
      case 'Medium':
        return 'M';
      case 'High':
        return 'H';
      default:
        return '';
    }
  }
  
}
