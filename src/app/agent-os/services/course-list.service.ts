import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root',
})
export class CourseListService {
  constructor() {}

  saveData(courseval: string) {
    sessionStorage.setItem('courseval', courseval);
  }
  getData() {
    return sessionStorage.getItem('courseval');
  }
  removeData() {
    sessionStorage.removeItem('courseval');
  }

  saveHeader(course, label){
    sessionStorage.setItem('course',course );
    sessionStorage.setItem('label', label);
  }

  getCourselist(){
    return sessionStorage.getItem('course');
  }
  
  getHeader(){
    return sessionStorage.getItem('label');
  }
}
