
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { ProfessionalService } from './services/professional.service';
import { ProfessionalAddComponent } from './components/professional-add/professional-add.component';
import { ProfessionalEditComponent } from './components/professional-edit/professional-edit.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {

  pageNo: number = 1;
  pageSize: number = 20;
  pageSizes = [3, 5, 7];

  // the columns that will be displayed in the professional details table
  displayedColumns: string[] = [
    'id',
    'username',
    'mail',
    'phoneNumber',
    'skillset',
    'hobby',
    'createDateTime',
    'action'
  ];

  // professional list will be assigned to this and it is passed as the data source to the mat-table in the HTML template 
  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  // dependency injection
  constructor(
    private dialog: MatDialog,
    private professionalService: ProfessionalService,
  ) { }

  ngOnInit(): void {
    this.getProfessionalList(this.pageNo, this.pageSize);
  }

  openAddDialog() {
    const dialogRef = this.dialog.open(ProfessionalAddComponent);
    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfessionalList(this.pageNo, this.pageSize);
        }
      },
    });
  }

  getProfessionalList(pageNo: number, pageSize: number) {
    this.professionalService.getProfessionalList(pageNo, pageSize).subscribe({
      next: (res) => {
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      },
    });
  }

  // for searching 
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  deleteProfessional(id: number) {
    let confirm = window.confirm("Are you sure you want to delete this professional?");
    if (confirm) {
      this.professionalService.deleteProfessional(id).subscribe({
        next: (res) => {
          alert('Professional deleted successfully!');
          this.getProfessionalList(this.pageNo, this.pageSize);
        },
        error: (err) => {
          console.log(err);
        },
      });
    }
  }

  openEditDialog(data: any) {
    const dialogRef = this.dialog.open(ProfessionalEditComponent, {
      data,
    });

    dialogRef.afterClosed().subscribe({
      next: (val) => {
        if (val) {
          this.getProfessionalList(this.pageNo, this.pageSize);
        }
      }
    });
  }
}