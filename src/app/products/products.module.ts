import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';

const productsModule = [
  ProductsComponent,
]

@NgModule({
  declarations: [
    ...productsModule
  ],
  exports: [
    ...productsModule
  ],
  imports: [
    CommonModule
  ]
})
export class ProductsModule { }
