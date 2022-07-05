import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsComponent } from './components/products/products.component';
import { ComponentsModule } from '../components/components.module';
import { HttpClientModule } from '@angular/common/http';

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
    ComponentsModule,
    HttpClientModule
  ]
})
export class ProductsModule { }
