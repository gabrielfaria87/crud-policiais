import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { PoliciaisService } from '../../services/policiais.service';
import { Router } from '@angular/router';

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
    private policiaisService: PoliciaisService,
    private router: Router
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
      const formValue = { ...this.policialForm.value };
      if (
        formValue.data_nascimento &&
        formValue.data_nascimento.includes('/')
      ) {
        // Converte de DD/MM/YYYY para YYYY-MM-DD
        const [dia, mes, ano] = formValue.data_nascimento.split('/');
        formValue.data_nascimento = `${ano}-${mes}-${dia}`;
      }
      this.policiaisService.cadastrar(formValue).subscribe({
        next: () => {
          alert('Policial cadastrado com sucesso!');
          this.policialForm.reset();
          this.router.navigate(['/listar']);
        },
        error: () => alert('Erro ao cadastrar policial.'),
      });
    }
  }
}
