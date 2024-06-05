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
import { MessageService } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { RolesEnum } from '../../enums/roles.enum';


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

  constructor(private messageService: MessageService, private router: Router){

  }
  ngOnInit(){
    
  }

  login(){
    if (!this.form.valid){
      this.form.markAllAsTouched();
      this.messageService.add({
        severity:'error',
        summary:'Se deben completar todos los campos.',
      });
      return;
    }
    const formValue = this.form.getRawValue();
    this.loginService
    .login(formValue.nombreUsuario!, formValue.clave!)
    .suscribe({
      next: (res) => {
        this.loginService.setSession(res.token);
        if (this.loginService.hasRole(RolesEnum.ADMINISTRADOR)){
          this.router.navigateByUrl('')
        }else{
          this.router.navigateByUrl('')
        }
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error de autenticación. Verifique el usuario y la clave'
        })
      }
    })
  }
}
