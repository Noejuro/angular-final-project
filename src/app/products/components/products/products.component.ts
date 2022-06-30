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
  paginatorQuery: string = "";
  filtersQuery: string = "?";

  constructor() { }

  ngOnInit(): void {
  }

  handleFilters(filters: IProductFilters): void {
    this.isLoadingResults = true;
    this.filtersQuery = '?';
    for(let filter in filters) {
      this.filtersQuery += `${filter}=${filters[filter as keyof IProductFilters]}&`
    }
    this.filtersQuery = this.filtersQuery.slice(0, -1)
    let query = this.filtersQuery + this.paginatorQuery;
    console.log(query)
  }

  handlePaginator(paginator: MatPaginator): void {
    this.isLoadingResults = true;
    this.paginatorQuery = `&page=${paginator?.pageIndex + 1}&size=${paginator?.pageSize}`;
    let query = this.filtersQuery + this.paginatorQuery;
    console.log(query)
  }

}
