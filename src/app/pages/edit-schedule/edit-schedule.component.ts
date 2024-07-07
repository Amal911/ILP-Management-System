import { Component } from '@angular/core';
import { ScheduleOperationsComponent } from "../../components/schedule-operations/schedule-operations.component";

@Component({
    selector: 'app-edit-schedule',
    standalone: true,
    templateUrl: './edit-schedule.component.html',
    styleUrl: './edit-schedule.component.scss',
    imports: [ScheduleOperationsComponent]
})
export class EditScheduleComponent {

}
