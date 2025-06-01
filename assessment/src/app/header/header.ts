import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-header',
  imports: [[CommonModule, RouterModule, ButtonModule]],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

}
