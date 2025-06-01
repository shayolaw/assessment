import { Component, inject, signal } from '@angular/core';
import { TableModule } from 'primeng/table';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { TextareaModule } from 'primeng/textarea';
import { ToastModule } from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-dashboard',
  imports: [CommonModule, TableModule, ButtonModule,DialogModule,InputTextModule, RatingModule, TextareaModule,ReactiveFormsModule,ToastModule],
  standalone:true,
  providers: [MessageService],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
  private http = inject(HttpClient)
  feedbacks = signal<any[]>([]);
  selectedFeedback: any = null;
  visible = false;
  editForm: FormGroup;

constructor(private fb: FormBuilder,private messageService: MessageService) {
  this.loadFeedbacks()
  this.editForm = this.fb.group({
    _id: [''],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    age: [null, Validators.required],
    feedback: ['', Validators.required],
    rating: [0, Validators.required]
  });
}

showDialog(feedback: any) {
  this.editForm.patchValue(feedback);
  this.visible = true;
}



  loadFeedbacks() {
    this.http.get<any[]>('http://localhost:3000/api/feedback').subscribe(data => {
      this.feedbacks.set(data);
    });
  }

  deleteFeedback(id: string) {
    this.http.delete(`http://localhost:3000/api/feedback/${id}`).subscribe(() => {
      const updated = this.feedbacks().filter((f: any) => f._id !== id);
      this.feedbacks.set(updated);
      this.messageService.add({ severity: 'success', summary: 'Deleted', detail: 'Feedback deleted successfully' });
    });
  }
  editFeedback(feedback: any) {
    this.selectedFeedback = { ...feedback };
  }
  submitEdit() {
    const updatedData = {
      ...this.selectedFeedback,  // Keep _id and any non-editable fields
      ...this.editForm.value     // Override with new values from the form
    };
    if(this.editForm.valid){
    this.http.put(`http://localhost:3000/api/feedback/${updatedData._id}`, updatedData).subscribe({
      next: (updated: any) => {
        const updatedList = this.feedbacks().map(f => (f._id === updatedData._id ? updated : f));
        this.feedbacks.set(updatedList);
        this.selectedFeedback = null;
        this.visible = false;
        this.messageService.add({ severity: 'success', summary: 'Edit', detail: 'Feedback Edited successfully' });
      },
      error: (err) => {
        console.error('Failed to update feedback:', err);
        this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'An error occurred' });
      }
    });
  }
}
}
