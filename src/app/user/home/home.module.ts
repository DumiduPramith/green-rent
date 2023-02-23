import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home.component';
import { FeaturesModule } from './../feature/feature.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategorySectionComponent } from './category-section/category-section.component';
import { CategoryCardComponent } from './category-card/category-card.component';

const routes: Routes = [{ path: '', component: HomeComponent }];

@NgModule({
  declarations: [
    HomeComponent,
    CategorySectionComponent,
    CategoryCardComponent,
  ],
  imports: [
    CommonModule,
    FeaturesModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
  ],
  exports: [HomeComponent],
})
export class HomeModule {}
