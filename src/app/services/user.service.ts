import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { User } from '../interfaces/user';

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private users: User[] = [{
    "trainees": [
      {
        "id": 1,
        "name": "Amal E A",
        "batch": "Batch 03",
        "year": 2023
      },
      {
        "id": 2,
        "name": "Dharsan",
        "batch": "Batch 03",
        "year": 2024
      },
      {
        "id": 3,
        "name": "Jisna",
        "batch": "Batch 03",
        "year": 2023
      },
      {
        "id": 4,
        "name": "Thulasi",
        "batch": "Batch 03",
        "year": 2024
      },
      {
        "id": 5,
        "name": "Reshmi",
        "batch": "Batch 03",
        "year": 2023
      },
      {
        "id": 6,
        "name": "Kailas",
        "batch": "Batch 03",
        "year": 2023
      },
    ],
    "trainers": [
      {
        "id": 7,
        "name": "Lekshmi A"
      },
      {
        "id": 8,
        "name": "Suneesh"
      },
      {
        "id": 9,
        "name": "Ashin"
      },
    ],
    "admins": [
      {
        "id": 10,
        "name": "Pratheep",
      },
      {
        "id": 10,
        "name": "Kavita",
      },
  
    ]
  }]

  constructor() { }

  getUsers(): Observable<User[]> {
    return of(this.users);
  }

}

