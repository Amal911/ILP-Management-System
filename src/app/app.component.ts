import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateScheduleComponent } from "./pages/create-schedule/create-schedule.component";
import { EvaluateAssessmentsComponent } from "./pages/evaluate-assessments/evaluate-assessments.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CreateScheduleComponent, EvaluateAssessmentsComponent]
})
export class AppComponent {
  title = 'ilp-management-system';
}
