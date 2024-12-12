import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DashboardScoresService {
  constructor(private http: HttpClient) {}

  getAllScores(): Observable<any> {
    // return this.http.get(`${this.baseURL}`);
    const total_score: any = [
      {
        id: 1,
        name: 'John Doe',
        daily_assessment: 0,
        live_assessment: 78,
        module_assessment: 92,
        case_study: 88,
        project: 95,
      },
      {
        id: 2,
        name: 'Jane Smith',
        daily_assessment: 90,
        live_assessment: 82,
        module_assessment: 88,
        case_study: 90,
        project: 93,
      },
      {
        id: 3,
        name: 'Michael Johnson',
        daily_assessment: 79,
        live_assessment: 85,
        module_assessment: 91,
        case_study: 87,
        project: 90,
      },
      {
        id: 4,
        name: 'Emily Brown',
        daily_assessment: 88,
        live_assessment: 76,
        module_assessment: 85,
        case_study: 82,
        project: 91,
      },
      {
        id: 5,
        name: 'William Wilson',
        daily_assessment: 82,
        live_assessment: 89,
        module_assessment: 94,
        case_study: 85,
        project: 88,
      },
      {
        id: 6,
        name: 'Sophia Martinez',
        daily_assessment: 91,
        live_assessment: 83,
        module_assessment: 87,
        case_study: 92,
        project: 94,
      },
      {
        id: 7,
        name: 'James Thompson',
        daily_assessment: 84,
        live_assessment: 90,
        module_assessment: 89,
        case_study: 86,
        project: 92,
      },
      {
        id: 8,
        name: 'Olivia Davis',
        daily_assessment: 87,
        live_assessment: 88,
        module_assessment: 93,
        case_study: 89,
        project: 87,
      },
      {
        id: 9,
        name: 'Daniel Garcia',
        daily_assessment: 83,
        live_assessment: 91,
        module_assessment: 90,
        case_study: 83,
        project: 89,
      },
      {
        id: 10,
        name: 'Isabella Rodriguez',
        daily_assessment: 89,
        live_assessment: 84,
        module_assessment: 86,
        case_study: 91,
        project: 90,
      },
      {
        id: 11,
        name: 'Liam Martinez',
        daily_assessment: 92,
        live_assessment: 80,
        module_assessment: 84,
        case_study: 93,
        project: 88,
      },
      {
        id: 12,
        name: 'Mia Wilson',
        daily_assessment: 80,
        live_assessment: 86,
        module_assessment: 92,
        case_study: 84,
        project: 91,
      },
      {
        id: 13,
        name: 'Alexander Thompson',
        daily_assessment: 86,
        live_assessment: 79,
        module_assessment: 87,
        case_study: 88,
        project: 93,
      },
      {
        id: 14,
        name: 'Charlotte Harris',
        daily_assessment: 81,
        live_assessment: 87,
        module_assessment: 85,
        case_study: 90,
        project: 89,
      },
      {
        id: 15,
        name: 'Benjamin Scott',
        daily_assessment: 88,
        live_assessment: 81,
        module_assessment: 83,
        case_study: 87,
        project: 92,
      },
    ];
    return of(total_score);
  }

  getCategoryWiseScores(): Observable<any> {
    const categoryWiseScore:any = {
      daily_assessment: {
        type: 'Daily Assessment',
        tasks: [
          'Jira',
          'Encapsulation',
          'Function overloading',
          'Func overriding',
          'Inheritance',
        ],
        taskWiseScores: [
          {
            id: 1,
            name: 'John Doe',
            scores: [86, 78, 92, 88, 95],
          },
          {
            id: 2,
            name: 'Jane Smith',
            scores: [90, 82, 88, 90, 93],
          },
          {
            id: 3,
            name: 'Michael Johnson',
            scores: [79, 85, 91, 87, 90],
          },
          {
            id: 4,
            name: 'Emily Brown',
            scores: [88, 76, 85, 82, 91],
          },
          {
            id: 5,
            name: 'William Wilson',
            scores: [82, 89, 94, 85, 88],
          },
          {
            id: 6,
            name: 'Sophia Martinez',
            scores: [91, 83, 87, 92, 94],
          },
          {
            id: 7,
            name: 'James Thompson',
            scores: [84, 90, 89, 86, 92],
          },
          {
            id: 8,
            name: 'Olivia Davis',
            scores: [87, 88, 93, 89, 87],
          },
          {
            id: 9,
            name: 'Daniel Garcia',
            scores: [83, 91, 90, 83, 89],
          },
          {
            id: 10,
            name: 'Isabella Rodriguez',
            scores: [89, 84, 86, 91, 90],
          },
          {
            id: 11,
            name: 'Liam Martinez',
            scores: [92, 80, 84, 93, 88],
          },
          {
            id: 12,
            name: 'Mia Wilson',
            scores: [80, 86, 92, 84, 91],
          },
          {
            id: 13,
            name: 'Alexander Thompson',
            scores: [86, 79, 87, 88, 93],
          },
          {
            id: 14,
            name: 'Charlotte Harris',
            scores: [81, 87, 85, 90, 89],
          },
          {
            id: 15,
            name: 'Benjamin Scott',
            scores: [88, 81, 83, 87, 92],
          },
        ],
      },
      live_assessment: {
        type: 'Live Assessment',
        tasks: [
          'User story',
          'Sprints',
          'Has-a inheritence',
          'To-do list',
          'IAM policy',
        ],
        taskWiseScores: [
          { id: 1, name: 'John Doe', scores: [91, 85, 87, 80, 92] },
          { id: 2, name: 'Jane Smith', scores: [85, 88, 91, 94, 97] },
          {
            id: 3,
            name: 'Michael Johnson',
            scores: [82, 89, 91, 90, 92],
          },
          { id: 4, name: 'Emily Brown', scores: [90, 80, 86, 88, 93] },
          {
            id: 5,
            name: 'William Wilson',
            scores: [84, 90, 94, 88, 89],
          },
          {
            id: 6,
            name: 'Sophia Martinez',
            scores: [92, 84, 89, 94, 96],
          },
          {
            id: 7,
            name: 'James Thompson',
            scores: [87, 91, 90, 85, 93],
          },
          { id: 8, name: 'Olivia Davis', scores: [89, 90, 95, 92, 88] },
          {
            id: 9,
            name: 'Daniel Garcia',
            scores: [85, 92, 91, 84, 90],
          },
          {
            id: 10,
            name: 'Isabella Rodriguez',
            scores: [90, 87, 88, 94, 91],
          },
          {
            id: 11,
            name: 'Liam Martinez',
            scores: [95, 82, 87, 95, 89],
          },
          { id: 12, name: 'Mia Wilson', scores: [82, 88, 94, 86, 92] },
          {
            id: 13,
            name: 'Alexander Thompson',
            scores: [89, 81, 88, 90, 95],
          },
          {
            id: 14,
            name: 'Charlotte Harris',
            scores: [85, 90, 88, 92, 90],
          },
          {
            id: 15,
            name: 'Benjamin Scott',
            scores: [90, 85, 86, 90, 95],
          },
        ],
      },
    };
    return of(categoryWiseScore);
  }
}
