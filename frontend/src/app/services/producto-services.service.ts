import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ProductoServicesService {
  constructor(private http: HttpClient) {}

  getProductos() {
    return this.http.get('http://localhost:4000/api/productos');
  }

  agregarProducto(producto: any) {
    return this.http.post('http://localhost:4000/api/productos', producto);
  }
}
