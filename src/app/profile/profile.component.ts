import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ApiService } from '../service/api.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  profile: any[];

  constructor(
    private apiSrv: ApiService,
    private changeDetectorRef: ChangeDetectorRef,
    private router: Router
    ) {}

  ngOnInit(): void {

    this.changeDetectorRef.detectChanges();
    this.apiSrv.getProfile().subscribe(res => {
      this.profile = res;
    });
  }

  viewMore(key: string){
    console.log(key)
    this.router.navigate(['/profile/detail', key ]);
  }  

}
