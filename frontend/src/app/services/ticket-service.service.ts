import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TicketServiceService {

  constructor(private http:HttpClient) { }

  getEspectadores(){
    return this.http.get('http://localhost:4000/api/espectador');
  }

  getTickets(){
    return this.http.get('http://localhost:4000/api/ticket');
  }

  getTicketsEspectador(tipo:any){
    return this.http.get('http://localhost:4000/api/ticket/categoria-espectador/' + tipo);
  }

  deleteTicket(id:any){
    return this.http.delete('http://localhost:4000/api/ticket/' + id);
  }

  addTicket(espectador:string, ticket:any){
    return this.http.post('http://localhost:4000/api/ticket/espectador/'+espectador, ticket);
  }

  updateTicket(id:any, ticket:any){
    return this.http.put('http://localhost:4000/api/ticket/' + id, ticket);
  }
}
