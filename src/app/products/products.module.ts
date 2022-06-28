import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ComponentsModule } from '../components/components.module';

const components = [
  ProductsComponent,
]

@NgModule({
  declarations: [
    ...components
  ],
  exports: [
    ...components
  ],
  imports: [
    CommonModule,
    ComponentsModule
  ]
})
export class ProductsModule { }
