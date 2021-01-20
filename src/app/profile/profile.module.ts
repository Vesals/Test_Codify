import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { Routes } from '@angular/router';
import { ProfileDetailComponent } from './profile-detail/profile-detail.component';
import { ProfileComponent } from './profile.component';

import { RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatGridListModule} from '@angular/material/grid-list';
import {MatChipsModule} from '@angular/material/chips';
import {MatDividerModule} from '@angular/material/divider';

import { FlexLayoutModule } from '@angular/flex-layout';

const routes: Routes = [
  // { 
  //   path: 'profile-detail', 
  //   component: ProfileDetailComponent
  // },
  {
    path: '', 
    pathMatch: 'full', 
    redirectTo: 'profile'
  },
  { 
    path: '', 
    component: ProfileComponent,
  },

  {
    path: 'detail/:id',
    component: ProfileDetailComponent
 },
];


@NgModule({
  declarations: [
    ProfileComponent,
    ProfileDetailComponent,
  ],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    MatPaginatorModule,
    MatGridListModule,
    FlexLayoutModule,
    MatChipsModule,
    MatDividerModule,
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ProfileModule { }
