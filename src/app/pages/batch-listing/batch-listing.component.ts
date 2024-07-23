import { Component } from '@angular/core';
import { ListingCardComponent } from "../../components/batch-listing-card/batch-listing-card.component";
import { ButtonComponent } from "../../components/button/button.component";
import { Router } from '@angular/router';
import { BatchListingService } from '../../services/API/batch-listing.service';

@Component({
    selector: 'app-batch-listing',
    standalone: true,
    templateUrl: './batch-listing.component.html',
    styleUrl: './batch-listing.component.scss',
    imports: [ListingCardComponent, ButtonComponent]
})
export class BatchListingComponent {
  Batches:any[] = [];
  constructor(private router: Router,private batchListingService:BatchListingService) {}
  ngOnInit(): void {
      this.loadBatch();
  }
  loadBatch(): void {
    this.batchListingService.getBatches().subscribe(data => {
      this.Batches = data;
    },
    error =>{console.error('Error:', error)}
  );
  }
  navigateToManageBatch(batchId: number): void {
    this.router.navigate([`batches/manage/${batchId}`]);
  }
  navigateToCreateNew(){
    this.router.navigate(['batches/create']);
  }

}
