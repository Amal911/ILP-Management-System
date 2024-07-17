import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DayPilot } from '@daypilot/daypilot-lite-angular';
import { Observable } from 'rxjs';
import { CalendarEvent } from '../interfaces/calendar-event';

@Injectable({
  providedIn: 'root'
})
export class DataService {

  events : CalendarEvent[]= [
    {
      id: '1',
      text: 'Portfolio',
      start: '2024-07-17T10:00:00',
      end: '2024-07-17T11:00:00',
    },
    {
      id: '2',
      text: 'HTML',
      start: '2024-07-16T10:00:00',
      end: '2024-07-16T11:00:00',
    },
    {
      id: '2',
      text: 'HTML',
      start: '2024-07-16T10:00:00',
      end: '2024-07-16T11:00:00',
    },
    {
      id: '3',
      text: 'CSS',
      start: '2024-07-15T14:00:00',
      end: '2024-07-15T15:00:00',
    },
    {
      id: '4',
      text: 'JAVA',
      start: '2024-07-14T10:00:00',
      end: '2024-07-14T11:00:00',
    },
    
  ];

  constructor(private http: HttpClient) {}

  getEvents(from: DayPilot.Date, to: DayPilot.Date): Observable<any[]> {
    return new Observable((observer) => {
      setTimeout(() => {
        observer.next(this.events);
      }, 200);
    });
  }

}
