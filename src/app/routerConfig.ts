import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { TagComponent } from './tag/tag.component';

const appRoutes: Routes = [
  { 
    path: '',   
    redirectTo: 'home', 
    pathMatch: 'full' 
  }, 

  { 
    path: 'home', 
    component: HomeComponent 
  },

  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
   },

  { 
    path: 'tag', 
    component: TagComponent 
  },
];
export default appRoutes;