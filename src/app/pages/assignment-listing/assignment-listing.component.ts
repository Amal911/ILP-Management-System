import { Component } from '@angular/core';
import { ButtonComponent } from "../../components/button/button.component";
import { ListingCardComponent } from "../../components/listing-card/listing-card.component";
import { DropdownComponent } from "../../components/dropdown/dropdown.component";

@Component({
    selector: 'app-assignment-listing',
    standalone: true,
    templateUrl: './assignment-listing.component.html',
    styleUrl: './assignment-listing.component.scss',
    imports: [ButtonComponent, ListingCardComponent, DropdownComponent]
})
export class AssignmentListingComponent {

}
