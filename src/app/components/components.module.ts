import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
//Material modules
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'

//Components
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DataTableComponent } from './data-table/data-table.component'



const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule
]

const components = [
  ToolbarComponent,
  DataTableComponent
]

@NgModule({
  declarations: [
    ...components,
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
