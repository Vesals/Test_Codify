import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-profile-detail',
  templateUrl: './profile-detail.component.html',
  styleUrls: ['./profile-detail.component.css']
})
export class ProfileDetailComponent implements OnInit {

  key: string;
  profile: any[];
  showContent: boolean = false;
  constructor(
    private activatedRoute: ActivatedRoute,
    private apiSrv: ApiService,
    private router: Router
  ) { }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.params['id'])
    this.key = this.activatedRoute.snapshot.params['id']
    console.log(this.key)
    this.apiSrv.getProfileDetail(this.key).subscribe((data: any[])=>{
      console.log(data);
      this.profile = data;
    })  

    setTimeout(()=>this.showContent=true, 2000);
  }

}
