import { Component, inject } from '@angular/core';
import Modules from '@/app/shared/modules';
import { CustomInputComponent } from '@/app/shared/components';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '@/app/core/services/auth.service';
import { IUser } from '@/app/core/interfaces/tables.interfaces';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss'],
  standalone: true,
  imports: [...Modules, CustomInputComponent],
})
export default class SignUpComponent {
  form = new FormGroup({
    name: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required]),
  })

  errors = {
    name: {
      required: { message: 'El nombre es obligatorio' },
    },
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
    this.authService.signUp(this.form.value as IUser);
  }
}
