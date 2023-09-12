import { Injectable } from '@angular/core';
import axios from 'axios';
import { from, of, switchMap, throwError } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private userData: { email: string; password: string }[] = [];

  constructor() {
    // Load user data from CSV when the service is instantiated
    this.loadUserDataFromCsv().subscribe((data) => {
      this.userData = data;
    });
  }

  // Load user data from the CSV file
  private loadUserDataFromCsv(): Observable<{ email: string; password: string }[]> {
    return new Observable((observer) => {
      fetch('/assets/users.csv') // Assuming the CSV file is in the 'assets' folder
        .then((response) => response.text())
        .then((data) => {
          const lines = data.split('\n').slice(1); // Exclude the header row
          const users = lines.map((line) => {
            const [email, password] = line.split(',');
            return { email, password };
          });
          observer.next(users);
          observer.complete();
        })
        .catch((error) => {
          console.error('Error loading CSV data:', error);
          observer.error(error);
        });
    });
  }

  // Check if a user with the given email and password exists
  isUserValid(email: string, password: string): boolean {
    const user = this.userData.find(
      (userData) => userData.email === email && userData.password === password
    );
    return !!user; // Returns true if a matching user is found, otherwise false
  }

  // Check if a user with the given email exists
  doesUserExist(email: string): boolean {
    const user = this.userData.find((userData) => userData.email === email);
    return !!user; // Returns true if a user with the email exists, otherwise false
  }

  // Add a new user to the CSV file
  addUserToCsv(email: string, password: string): Observable<void> {
    // Check if the user already exists
    const userExists = this.userData.some((userData) => userData.email === email);

    if (userExists) {
      return new Observable((observer) => {
        observer.error('User with this email already exists.');
      });
    }

    // Add the new user to the userData array
    this.userData.push({ email, password });

    // Prepare the CSV data with headers
    const csvData = `email,password\n${this.userData
      .map((user) => `${user.email},${user.password}`)
      .join('\n')}`;

      
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }
}