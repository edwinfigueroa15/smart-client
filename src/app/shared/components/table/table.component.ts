import { Component, EventEmitter, Input, OnInit, Output, ViewChild, booleanAttribute } from '@angular/core';
import Modules from '@/app/shared/modules';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  standalone: true,
  imports: [...Modules]
})
export class TableComponent  implements OnInit {
  currenItem: any = null;

  @Input() showActionsTable: { edit?: boolean, delete?: boolean, detail?: boolean, status?: boolean } = {
    edit: false,
    status: false,
    delete: false,
    detail: false,
  };
  @Input({ required: true }) keyHeaderColumns: string[] = [];
  @Input({ required: true }) nameHeaderColumns = {} as { [key: string]: string };
  @Input({ required: true }) dataSource!: MatTableDataSource<any>;
  @Input({ transform: booleanAttribute }) showPaginator: boolean = false;

  @Output() detailEvent = new EventEmitter<any>();
  @Output() editEvent = new EventEmitter<any>();
  @Output() changeStatusEvent = new EventEmitter<any>();
  @Output() deleteEvent = new EventEmitter<any>();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor() { }

  ngOnInit() { }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
  }

  menuOpen(item: any) {
    this.currenItem = item;
  }

  menuClose() {
    this.currenItem = null;
  }

  OnDetail() {
    this.detailEvent.emit(this.currenItem);
  }

  OnEdit() {
    this.editEvent.emit(this.currenItem);
  }

  OnChangeStatus() {
    this.changeStatusEvent.emit(this.currenItem);
  }

  OnDelete() {
    this.deleteEvent.emit(this.currenItem);
  }
}
