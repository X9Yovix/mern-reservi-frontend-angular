import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/user/auth.service';
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
    if (localStorage.getItem('token') !== null) {
      this.router.navigateByUrl('/home')
    }
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
    let loadingToastId = this.toast.loading('Loading....')
    this.authService.login(this.form.value)
      .subscribe({
        complete: () => {
        },
        error: (err) => {
          loadingToastId.close()
          this.toast.error(`${JSON.parse(err).error}`)
        },
        next: (res) => {
          loadingToastId.close()
          this.authService.setLoggedIn(true);
          localStorage.setItem("token", res.token);
          localStorage.setItem("user", JSON.stringify(res.user))
          this.toast.success(`${res.message}`, { duration: 2000 })
          this.router.navigateByUrl('/home')
        }
      })
  }
}
