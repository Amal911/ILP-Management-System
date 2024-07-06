import { LeaveRequestComponent } from './pages/leave-request/leave-request.component';
import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ButtonComponent } from "./components/button/button.component";
import { ListingCardComponent } from "./components/listing-card/listing-card.component";
import { BatchListingComponent } from "./pages/batch-listing/batch-listing.component";
import { AssignmentListingComponent } from "./pages/assignment-listing/assignment-listing.component";
import { DropdownComponent } from "./components/dropdown/dropdown.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, ButtonComponent, ListingCardComponent, BatchListingComponent, AssignmentListingComponent, DropdownComponent,LeaveRequestComponent],
    schemas:[CUSTOM_ELEMENTS_SCHEMA]
})
export class AppComponent {
  title = 'ilp-management-system';
}
