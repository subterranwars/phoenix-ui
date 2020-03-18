import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { ResourcesComponent } from './resources/resources.component';
import { BuildingsComponent } from './buildings/buildings.component';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from '../guards/auth.guard';
import { RegisterComponent } from './register/register.component';
import {MainComponent} from './main/main.component';
import {OverviewComponent} from './overview/overview.component';
import { MessageOverviewComponent } from './messages/messages.component';
import { NotificationComponent } from './notifications/notifications.component';
import {ResearchComponent} from './research/research.component';

const routes: Routes = [
  { path: '', redirectTo: '/main', pathMatch: 'full', canActivate: [AuthGuard] },
  { path: 'main', component: MainComponent, canActivate: [AuthGuard],
    children: [
      { path: 'overview', component: OverviewComponent, canActivate: [AuthGuard], data: { title: 'Overview' }},
      { path: 'resources', component: ResourcesComponent, canActivate: [AuthGuard], data: { title: 'Resource List' }},
      { path: 'buildings', component: BuildingsComponent, canActivate: [AuthGuard], data: { title: 'Building List' }},
      { path: 'messages', component: MessageOverviewComponent, canActivate: [AuthGuard], data: { title: 'Building List' }},
      { path: 'notifications', component: NotificationComponent, canActivate: [AuthGuard], data: { title: 'Building List' }},
      { path: 'research', component: ResearchComponent, canActivate: [AuthGuard], data: { title: 'Research List' }},
      { path: '', redirectTo: 'overview', pathMatch: 'full'}
    ]
  },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: '**', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {enableTracing: false})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
