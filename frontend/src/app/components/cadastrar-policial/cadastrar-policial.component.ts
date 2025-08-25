import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PoliciaisService } from '../../services/policiais.service';

@Component({
  selector: 'app-cadastrar-policial',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './cadastrar-policial.component.html',
  styleUrls: ['./cadastrar-policial.component.css'],
})
export class CadastrarPolicialComponent {
  policialForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private policiaisService: PoliciaisService
  ) {
    this.policialForm = this.fb.group({
      rg_civil: ['', Validators.required],
      rg_militar: ['', Validators.required],
      cpf: ['', [Validators.required, Validators.pattern(/^\d{11}$/)]],
      data_nascimento: ['', Validators.required],
      matricula: ['', Validators.required],
    });
  }

  cadastrar() {
    if (this.policialForm.valid) {
      this.policiaisService.cadastrar(this.policialForm.value).subscribe({
        next: () => {
          alert('Policial cadastrado com sucesso!');
          this.policialForm.reset();
        },
        error: () => alert('Erro ao cadastrar policial.'),
      });
    }
  }
}
