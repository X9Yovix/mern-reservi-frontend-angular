import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/user/auth.service';
import { CommonModule } from '@angular/common';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
  form!: FormGroup

  constructor(
    public authService: AuthService,
    private router: Router,
    private formBuilder: FormBuilder,
    private toast: HotToastService
  ) { }

  ngOnInit() {
    this.createForm()
  }

  createForm() {
    this.form = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]]
    })
  }

  get getFormValues() {
    return this.form.controls
  }

  onSubmit() {
    this.authService.login(this.form.value)
      .subscribe({
        complete: () => {
        },
        error: (err) => {
          this.toast.error(`${JSON.parse(err).error}`, { duration: 2000, position: 'bottom-center' })
        },
        next: (res) => {
          this.authService.setLoggedIn(true);
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user))
          this.router.navigateByUrl('/rooms/list')
        }
      })
  }
}
