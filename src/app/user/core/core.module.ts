import { NavbarModule } from './navbar/navbar.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { FooterModule } from './footer/footer.module';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  declarations: [],
  imports: [CommonModule, NavbarModule, FooterModule],
  exports: [NavbarComponent, FooterComponent],
})
export class CoreModule {}
