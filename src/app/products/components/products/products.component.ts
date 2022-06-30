import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';

import DATA from 'src/app/DATA'
import IDataTableColumns from 'src/app/interfaces/DataTableColumns';
import IProduct from 'src/app/interfaces/Product';
import IProductFilters from 'src/app/interfaces/ProductFilters';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dataSource: IProduct[] = DATA;
  resultsLength: number = 100;
  displayedColumns: IDataTableColumns[] = [
    { displayedName: 'Name', value: 'productName', type: "text" },
    { displayedName: 'Price', value: 'price', type: "text" },
    { displayedName: 'Availability', value: 'isAvailable', type: "check" },
  ];

  isLoadingResults: boolean = false;
  paginatorQuery: string = "?_page=1&_limit=10";
  filtersQuery: string = "";

  constructor() { }

  ngOnInit(): void {
  }  

  handleFilters(filters: IProductFilters): void {
    this.isLoadingResults = true;
    
    this.filtersQuery = this.generateFiltersQuery(filters);

    let query = this.paginatorQuery + this.filtersQuery;
    console.log(query)
  }

  handlePaginator(paginator: MatPaginator): void {
    this.isLoadingResults = true;
    this.paginatorQuery = `?_page=${paginator?.pageIndex + 1}&_limit=${paginator?.pageSize}`;
    let query = this.paginatorQuery + this.filtersQuery;
    console.log(query)
  }

  loadData(query: string): void {
    
  }

  generateFiltersQuery(filters: IProductFilters): string {
    let query = '';

    for(let filter in filters) {
      if(filter !== 'available' && filter !== 'notAvailable') {
        if(filter === 'productName') {
          query += `${filter}_like^=${filters[filter as keyof IProductFilters]}&`
        }
        else {
          query += `${filter}=${filters[filter as keyof IProductFilters]}&`
        }
      }
    }
    
    if( (filters.available && filters.notAvailable) || (!filters.available && !filters.notAvailable) ) {
      query = query.slice(0, -1)
    }
    else {
      query += filters.available ? 'isAvailable=true' : 'isAvailable=false';
    }

    return query;
  }  

}
