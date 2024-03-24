import { SharedDataService } from './../../Servies/shared-data.service';
import { ChangeDetectorRef, Component, OnInit, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-users-list',
  templateUrl: './users-list.component.html',
  styleUrls: ['./users-list.component.scss']
})
export class UsersListComponent implements OnInit, AfterViewInit, OnDestroy {

  displayedColumnsForApi = ['SrNo', 'firstName', 'lastName', 'email', 'contactNo', 'Action'];
  @ViewChild('paginator') paginator!: MatPaginator;
  @ViewChild('Sort') Sort!: MatSort;
  public DataSource = new MatTableDataSource<any>();
  searchModel: string = '';
  isLoading: boolean = false;
  users: any;
  private subscriptions: Subscription[] = [];

  constructor(
    private chRef: ChangeDetectorRef,
    private router: Router,
    private _service: SharedDataService,
    private _toaster: ToastrService
  ) { }

  ngOnInit(): void {
    this.GetUsersList();
    
  }

  ngAfterViewInit(): void {
    this.DataSource.paginator = this.paginator;
    this.DataSource.sort = this.Sort;
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  GetUsersList() {
    this.isLoading = true;
    const sub = this._service.getUsersData().subscribe(users => {
      console.log('data', users)
      this.users = users;
      if (users && users.length > 0) {
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
    });
    this.isLoading = false;
    this.subscriptions.push(sub);
  }

  redirectToList() {
    this.router.navigate(['/add-user']);
    this.unsubscribe();
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

  editUser(row: any) {
    debugger
    debugger
    console.log('row', row);
    this.router.navigate(['/edit-user', row.id,{ imageData: row.imagePath }]);
  }

  deleteUser(id: string): void {
    if (confirm('Are you sure you want to delete this user?')) {
      this.isLoading = true;
      const sub = this._service.deleteUser(id).subscribe({
        next: () => {
          this._toaster.success('User deleted successfully!');
          this.GetUsersList(); // Refresh the list after deletion
        },
        error: (error) => {
          console.error('Error deleting the user:', error);
          this._toaster.error('Error deleting the user');
          this.isLoading = false;
        }
      });

      this.subscriptions.push(sub);
    }
  }

  private unsubscribe(): void {
    this.subscriptions.forEach(subscription => subscription.unsubscribe());
    this.subscriptions = [];
  }
}
