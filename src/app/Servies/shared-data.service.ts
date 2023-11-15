import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  private storedUsersData: any[] = [];
  
  constructor() {
    const storedUsersDataString = localStorage.getItem('users');
    this.storedUsersData = storedUsersDataString ? JSON.parse(storedUsersDataString) : [];
  }

  saveUserData(userData: any): void {
    this.storedUsersData.push(userData);
    localStorage.setItem('users', JSON.stringify(this.storedUsersData));
  }

  getUsersData(): any[] {
    return this.storedUsersData;
  }
}
