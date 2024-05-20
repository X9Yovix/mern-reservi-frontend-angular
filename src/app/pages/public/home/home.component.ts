import { Component, OnInit } from '@angular/core';
import { FooterComponent } from '../../../components/footer/footer/footer.component';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    FooterComponent,
    RouterLink
  ],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  isAuth = false
  ngOnInit(): void {
    if (localStorage.getItem('token')) {
      this.isAuth = true
    }
  }
}
