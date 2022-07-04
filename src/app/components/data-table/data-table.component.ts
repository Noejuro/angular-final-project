import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { tap } from 'rxjs';
import IDataTableColumns from 'src/app/interfaces/DataTableColumns';

@Component({
  selector: 'app-data-table',
  templateUrl: './data-table.component.html',
  styleUrls: ['./data-table.component.scss']
})

export class DataTableComponent implements OnInit, AfterViewInit, OnChanges {
  @Input() data: unknown[] = [];
  @Input() resultsLength: number = 0;
  @Input() displayedColumns: IDataTableColumns[] = [];
  @Input() isLoadingResults: boolean = true;
  @Input() page: number = 0;
  @Input() limit: number = 10;
  @Output() onPaginatorChange: EventEmitter<MatPaginator> = new EventEmitter();

  columnsNames: string[] = [];

  @ViewChild(MatPaginator)
  paginator?: MatPaginator;

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['displayedColumns']) {
      this.columnsNames = changes['displayedColumns'].currentValue.map( (column: IDataTableColumns) => column.value);
    }
  }

  ngAfterViewInit(): void {
    this.paginator?.page
      .pipe(
        tap(() => this.onPaginatorChange.emit(this.paginator))
      )
      .subscribe();
  }

}
