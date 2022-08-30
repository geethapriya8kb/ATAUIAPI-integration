import { EventEmitter, Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  sharedEvent: EventEmitter<string> = new EventEmitter<string>();

  constructor() { }

  sendData(data: any) {
    return this.sharedEvent.emit(data);
  }
}
