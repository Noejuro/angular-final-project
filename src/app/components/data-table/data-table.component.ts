import { Component, OnInit } from '@angular/core';
import IProduct from 'src/app/interfaces/Product';
import DATA from 'src/app/DATA'

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit {
  displayedColumns: string[] = ['name', 'price', 'isAvailable'];
  dataSource: IProduct[] = DATA;

  constructor() { }

  ngOnInit(): void {
  }

}
