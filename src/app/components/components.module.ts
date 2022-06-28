import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToolbarComponent } from './toolbar/toolbar.component';

//Material modules
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon'

const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule
]

const components = [
  ToolbarComponent
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
    ...materialModules
  ]
})
export class ComponentsModule { }
