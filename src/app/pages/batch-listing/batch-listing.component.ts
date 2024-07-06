import { Component } from '@angular/core';
import { ListingCardComponent } from "../../components/listing-card/listing-card.component";
import { ButtonComponent } from "../../components/button/button.component";

@Component({
    selector: 'app-batch-listing',
    standalone: true,
    templateUrl: './batch-listing.component.html',
    styleUrl: './batch-listing.component.scss',
    imports: [ListingCardComponent, ButtonComponent]
})
export class BatchListingComponent {

}
