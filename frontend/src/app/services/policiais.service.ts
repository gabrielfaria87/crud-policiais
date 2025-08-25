import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Policial } from "../models/policial.model";

@Injectable({
    providedIn: 'root'
})
export class PoliciaisService{
    private apiUrl = 'http://localhost:3000/policiais';

    constructor (private http: HttpClient) {}

    cadastrar(policial: Policial): Observable<Policial> {
        return this.http.post<Policial>(this.apiUrl, policial);
    }

    listar(): Observable<Policial[]> {
        return this.http.get<Policial[]>(this.apiUrl);
    }

    filtrarPorCPF(cpf: string): Observable<Policial[]> {
        return this.http.get<Policial[]>(`${this.apiUrl}?cpf=${cpf}`);
    }

    filtrarPorRG(rg: string): Observable<Policial[]> {
        return this.http.get<Policial[]>(`${this.apiUrl}?rg_civil=${rg}`);
    }
}