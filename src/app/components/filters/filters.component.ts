import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { debounceTime } from 'rxjs';

import IProductFilters from 'src/app/interfaces/ProductFilters';
import { IFiltersParams } from 'src/app/interfaces/Params';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit, OnChanges {
  @Input() params: IFiltersParams = {};
  @Output() onFiltersChange: EventEmitter<IProductFilters> = new EventEmitter();

  formGroup = new FormGroup({
    'productName_like': new FormControl(''),
    'price_gte': new FormControl('', Validators.pattern("^[0-9]*$")),
    'price_lte': new FormControl('', Validators.pattern("^[0-9]*$")),
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
        if(this.formGroup.valid) {
          this.onFiltersChange.emit(formData)
        }
      })

  }

  ngOnChanges(changes: SimpleChanges): void {
    for(let param in changes['params'].currentValue) {
      if(param !== 'isAvailable') {
        if(this.formGroup.get(param)?.value !== changes['params'].currentValue[param]) {
          this.formGroup.patchValue({ [param]: changes['params'].currentValue[param] });
        }
      }
      else {
        const isAvailable = (changes['params'].currentValue[param] === true || changes['params'].currentValue[param] === 'true') ;

        if(this.formGroup.get('available')?.value !== isAvailable || this.formGroup.get('notAvailable')?.value === isAvailable) {
          this.formGroup.patchValue({ available: isAvailable });
          this.formGroup.patchValue({ notAvailable: !isAvailable });
        }
      }
    }
  }

}
