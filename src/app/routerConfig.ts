import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { TagComponent } from './tag/tag.component';

const appRoutes: Routes = [
  { 
    path: 'home', 
    component: HomeComponent 
  },
  
  { 
    path: '',   
    redirectTo: '/home', 
    pathMatch: 'full' 
  }, 

  { 
    path: 'profile', 
    component: ProfileComponent 
  },

  { 
    path: 'tag', 
    component: TagComponent 
  },
];
export default appRoutes;