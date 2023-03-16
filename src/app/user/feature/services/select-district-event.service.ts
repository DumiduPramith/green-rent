import { EventEmitter, Injectable, Output } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SelectDistrictEventService {
  @Output() selectDistrictEvent = new EventEmitter<string>();
  constructor() {}

  sendSelectedDistrict(district: string) {
    this.selectDistrictEvent.emit(district);
  }
}
