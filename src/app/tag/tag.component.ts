import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { Observable } from 'rxjs';
import { ApiService } from '../service/api.service'
import {MatDividerModule} from '@angular/material/divider';
import {MatChipsModule} from '@angular/material/chips';
import { Post } from '../post.model';

@Component({
  selector: 'app-tag',
  templateUrl: './tag.component.html',
  styleUrls: ['./tag.component.css']
})
export class TagComponent implements OnInit {

  tag: any[];
  comment: any[];
  @ViewChild(MatPaginator) paginator: MatPaginator;
  obs: Observable<any>;
  idx = 0;
  ctr = 0;
  commentId: string;
  len : number;
  toggle: boolean;
  keyTag: string;
  dataSource: MatTableDataSource<any>;
  commentSource: MatTableDataSource<any>;

  constructor(
    private apiSrv: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
    ) {}

  ngOnInit(): void {
    this.changeDetectorRef.detectChanges();
    this.apiSrv.getTag().subscribe(res => {
      this.tag = res;
    });

    if(localStorage.getItem('tagParam') != null){
      this.selectTag(localStorage.getItem('tagParam'))
      localStorage.clear()
    }
  }

  
  selectTag(inp: string){
    this.keyTag = inp;
    if(this.dataSource != null) {
      console.log('dataSource discon')
      this.dataSource.disconnect()
    }

    this.changeDetectorRef.detectChanges();
    this.apiSrv.getCustomTag(inp, 0).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res);      
      if(res.length >= 6){
        this.len = 999
        console.log('selectTag')
        this.paginator.pageIndex = 0;
      }
      else{
        this.len = res.length;
        // this.dataSource.paginator = this.paginator
      }
      
      this.obs = this.dataSource.connect();
    });
    console.log('1st' + this.keyTag)
  }

  showComment(id: string){
    if(id != this.commentId){
      this.ctr = 0;
    }
    if(this.ctr == 0){
      this.apiSrv.getComment(id).subscribe(res => {
        this.commentId = id;
        this.comment = res;
        this.ctr = 1;
        this.toggle = true;
        return;
      });
    }
      
      else{
        this.toggle = !this.toggle;
        this.ctr = 0
      } 
    }
  

  pageEvents(event: any) {
    if(event.pageIndex > this.idx) {
      console.log('pageEvent = '+this.keyTag)
      
      // console.log(Math.floor(this.dataSource.data.length/5)+1)
      
      this.idx = event.pageIndex;
      this.apiSrv.getCustomTag(this.keyTag, this.idx).subscribe(res => {
      this.dataSource = new MatTableDataSource<any>(res);      
      if(res.length < 6 ){
        this.len = res.length;
        // this.dataSource.paginator = this.paginator
      }
      this.obs = this.dataSource.connect();
      console.log(this.obs)
    });
    
    } else {
      console.log('prev')
      this.idx--;
      this.apiSrv.getCustomTag(this.keyTag, this.idx).subscribe(res => {
        this.dataSource = new MatTableDataSource<any>(res);  
        if(res.length >= 6){
          this.len = 999
          console.log('selectTag')
        }    

        this.obs = this.dataSource.connect();
      });
    }
 }

  // ngOnDestroy(){
  //   this.dataSource.disconnect();
  //  }
}
