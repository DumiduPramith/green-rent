import { NavbarModule } from './navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterModule } from './footer/footer.module';
import { FooterComponent } from './footer/footer.component';
import { FeaturesModule } from '../feature/feature.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, NavbarModule, FooterModule, FeaturesModule],
  exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {}
