import { Component } from '@angular/core';
import { DropdownComponent } from "../../components/dropdown/dropdown.component";
import { ButtonComponent } from "../../components/button/button.component";
import { ListingCardComponent } from "../../components/listing-card/listing-card.component";

@Component({
    selector: 'app-leave-request',
    standalone: true,
    templateUrl: './leave-request.component.html',
    styleUrl: './leave-request.component.scss',
    imports: [DropdownComponent, ButtonComponent, ListingCardComponent]
})
export class LeaveRequestComponent {
}
