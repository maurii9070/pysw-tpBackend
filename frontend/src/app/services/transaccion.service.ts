import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TransaccionService {

  constructor(private http:HttpClient) { }

  getTransacciones(){
    return this.http.get('http://localhost:4000/api/transacciones');
  }

  getTransaccionesDivisa(divisa: string){
    return this.http.get('http://localhost:4000/api/transacciones/divisa/'+divisa);
  }

  setTransaccion(transaccion: any){
    return this.http.post('http://localhost:4000/api/transacciones', transaccion);
  }
}
