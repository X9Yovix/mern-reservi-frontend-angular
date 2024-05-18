import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../services/user/auth.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    RouterLink,
    RouterLinkActive,
    CommonModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css'
})
export class HeaderComponent implements OnInit {
  isLogged = false

  constructor(private router: Router, private authService: AuthService) { }

  ngOnInit() {
    this.authService.isLoggedIn().subscribe(isLoggedIn => {
      this.isLogged = isLoggedIn
    })
  }

  isActive(route: string): boolean {
    return this.router.url === route
  }

  onLogout() {
    this.authService.logout()
    this.router.navigateByUrl('/login')
  }
}
