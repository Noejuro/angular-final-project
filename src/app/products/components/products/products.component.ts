import { Component, OnInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  isLoadingResults: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  loadData(paginator: MatPaginator): void {
    this.isLoadingResults = true;
    const query = `?page=${paginator?.pageIndex + 1}&size=${paginator?.pageSize}`;
    console.log(query)
  }

}
