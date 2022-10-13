import { Injectable } from '@angular/core';
import { StorageService } from './storage.service';
@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private isloggedIn: boolean = false;

  constructor(private storeService: StorageService) {}
  isAccountAuthenticated(): boolean {
    const testAccount = this.storeService.courseListAccounts;
    console.log(testAccount);
    if (testAccount === '') {
      this.isloggedIn = true;
    } else {
      this.isloggedIn = false;
    }
    return this.isloggedIn;
  }
  isUserLoggedIn(): boolean {
		return this.isloggedIn;
	}
}
