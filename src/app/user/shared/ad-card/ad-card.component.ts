import { HttpClient } from '@angular/common/http';
import { AdvertisementCardInterface } from './../../profile/interfaces/advertisement-card.interface';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { AdcardSectionRefreshService } from '../services/adcard-section-refresh.service';

@Component({
  selector: 'app-ad-card',
  templateUrl: './ad-card.component.html',
  styleUrls: ['./ad-card.component.scss'],
})
export class AdCardComponent {
  //@ts-ignore
  visibilitySubscription: Subscription;
  //@ts-ignore
  deleteSubscription: Subscription;

  @Input() ad_card_details: AdvertisementCardInterface = {
    username: '',
    user_id: 0,
    profile_picture: '',
    title: '',
    ad_image: '',
    rate: 0,
    duration: '',
    ad_id: 0,
    status: 1,
  };

  constructor(
    private route: Router,
    private http: HttpClient,
    private snackBar: MatSnackBar,
    private dialog: MatDialog,
    private adCardRefresh: AdcardSectionRefreshService
  ) {}

  goToAd() {
    this.route.navigate(['ad', this.ad_card_details.ad_id]);
  }

  changeVisibility() {
    const url = 'http://localhost:5000/api/hide';

    const data = {
      advertise_id: this.ad_card_details.ad_id,
      code: this.ad_card_details.status == 0 ? 1 : 0,
    };
    this.visibilitySubscription = this.http.post(url, data).subscribe({
      next: (response: any) => {
        this.ad_card_details.status = this.ad_card_details.status == 1 ? 0 : 1;
        if (this.ad_card_details.status == 1) {
          this.openSnackBar('Visibility set Success');
        } else {
          this.openSnackBar('Hide Success');
        }
      },
      error: (err: any) => {
        console.log(err);
        this.snackBar.open('Error');
      },
      complete: () => {},
    });
  }

  delete_confirmation() {
    const dialogRef = this.dialog.open(DeleteConfirmationDialogComponent);

    dialogRef.afterClosed().subscribe((result) => {
      if (result.event == 'confirm') {
        this.delete_ad();
      }
    });
  }

  delete_ad() {
    const url = `http://localhost:5000/api/delete/ad/${this.ad_card_details.ad_id}`;

    this.deleteSubscription = this.http.delete(url).subscribe({
      next: (response: any) => {
        this.openSnackBar('Delete Success');
        this.adCardRefresh.sendRefreshEvent();
      },
      error: (err: any) => {
        console.log(err);
        this.openSnackBar('Not Deleted');
      },
      complete: () => {},
    });
  }

  ngOnDestroy() {
    if (this.visibilitySubscription) {
      this.visibilitySubscription.unsubscribe();
    }
    if (this.deleteSubscription) {
      this.deleteSubscription.unsubscribe();
    }
  }

  openSnackBar(msg: string, cls = 'snackbar') {
    this.snackBar.open(msg, 'Close', {
      duration: 5000,
      panelClass: [cls],
    });
  }
}

@Component({
  selector: 'delete-confirmation-dialog',
  templateUrl: 'delete_confomation_dialog.html',
})
export class DeleteConfirmationDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DeleteConfirmationDialogComponent>
  ) {}

  confirmDialog() {
    this.dialogRef.close({ event: 'confirm' });
  }

  closeDialog(): void {
    this.dialogRef.close({ event: 'cancel' });
  }
}
