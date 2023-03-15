import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { CoreModule } from './core/core.module';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthenticateGuard } from './guards/authenticate.guard';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, UserRoutingModule, CoreModule, MatDialogModule],
  providers: [AuthenticateGuard, MatDialog],
})
export class UserModule {}
