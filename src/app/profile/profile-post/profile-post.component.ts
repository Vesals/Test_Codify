import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-profile-post',
  templateUrl: './profile-post.component.html',
  styleUrls: ['./profile-post.component.css']
})
export class ProfilePostComponent implements OnInit {
  tes: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  idx = 0;
  key: string;
  len : number;
  dataSource: MatTableDataSource<any>;

  constructor(
    private activatedRoute: ActivatedRoute,
    private apiSrv: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.key = this.activatedRoute.snapshot.params['id']
    this.changeDetectorRef.detectChanges();

    this.apiSrv.getProfilePost(this.key, this.idx).subscribe(result => {
      this.len = 999;

      this.dataSource = new MatTableDataSource<any>(result);      
      // this.dataSource.paginator = this.paginator;
      this.obs = this.dataSource.connect();
      
      console.log(this.obs)
    });
  }

  pageEvents(event: any) {
    if(event.pageIndex > this.idx) {
      console.log('next')
      console.log('pageIdx = ' + event.pageIndex)
      console.log('idx = ' + this.idx)
      this.idx = event.pageIndex;
      this.apiSrv.getProfilePost(this.key, this.idx).subscribe(result => {
  
        this.dataSource = new MatTableDataSource<any>(result);   
        if(result.length < 6 ){
          this.len = result.length;
          // this.dataSource.paginator = this.paginator
        }   
        // this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        
        console.log(this.obs)
      });

    } else {
      console.log('prev')
      console.log('pageIdx = ' + event.pageIndex)
      console.log('idx = ' + this.idx)
      this.idx--;
      this.apiSrv.getProfilePost(this.key, this.idx).subscribe(result => {  
        this.dataSource = new MatTableDataSource<any>(result);      
        if(result.length >= 6){
          this.len = 999
          console.log('selectTag')
        }    
        this.obs = this.dataSource.connect();
        
        console.log(this.obs)
      });
    }
 }

}
