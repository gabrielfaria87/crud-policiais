import { Component, OnInit } from '@angular/core';
import { PoliciaisService } from '../../services/policiais.service';
import { Policial } from '../../models/policial.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-listar-policiais',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './listar-policiais.component.html',
  styleUrls: ['./listar-policiais.component.css'],
})
export class ListarPoliciaisComponent implements OnInit {
  policiais: Policial[] = [];
  policiaisOriginais: Policial[] = [];
  filtro: string = '';

  constructor(private policiaisService: PoliciaisService) {}
  ngOnInit(): void {
    this.listar();
  }

  listar() {
    this.policiaisService.listarDoJson().subscribe((data: Policial[]) => {
      this.policiais = data;
      this.policiaisOriginais = data;
    });
    this.filtro = '';
  }

  filtrar() {
    if (!this.filtro) {
      this.policiais = this.policiaisOriginais;
      return;
    }
    const filtroLower = this.filtro.toLowerCase();
    this.policiais = this.policiaisOriginais.filter(
      (p) =>
        p.cpf?.toLowerCase().includes(filtroLower) ||
        p.rg_civil?.toLowerCase().includes(filtroLower)
    );
  }
}
