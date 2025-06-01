import { Routes } from '@angular/router';
import { MultiStepForm } from './multi-step-form/multi-step-form';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
    {
        path: 'form',
        component: MultiStepForm
    },
    {
        path: 'dashboard',
        component: Dashboard
    }
];
