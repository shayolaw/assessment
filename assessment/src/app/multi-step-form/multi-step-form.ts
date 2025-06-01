import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { StepsModule } from 'primeng/steps';
import { TextareaModule } from 'primeng/textarea';
import { DialogModule } from 'primeng/dialog';
import {ToastModule} from 'primeng/toast';
import { MessageService } from 'primeng/api';
import { RatingModule } from 'primeng/rating';
@Component({
  selector: 'app-multi-step-form',
  imports: [
    ButtonModule,
    CommonModule,
    ReactiveFormsModule,
    InputTextModule,
    TextareaModule,
    ToastModule,
    RatingModule,
    StepsModule,
    DialogModule,
  ],
  providers: [MessageService],
  standalone:true,
  templateUrl: './multi-step-form.html',
  styleUrl: './multi-step-form.css'
})
export class MultiStepForm {
  form: FormGroup;
   stepIndex:number = 0;
   steps = [
    { label: 'Personal Info' },
    { label: 'Feedback' },
    { label: 'Summary' }
  ];


  constructor(private fb: FormBuilder,private http: HttpClient,private messageService: MessageService) {
    this.http = inject(HttpClient);
    this.form = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: [null, Validators.required],
      feedback: ['', Validators.required],
      rating: [null, Validators.required]
    });
  }

  submit() {
    if (this.form.valid) {
      const formData = this.form.value;
      console.log('Form submitted:', this.form.value);
      this.http.post('http://localhost:3000/api/feedback', formData).subscribe({
        next: (response) => {
          console.log('Success:', response);

          this.messageService.add({ severity: 'success', summary: 'Added', detail: 'Thank you for your feedback' });
          this.stepIndex = 0;
          this.form.reset();
        },
        error: (error) => {
          console.error('Error:', error);
          this.messageService.add({ severity: 'error', summary: 'Failed', detail: 'An error occurred' });
        }
      });
    }
    console.log('Form submitted:', this.form.value);
  }
  goBack() {
    if (this.stepIndex > 0) {
      this.stepIndex--;
    }
  }
  next() {
    // Only allow going to the next step if the current step's controls are valid
    const controls = Object.keys(this.form.controls);

    const controlsPerStep: Record<number, string[]> =  {
      0: ['name', 'email', 'age'],
      1: ['feedback', 'rating']
    };

    const currentStepControls = controlsPerStep[this.stepIndex] || [];

    const isValid = currentStepControls.every(key => this.form.get(key)?.valid);

    if (isValid) {
      this.stepIndex++;
    } else {
      currentStepControls.forEach(key => this.form.get(key)?.markAsTouched());
    }
  }

}
