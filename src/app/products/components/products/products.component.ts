import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { debounceTime } from 'rxjs';

import IDataTableColumns from 'src/app/interfaces/DataTableColumns';
import IProduct from 'src/app/interfaces/Product';
import IProductFilters from 'src/app/interfaces/ProductFilters';
import { IFiltersParams, IPaginatorParams } from 'src/app/interfaces/Params';
import { ProductsService } from '../../services/products.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  dataSource: IProduct[] = [];
  resultsLength: number = 100;
  displayedColumns: IDataTableColumns[] = [
    { displayedName: 'Name', value: 'productName', type: "text" },
    { displayedName: 'Price', value: 'price', type: "text" },
    { displayedName: 'Availability', value: 'isAvailable', type: "check" },
  ];

  isLoadingResults: boolean = true;
  paginatorParams: IPaginatorParams = {
    _page: 1,
    _limit: 10
  };
  filtersParams: IFiltersParams = {};

  constructor(private router: Router, private route: ActivatedRoute, private productsService: ProductsService) { }

  ngOnInit(): void {

    this.route.queryParams
      .pipe(
        debounceTime(100)
      )
      .subscribe(params => {
        if(Object.keys(params).length !== 0) {
          const { _page, _limit } = params;
          let newFiltersParams: IFiltersParams = {};
  
          for( let param in params ) {
            if(param !== '_page' && param !== '_limit') {
              newFiltersParams[param] = params[param];
            }
          }
  
          this.paginatorParams = {_page: parseInt(_page), _limit: parseInt(_limit)};
          this.filtersParams = { ...this.filtersParams, ...newFiltersParams };

          if(!this.dataSource.length && Object.keys(this.filtersParams).length === 0) {
            this.loadData();
          }
        }
        else {
          if(!this.dataSource.length) {
            this.loadData();
          }
        }
      }
    );

  }  

  handleFilters(filters: IProductFilters): void {
    this.isLoadingResults = true;

    Object.keys(filters).forEach((key) => filters[key as keyof IProductFilters] === "" && delete filters[key as keyof IProductFilters]);

    this.filtersParams = this.generateFiltersParams(filters);

    this.paginatorParams = {
      ...this.paginatorParams,
      _page: 1
    }

    this.updateURLParams();
    this.loadData();
  }

  handlePaginator(paginator: {pageIndex: number, pageSize: number}): void {

    this.isLoadingResults = true;

    this.paginatorParams = {
      _page: paginator.pageIndex,
      _limit: paginator.pageSize
    }

    this.updateURLParams();
    this.loadData();
  }

  generateQuery(): string {
    let query = '';

    query = `?_page=${this.paginatorParams._page}&_limit=${this.paginatorParams._limit}`;

    for(let filter in this.filtersParams) {
      if(filter === 'productName_like') {
        query += `&${filter}=^${this.filtersParams[filter]}`;
      }
      else {
        query += `&${filter}=${this.filtersParams[filter]}`;
      }
    }

    return query;
  }

  loadData(): void {
    let query = this.generateQuery();
    this.productsService.getProducts(query)
      .subscribe(
        (response) => {
            this.isLoadingResults = false;

            this.dataSource = response.body!;
            this.resultsLength = parseInt(response.headers.get('x-total-count')!);
            
          }
      )
  }

  generateFiltersParams(filters: IProductFilters): {[key: string]: any} {
    let params: {[key: string]: any} = {};

    for(let filter in filters) {
      if(filter !== 'available' && filter !== 'notAvailable') {

        if(filter === 'productName') {
          params['productName_like'] = filters[filter as keyof IProductFilters]; 
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
