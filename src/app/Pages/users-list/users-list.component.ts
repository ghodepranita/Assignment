import { SharedDataService } from './../../Servies/shared-data.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit,AfterViewInit {

  
  displayedColumnsForApi = ['SrNo', 'firstName', 'lastName', 'email', 'contactNo', 'address'];
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('Sort') Sort!: MatSort;
  public DataSource = new MatTableDataSource<any>();
  searchModel: string = '';
  isLoading: boolean = false;
  users: any[] = [];

  constructor(
    private chRef: ChangeDetectorRef,
    private router: Router,
    private _service:SharedDataService
  ) { }

  ngOnInit(): void {
    this.GetUsersList();
  }

  ngAfterViewInit(): void {
    this.DataSource.paginator = this.paginator;
    this.DataSource.sort = this.Sort;
  }

  GetUsersList() {
    this.isLoading = true;
    this.users = this._service.getUsersData();  
    if (this.users && this.users.length > 0) {
      this.DataSource.data = this.users;  
      this.isLoading = false;
      this.chRef.detectChanges();
    } else {
      this.DataSource.data = [];
      this.DataSource.paginator = this.paginator;
      this.DataSource.sort = this.Sort;
      this.isLoading = false;
      this.chRef.detectChanges();
    }
  }
  
  redirecttolist() {    
    this.router.navigate(['/add-user']);
    this.chRef.detectChanges();
  }
 
  applyFilter() {
    this.isLoading = true;
    this.searchModel = this.searchModel.trim();
    this.searchModel = this.searchModel.toLowerCase();
    this.DataSource.filter = this.searchModel;
    this.isLoading = false;
    this.chRef.detectChanges();
  }

}
