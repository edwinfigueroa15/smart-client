import AngularMaterial from '@/app/shared/material';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, RouterOutlet } from '@angular/router';

const Modules = [
    ...AngularMaterial,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    RouterOutlet,
]

export { CommonModule }
export { FormsModule }
export { ReactiveFormsModule }
export { RouterModule }
export { RouterOutlet }

export default Modules;