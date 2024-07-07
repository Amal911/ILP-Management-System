import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UploadButtonComponent } from "./components/upload-button/upload-button.component";
import { ScheduleOperationsComponent } from "./components/schedule-operations/schedule-operations.component";
import { CreateScheduleComponent } from "./pages/create-schedule/create-schedule.component";
import { EditScheduleComponent } from "./pages/edit-schedule/edit-schedule.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, UploadButtonComponent, ScheduleOperationsComponent, CreateScheduleComponent, EditScheduleComponent]
})
export class AppComponent {
  title = 'ilp-management-system';
}
