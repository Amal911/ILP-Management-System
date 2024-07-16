import { Component } from '@angular/core';
import { ListingCardComponent } from "../../components/batch-listing-card/batch-listing-card.component";
import { ButtonComponent } from "../../components/button/button.component";
import { Router } from '@angular/router';

@Component({
    selector: 'app-batch-listing',
    standalone: true,
    templateUrl: './batch-listing.component.html',
    styleUrl: './batch-listing.component.scss',
    imports: [ListingCardComponent, ButtonComponent]
})
export class BatchListingComponent {
  Batches = [
    {
      id:1,
      batch_name: 'ILP Batch 03',
      batch_strength: '39',
      batch_type_name: 'Developer batch',
      is_active: false,
    },
    {
      id:2,
      cardMainIconSRC: 'assets/Vector.svg',
      batch_name: 'ILP Batch 02',
      batch_strength: '30',
      batch_type_name: 'BA batch',
      is_active: true,
    },
    {
      id:3,
      cardMainIconSRC: 'assets/Vector.svg',
      batch_name: 'ILP Batch 01',
      batch_strength: '33',
      batch_type_name: 'Developer batch',
      is_active: false,
    },
    {
      id:4,
      cardMainIconSRC: 'assets/Vector.svg',
      batch_name: 'ILP Batch 03',
      batch_strength: '31',
      batch_type_name: 'BA batch',
      is_active: true,
    },
    {
      id:5,
      cardMainIconSRC: 'assets/Vector.svg',
      batch_name: 'ILP Batch 02',
      batch_strength: '34',
      batch_type_name: 'Developer batch',
      is_active: false,
    },
    {
      id:6,
      cardMainIconSRC: 'assets/Vector.svg',
      batch_name: 'ILP Batch 01',
      batch_strength: '12',
      batch_type_name: 'BA batch',
      is_active: true,
    },
    {
      id:7,
      cardMainIconSRC: 'assets/Vector.svg',
      batch_name: 'ILP Batch 02',
      batch_strength: '34',
      batch_type_name: 'Developer batch',
      is_active: false,
    },
    {
      id:8,
      cardMainIconSRC: 'assets/Vector.svg',
      batch_name: 'ILP Batch 01',
      batch_strength: '39',
      batch_type_name: 'Developer batch',
      is_active: true,
    }
  ];
  constructor(private router: Router) {}
  navigateToManageBatch() {
    this.router.navigate(['leave']);
  }
  navigateToCreateNew(){
    this.router.navigate(['assessments/create']);
  }

}
