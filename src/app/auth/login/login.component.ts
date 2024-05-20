import { Component, inject } from '@angular/core';
import Modules from '@/app/shared/modules';
import { CustomInputComponent } from '@/app/shared/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@/app/core/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  imports: [...Modules, CustomInputComponent],
})
export default class LoginComponent {
  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  errors = {
    email: {
      required: { message: 'El correo es obligatorio' },
      email: { message: 'El correo es incorreto' },
    },
    password: {
      required: { message: 'La contraseña es obligatoria' },
    }
  }

  private authService = inject(AuthService);
  constructor() { }

  onSubmit() {
    this.authService.login(this.form.value);
  }
}
