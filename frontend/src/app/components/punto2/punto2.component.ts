import { Component } from '@angular/core';
import { TransaccionService } from '../../services/transaccion.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-punto2',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './punto2.component.html',
  styleUrl: './punto2.component.css',
})
export class Punto2Component {
  transacciones: any = [];
  divisaFilter: string = '';

  emailCliente: string = '';
  monedaOrigen: string = '';
  cantidadOrigen: number = 0;
  cantidadDestino: number = 0;
  monedaDestino: string = '';

  constructor(private transaccionService: TransaccionService) {}

  ngOnInit(): void {
    this.transaccionService.getTransacciones().subscribe((data: any) => {
      this.transacciones = data;
    });
  }

  formatCurrency = (num: number) => {
    return '$' + Number(num.toFixed(1)).toLocaleString() + ' ';
  };

  getTransaccionesDivisa(divisa: string){
    this.transaccionService.getTransaccionesDivisa(divisa).subscribe((data: any) => {
      this.transacciones = data;
    });
  }

  getTransacciones(){
    this.transaccionService.getTransacciones().subscribe((data: any) => {
      this.transacciones = data;
    });
  }

  agregarTransaccion(){
    const transaccion = {    
      emailCliente: this.emailCliente,
      monedaOrigen: this.monedaOrigen,
      cantidadOrigen: this.cantidadOrigen,
      monedaDestino: this.monedaDestino,
    };

    // Validar que no hayan campos vacios
    if(Object.values(transaccion).includes('')){
      alert('Todos los campos son requeridos');
      return;
    }

    // Validar que la cantidad sea mayor a 0
    if(this.cantidadOrigen <= 0){
      alert('La cantidad debe ser mayor a 0');
      return;
    }

    // Validar que la moneda origen y destino sean distintas
    if(this.monedaOrigen === this.monedaDestino){
      alert('Las monedas origen y destino deben ser distintas');
      return
    }

    // Obtener tasa de cambio
    const tasaCambio = this.getTasaCambio(this.monedaOrigen, this.monedaDestino);
    this.cantidadDestino = this.cantidadOrigen * tasaCambio;

    // Agregar campos faltantes a la transaccion
    Object.assign(transaccion, {cantidadDestino: this.cantidadDestino, tasaConversion: tasaCambio});

    this.transaccionService.setTransaccion(transaccion).subscribe((data: any) => {
      this.transacciones.push(transaccion);
    });

    this.resetForm()
  }

  getTasaCambio(origen: string, destino: string): number{
    if(origen === 'ARS' && destino === 'USD'){
      return 0.00078;
    }
    if(origen === 'ARS' && destino === 'BRL'){
      return 0.006;
    }
    if(origen === 'ARS' && destino === 'EUR'){
      return 0.001;
    }
    if(origen === 'USD' && destino === 'ARS'){
      return 1280;
    }
    if(origen === 'USD' && destino === 'BRL'){
      return 5.5;
    }
    if(origen === 'USD' && destino === 'EUR'){
      return 0.85;
    }
    if(origen === 'BRL' && destino === 'ARS'){
      return 166.46;
    }
    if(origen === 'BRL' && destino === 'USD'){
      return 0.18;
    }
    if(origen === 'BRL' && destino === 'EUR'){
      return 0.17;
    }
    if(origen === 'EUR' && destino === 'ARS'){
      return 968.68;
    }
    if(origen === 'EUR' && destino === 'USD'){
      return 1.08;
    }
    if(origen === 'EUR' && destino === 'BRL'){
      return 5.82;
    }
    return 1;

  }

  resetForm(){
    this.emailCliente = '';
    this.monedaOrigen = '';
    this.cantidadOrigen = 0;
    this.monedaDestino = '';
    this.cantidadDestino = 0;
  }
}
