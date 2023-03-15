import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthenticateGuard } from './guards/authenticate.guard';
import { NotfoundComponent } from './core/components/notfound/notfound.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: '',
        loadChildren: () =>
          import('./home/home.module').then((m) => m.HomeModule),
      },
      {
        path: 'results',
        loadChildren: () =>
          import('./search/search.module').then((m) => m.SearchModule),
      },
      {
        path: 'post-ad',
        loadChildren: () =>
          import('./feature/post-ad/post-ad.module').then(
            (m) => m.PostAdModule
          ),
        canActivate: [AuthenticateGuard],
      },
      {
        path: 'profile/:id',
        loadChildren: () =>
          import('./profile/profile.module').then((m) => m.ProfileModule),
      },
      {
        path: 'ad/:id',
        loadChildren: () =>
          import('./advertisement/advertisement.module').then(
            (m) => m.AdvertisementModule
          ),
      },
      { path: 'notfound', component: NotfoundComponent, title: 'Not Found' },
      {
        path: '**',
        pathMatch: 'full',
        component: NotfoundComponent,
        title: 'Not Found',
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
