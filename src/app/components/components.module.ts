import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

//Material modules
import { MatButtonModule } from '@angular/material/button'
import { MatToolbarModule } from '@angular/material/toolbar'
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table'
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


//Components
import { ToolbarComponent } from './toolbar/toolbar.component';
import { DataTableComponent } from './data-table/data-table.component';
import { FiltersComponent } from './filters/filters.component';



const materialModules = [
  MatButtonModule,
  MatToolbarModule,
  MatIconModule,
  MatTableModule,
  MatInputModule,
  MatSlideToggleModule,
  MatPaginatorModule,
  MatProgressSpinnerModule
]

const components = [
  ToolbarComponent,
  DataTableComponent,
  FiltersComponent
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
    ReactiveFormsModule,
    ...materialModules
  ]
})
export class ComponentsModule { }
