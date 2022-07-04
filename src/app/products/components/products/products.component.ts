import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { ActivatedRoute, Router } from '@angular/router';

import DATA from 'src/app/DATA'

import IDataTableColumns from 'src/app/interfaces/DataTableColumns';
import IProduct from 'src/app/interfaces/Product';
import IProductFilters from 'src/app/interfaces/ProductFilters';

interface IFiltersParams {
  [key: string]: any
}

interface IPaginatorParams {
  _page: number,
  _limit: number
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
    _page: 1,
    _limit: 10
  };
  filtersParams: IFiltersParams = {};

  constructor(private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params
      .subscribe(params => {
        for(let param in params) {
          if( param === '_page' || param === '_limit' ) {
            this.paginatorParams[param] = params[param];
          }
          else {
            this.filtersParams[param] = params[param];
          }
        }
        console.log("First Load Paginator: ", this.paginatorParams);
        console.log("First Load Filters: ", this.filtersParams); 
      }
    );
  }  

  handleFilters(filters: IProductFilters): void {
    this.isLoadingResults = true;
    
    this.filtersParams = this.generateFiltersParams(filters);

    this.updateURLParams();
    this.loadData();
  }

  handlePaginator(paginator: MatPaginator): void {
    this.isLoadingResults = true;

    this.paginatorParams = {
      _page: paginator.pageIndex + 1,
      _limit: paginator.pageSize
    }

    this.updateURLParams();
    this.loadData();
  }

  generateQuery(): string {
    let query = '';

    query = `?_page=${this.paginatorParams._page}&_limit=${this.paginatorParams._limit}`;

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

  updateURLParams(): void {
    this.router.navigate([],{
      relativeTo: this.route,
      queryParams: {
        ...this.paginatorParams,
        ...this.filtersParams
      }
    })
  }

}
