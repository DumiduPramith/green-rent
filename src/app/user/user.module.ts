import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CoreModule } from './core/core.module';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, CoreModule],
})
export class UserModule {}
