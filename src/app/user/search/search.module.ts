import { Routes, RouterModule } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SearchComponent } from './search.component';
import { SearchSectionComponent } from './search-section/search-section.component';

import { FeaturesModule } from '../feature/feature.module';
import { SharedModule } from '../shared/shared.module';

const routes: Routes = [{ path: '', component: SearchComponent }];

@NgModule({
  declarations: [SearchComponent, SearchSectionComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    MatToolbarModule,
    FeaturesModule,
    SharedModule,
  ],
})
export class SearchModule {}
