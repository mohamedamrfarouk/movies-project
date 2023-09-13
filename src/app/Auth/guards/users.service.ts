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
    this.loadUserDataFromCsv().subscribe((data) => {
      this.userData = data;
    });
  }

  private loadUserDataFromCsv(): Observable<{ email: string; password: string }[]> {
    return new Observable((observer) => {
      fetch('/assets/users.csv') 
        .then((response) => response.text())
        .then((data) => {
          const lines = data.split('\n').slice(1);
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

  isUserValid(email: string, password: string): boolean {
    const user = this.userData.find(
      (userData) => userData.email === email && userData.password === password
    );
    return !!user;
  }

  doesUserExist(email: string): boolean {
    const user = this.userData.find((userData) => userData.email === email);
    return !!user; 
  }

  addUserToCsv(email: string, password: string): Observable<void> {
    const userExists = this.userData.some((userData) => userData.email === email);

    if (userExists) {
      return new Observable((observer) => {
        observer.error('User with this email already exists.');
      });
    }

    this.userData.push({ email, password });

    const csvData = `email,password\n${this.userData
      .map((user) => `${user.email},${user.password}`)
      .join('\n')}`;

      
    return new Observable((observer) => {
      observer.next();
      observer.complete();
    });
  }
}