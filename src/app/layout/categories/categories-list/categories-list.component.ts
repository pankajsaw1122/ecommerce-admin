import { Component, OnInit, ViewChild } from '@angular/core';
import { routerTransition } from '../../../router.animations';
import { ApiService } from '../../../shared/services/api.service';
import { MatPaginator, MatTableDataSource } from '@angular/material';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ConfirmAskComponent } from '../../../shared/confirm-ask/confirm-ask.component';

@Component({
  selector: 'app-categories-list',
  templateUrl: './categories-list.component.html',
  styleUrls: ['./categories-list.component.scss'],
  animations: [routerTransition()]

})

export class CategoriesListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  displayedColumns: string[] = [
    'id',
    'name',
    'description',
    'slug',
    'departmentName',
    'action'
  ];
  categoryList = [];
  data: any;
  resultsLength = 0;
  isLoadingResults = false;

  constructor(public dialog: MatDialog, private apiService: ApiService) { }

  ngOnInit() {
      this.isLoadingResults = true;
      this.apiService.getCategoriesList().subscribe((response: any) => {
        this.categoryList = response.data;
        this.data = new MatTableDataSource(response.data);
        this.isLoadingResults = false;
        this.resultsLength = response.data.length;
        this.data.paginator = this.paginator;
      });
  }

  applyFilter(filterValue: string) {
    this.data.filter = filterValue.trim().toLowerCase();
    if (this.data.paginator) {
      this.data.paginator.firstPage();
    }
  }

  deleteCategory(id) {
    let deleteData = {
      id: id,
      accessToken: 'dEStSa4Jd52b'
    };
    const dialogRef = this.dialog.open(ConfirmAskComponent, {
      width: '40%',
      data: 'Are you sure you want to delete this Category'
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      console.log('Dialog closed');
      if (result === true) {
      this.isLoadingResults = true;
        this.apiService.deleteCategory(deleteData).subscribe((response: any) => {
          console.log(response);
          if (response.status === 200) {
            this.ngOnInit();
            this.isLoadingResults = false;
          }
        });
      }
    });
  }

}
