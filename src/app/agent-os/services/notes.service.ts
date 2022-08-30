import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class NotesService {

  constructor() { }

  getNotes() {
    return [
      'CSG Residential - 8429763145879632',
      'CSG Residential (FTTP) - 8245123922263374'
    ];
  }
}
