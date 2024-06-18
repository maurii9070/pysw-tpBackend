import { Routes } from '@angular/router';
import { Punto1Component } from './components/punto1/punto1.component';
import { Punto2Component } from './components/punto2/punto2.component';
import { Punto3Component } from './components/punto3/punto3.component';

export const routes: Routes = [
  { path: '', component: Punto1Component },
  { path: 'punto-2', component: Punto2Component },
  { path: 'punto-3', component: Punto3Component}
];
