import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResourcesComponent } from './resources/resources.component';
import {BuildingsComponent} from './buildings/buildings.component';


const routes: Routes = [
  {
    path: 'resources',
    component: ResourcesComponent,
    data: { title: 'Resource List' }
  },
  { path: '',
    redirectTo: '/resources',
    pathMatch: 'full'
  },
  {
    path: 'buildings',
    component: BuildingsComponent,
    data: { title: 'Building List' }
  },
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: true})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
