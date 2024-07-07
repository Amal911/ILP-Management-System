import { Component } from '@angular/core';
import { ScheduleOperationsComponent } from "../../components/schedule-operations/schedule-operations.component";

@Component({
    selector: 'app-create-schedule',
    standalone: true,
    templateUrl: './create-schedule.component.html',
    styleUrl: './create-schedule.component.scss',
    imports: [ScheduleOperationsComponent]
})
export class CreateScheduleComponent {

}
