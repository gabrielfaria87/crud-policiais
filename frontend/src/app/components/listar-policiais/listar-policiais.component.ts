import { Component, OnInit } from '@angular/core';
import { PoliciaisService } from '../../services/policiais.service';
import { Policial } from '../../models/policial.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-listar-policiais',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './listar-policiais.component.html',
  styleUrls: ['./listar-policiais.component.css'],
})
export class ListarPoliciaisComponent implements OnInit {
  policiais: Policial[] = [];
  filtro: string = '';

  constructor(private policiaisService: PoliciaisService) {}
  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.policiaisService
      .listar()
      .subscribe((data: Policial[]) => (this.policiais = data));
  }

  filtrar() {
    if (this.filtro.length === 11) {
      this.policiaisService
        .filtrarPorCPF(this.filtro)
        .subscribe((data: Policial[]) => (this.policiais = data));
    } else {
      this.policiaisService
        .filtrarPorRG(this.filtro)
        .subscribe((data: Policial[]) => (this.policiais = data));
    }
  }
}
