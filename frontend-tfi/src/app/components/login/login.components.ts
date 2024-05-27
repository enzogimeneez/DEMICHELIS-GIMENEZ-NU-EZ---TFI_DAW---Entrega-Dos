import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { ButtonModule } from 'primeng/button';
import {ToastModule} from 'primeng/toast'


@Component({
  standalone: true,
  templateUrl:'./login.components.html',
  styleUrl: './login.components.scss',
  selector: 'app-login',
  imports: [ReactiveFormsModule, InputTextModule, PasswordModule, ButtonModule, ToastModule],
})
export class LoginComponent {
  form = new FormGroup({
    nombreUsuario: new FormControl('', [Validators.required]),
    clave: new FormControl('', [Validators.required]),
  });
  login(){
    console.log("=D")
  }
}
