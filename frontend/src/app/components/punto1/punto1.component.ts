import { Component } from '@angular/core';
import { ProductoServicesService } from '../../services/producto-services.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-punto1',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './punto1.component.html',
  styleUrl: './punto1.component.css',
})
export class Punto1Component {
  productos: any = [];
  verDestacados: boolean = false;
  nombre: string;
  descripcion: string;
  urlImg: string;
  precio: number;
  stock: number;
  destacado: boolean;

  constructor(private productoService: ProductoServicesService) {
    this.nombre = '';
    this.descripcion = '';
    this.urlImg = '';
    this.precio = 0;
    this.stock = 0;
    this.destacado = false;
  }

  ngOnInit() {
    this.productoService.getProductos().subscribe((data: any) => {
      this.productos = data;
      console.log(this.productos);
    });
  }

  toogleDestacados() {
    this.verDestacados = !this.verDestacados;
  }

  productosFiltrados(): any {
    return this.verDestacados
      ? this.productos.filter((p: any) => p.destacado)
      : this.productos;
  }

  agregarProducto() {
    const producto = {
      nombre: this.nombre,
      descripcion: this.descripcion,
      img: this.urlImg,
      precio: this.precio,
      stock: this.stock,
      destacado: this.destacado,
    };

    // Validar que no haya campos vacíos
    if (Object.values(producto).includes('')) {
      alert('Por favor complete todos los campos');
      return;
    }

    // Validar que precio y stock sean positivos
    if (this.precio <= 0 || this.stock <= 0) {
      alert('Por favor ingrese valores positivos para precio y stock');
      return;
    }

    // Si pasa las validaciones, agregamos el productos
    this.productoService.agregarProducto(producto).subscribe((data: any) => {
      this.productos.push(producto);
    });
    this.resetearForm();
  }

  resetearForm() {
    this.nombre = '';
    this.descripcion = '';
    this.urlImg = '';
    this.precio = 0;
    this.stock = 0;
    this.destacado = false;
  }

  formatCurrency = (num: number) => {
    return '$' + Number(num.toFixed(1)).toLocaleString() + ' ';
  };
}
