import { AfterViewInit, Component, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import IProduct from 'src/app/interfaces/Product';
import DATA from 'src/app/DATA'
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['name', 'price', 'isAvailable'];
  dataSource: IProduct[] = DATA;
  resultsLength: number = 100;
  @Input() isLoadingResults?: boolean;
  @Output() onPaginatorChange: EventEmitter<MatPaginator> = new EventEmitter();

  @ViewChild(MatPaginator)
  paginator?: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.paginator?.page
      .pipe(
        tap(() => this.onPaginatorChange.emit(this.paginator))
      )
      .subscribe();
  }

}
