import { RouterModule } from '@angular/router';
import { NavbarModule } from './navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterModule } from './footer/footer.module';
import { FooterComponent } from './footer/footer.component';
import { FeaturesModule } from '../feature/feature.module';
import { NotfoundComponent } from './components/notfound/notfound.component';

@NgModule({
  declarations: [NotfoundComponent],
  imports: [
    CommonModule,
    NavbarModule,
    FooterModule,
    FeaturesModule,
    RouterModule,
  ],
  exports: [NavbarComponent, FooterComponent, NotfoundComponent],
})
export class CoreModule {}
