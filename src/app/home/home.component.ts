import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service'
import {MatChipsModule} from '@angular/material/chips';
import { Post } from '../post.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  tes: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  idx = 0;
  len : number;
  dataSource: MatTableDataSource<any>;

  constructor(
    private apiSrv: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
    ) {}

  ngOnInit() {
    // this.apiSrv.getTag().subscribe(res => {
    //   this.tes = res;
    //   console.log('hehe');
    //   console.log(res);
    // });

    this.changeDetectorRef.detectChanges();

    this.apiSrv.resolveItems(this.idx).subscribe(result => {
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
      this.apiSrv.resolveItems(this.idx).subscribe(result => {
    
        this.dataSource = new MatTableDataSource<any>(result);   
        console.log('here')
        
        // this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        
        console.log(this.obs)
        
      });

    } else {
      console.log('prev')
      console.log('pageIdx = ' + event.pageIndex)
      console.log('idx = ' + this.idx)
      this.idx--;
      this.apiSrv.resolveItems(this.idx).subscribe(result => {
        this.dataSource = new MatTableDataSource<any>(result);   
        console.log('here')
        
        // this.dataSource.paginator = this.paginator;
        this.obs = this.dataSource.connect();
        
        console.log(this.obs)
        
      });
    }
 }

 ngOnDestroy(){
  this.dataSource.disconnect();
 }

}
