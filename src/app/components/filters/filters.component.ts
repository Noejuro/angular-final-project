import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime, map } from 'rxjs';
import IProductFilters from 'src/app/interfaces/ProductFilters';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  @Output() onFiltersChange: EventEmitter<IProductFilters> = new EventEmitter();;

  formGroup = new FormGroup({
    'name': new FormControl(''),
    'min': new FormControl('', Validators.pattern("^[0-9]*$")),
    'max': new FormControl('', Validators.pattern("^[0-9]*$")),
    'available': new FormControl(true),
    'notAvailable': new FormControl(true)
  })

  constructor() { }

  ngOnInit(): void {
    this.formGroup.valueChanges
      .pipe( 
        debounceTime(600)
      )
      .subscribe( (formData) => {
        Object.keys(formData).forEach((key) => formData[key as keyof IProductFilters] === "" && delete formData[key as keyof IProductFilters])
        if(this.formGroup.valid) {
          this.onFiltersChange.emit(formData)
        }
      })
  }

}
