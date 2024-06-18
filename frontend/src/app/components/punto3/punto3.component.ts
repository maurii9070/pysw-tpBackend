import { Component } from '@angular/core';
import { TicketServiceService } from '../../services/ticket-service.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-punto3',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './punto3.component.html',
  styleUrl: './punto3.component.css'
})
export class Punto3Component {

  espectadores:any = [];
  tickets:any = [];

  precioTicket = 0;
  categoriaEspectador = '';
  fechaCompra = '';
  espectador = '';

  espectadorFilter = '';
  edicion = false;
  ticketID = '';

  constructor(private ticketService:TicketServiceService) { }

  ngOnInit(): void {
    this.ticketService.getEspectadores().subscribe((data)=>{
      this.espectadores = data;
    });
    this.ticketService.getTickets().subscribe((data) => {
      this.tickets = data;
    });
  }

  buscarEspectador(id:any){
    const espectador = this.espectadores.find((espectador:any) => espectador._id === id)
    return espectador.apellido + ', ' + espectador.nombre;
  }

  filtrarTicketsEspectador(espectadorFilter:string){  
    if(espectadorFilter === ''){
      this.ticketService.getTickets().subscribe((data) => {
        this.tickets = data;
      });
    }else{
      this.ticketService.getTicketsEspectador(espectadorFilter).subscribe((data) => {
        this.tickets = data;
      });
    }
  }

  eliminarTicket(id:any){
    this.ticketService.deleteTicket(id).subscribe((data) => {
      this.ticketService.getTickets().subscribe((data) => {
        this.tickets = data;
      });
    });
  }

  agregarTicket(){

    const ticket = {
      precioTicket: this.precioTicket,
      categoriaEspectador: this.categoriaEspectador,
      fechaCompra: this.fechaCompra,
    }

    // Validar que no haya campos vacíos
    if(Object.values(ticket).includes('')){
      alert('Todos los campos son requeridos');
      return
    }

    // Validar que el precio del ticket no sea negativo
    if(ticket.precioTicket < 0){
      alert('El precio del ticket no puede ser negativo');
      return
    }    

    if(this.edicion){
      // editar el ticket
      Object.assign(ticket, {espectador: this.espectador});
      this.ticketService
        .updateTicket(this.ticketID, ticket)
        .subscribe((data) => {
          this.ticketService.getTickets().subscribe((data) => {
            this.tickets = data;
          });
        });
      this.edicion = false;
      this.ticketID = '';
    } else{
      // agregar el ticket
      this.ticketService
        .addTicket(this.espectador, ticket)
        .subscribe((data) => {
          this.ticketService.getTickets().subscribe((data) => {
            this.tickets = data;
          });
        });
    }

    this.resetForm()

  }

  editarPaciente(id:string){
    this.edicion = true;
    this.ticketID = id;
    const ticket = this.tickets.find((ticket:any) => ticket._id === id);
    this.precioTicket = ticket.precioTicket;
    this.categoriaEspectador = ticket.categoriaEspectador;
    this.fechaCompra = ticket.fechaCompra;
    this.espectador = ticket.espectador;    
  }

  resetForm(){
    this.precioTicket = 0;
    this.categoriaEspectador = '';
    this.fechaCompra = '';
    this.espectador = '';
  }

}
