import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

import DATA from 'src/app/DATA'
import IDataTableColumns from 'src/app/interfaces/DataTableColumns';
import IProduct from 'src/app/interfaces/Product';
import IProductFilters from 'src/app/interfaces/ProductFilters';

interface IFiltersParams {
  [key: string]: any
}

interface IPaginatorParams {
  page: number,
  limit: number
}

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
  paginatorParams: IPaginatorParams = {
    page: 1,
    limit: 10
  };
  filtersParams: IFiltersParams = {};

  constructor() { }

  ngOnInit(): void {
  }  

  handleFilters(filters: IProductFilters): void {
    this.isLoadingResults = true;
    
    this.filtersParams = this.generateFiltersParams(filters);
    this.loadData();
  }

  handlePaginator(paginator: MatPaginator): void {
    this.isLoadingResults = true;
    this.paginatorParams = {
      page: paginator.pageIndex + 1,
      limit: paginator.pageSize
    }
    this.loadData();
  }

  generateQuery(): string {
    let query = '';

    query = `?_page=${this.paginatorParams.page}&_limit=${this.paginatorParams.limit}`;

    for(let filter in this.filtersParams) {
      query += `&${filter}=${this.filtersParams[filter]}`;
    }

    return query;
  }

  loadData(): void {
    let query = this.generateQuery();
    console.log(query);
  }

  generateFiltersParams(filters: IProductFilters): {[key: string]: any} {
    let params: {[key: string]: any} = {};

    for(let filter in filters) {
      if(filter !== 'available' && filter !== 'notAvailable') {

        if(filter === 'productName') {
          params['productName_like^'] = filters[filter as keyof IProductFilters]; 
        }
        else {
          params[filter] = filters[filter as keyof IProductFilters]; 
        }

      }
    }

    if( filters.available !== filters.notAvailable ) {
      params['isAvailable'] = filters.available; 
    }

    return {...params};
  }  

}
