import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {
  formGroup = new FormGroup({
    'name': new FormControl(''),
    'min': new FormControl('', Validators.pattern("^[0-9]*$")),
    'max': new FormControl('', Validators.pattern("^[0-9]*$")),
    'available': new FormControl(''),
    'notAvailable': new FormControl('')
  })

  constructor() { }

  ngOnInit(): void {
  }

}
