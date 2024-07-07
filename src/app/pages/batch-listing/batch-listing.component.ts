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
  batches = [
    {
      cardMainIconSRC: 'assets/Vector.svg',
      cardMainTitle: 'ILP Batch 03',
      cardFirstSubTitle: '39 trainees',
      cardSecondSubTitle: 'Developer batch',
      cardLeftText: 'Active',
      cardStatusFlag: 'green',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Vector.svg',
      cardMainTitle: 'ILP Batch 02',
      cardFirstSubTitle: '30 trainees',
      cardSecondSubTitle: 'BA batch',
      cardLeftText: 'Active',
      cardStatusFlag: 'green',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Vector.svg',
      cardMainTitle: 'ILP Batch 01',
      cardFirstSubTitle: '33 trainees',
      cardSecondSubTitle: 'Developer batch',
      cardLeftText: 'Completed',
      cardStatusFlag: 'red',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Vector.svg',
      cardMainTitle: 'ILP Batch 03',
      cardFirstSubTitle: '31 trainees',
      cardSecondSubTitle: 'BA batch',
      cardLeftText: 'Completed',
      cardStatusFlag: 'red',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Vector.svg',
      cardMainTitle: 'ILP Batch 02',
      cardFirstSubTitle: '34 trainees',
      cardSecondSubTitle: 'Developer batch',
      cardLeftText: 'Active',
      cardStatusFlag: 'green',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Vector.svg',
      cardMainTitle: 'ILP Batch 01',
      cardFirstSubTitle: '12 trainees',
      cardSecondSubTitle: 'BA batch',
      cardLeftText: 'Completed',
      cardStatusFlag: 'red',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Vector.svg',
      cardMainTitle: 'ILP Batch 02',
      cardFirstSubTitle: '34 trainees',
      cardSecondSubTitle: 'Developer batch',
      cardLeftText: 'Completed',
      cardStatusFlag: 'red',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Vector.svg',
      cardMainTitle: 'ILP Batch 01',
      cardFirstSubTitle: '39 trainees',
      cardSecondSubTitle: 'Developer batch',
      cardLeftText: 'Completed',
      cardStatusFlag: 'red',
      cardLeftIcon: 'bi bi-circle-fill'
    }
  ];

}
