import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CreateBatchComponent } from "./pages/create-batch/create-batch.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, CreateBatchComponent]
})
export class AppComponent {
  title = 'ilp-management-system';
}
