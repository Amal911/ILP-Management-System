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
  pendingLeaveRequests = [
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      cardMainTitle: 'Amal E A',
      cardSmallSubTitle: 'ILP Batch 03 2023-24',
      cardFirstSubTitle: 'Sick leave',
      cardSecondSubTitle: 'Requested for 14 May',
      cardLeftText: 'Trainer Approved',
      cardStatusFlag: 'green',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      cardMainTitle: 'Devipriya MS',
      cardSmallSubTitle: 'ILP Batch 03 2023-24',
      cardFirstSubTitle: 'Sick leave',
      cardSecondSubTitle: 'Requested for 10 May',
      cardLeftText: 'Trainer Approved',
      cardStatusFlag: 'green',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      cardMainTitle: 'Reshmi M',
      cardSmallSubTitle: 'ILP Batch 03 2023-24',
      cardFirstSubTitle: 'Sick leave',
      cardSecondSubTitle: 'Requested for 7 May',
      cardLeftText: 'Trainer Rejected',
      cardStatusFlag: 'red',
      cardLeftIcon: 'bi bi-circle-fill'
    }
  ];

  leaveRequestHistory = [
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      cardMainTitle: 'Amal E A',
      cardSmallSubTitle: 'ILP Batch 03 2023-24',
      cardFirstSubTitle: '20 June 2024',
      cardSecondSubTitle: 'Due by 11:00 PM 23 June 2024',
      cardLeftText: 'Trainer Approved',
      cardStatusFlag: 'green',
      cardLeftIcon: 'bi bi-circle-fill',
      getLeftIconColor: ('green')
    },
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      cardMainTitle: 'Devipriya MS',
      cardSmallSubTitle: 'ILP Batch 03 2023-24',
      cardFirstSubTitle: '18 June 2024',
      cardSecondSubTitle: 'Due by 11:00 PM 20 June 2024',
      cardLeftText: 'Trainer Rejected',
      cardStatusFlag: 'red',
      cardLeftIcon: 'bi bi-circle-fill'
    },
    {
      cardMainIconSRC: 'assets/Leave-request.svg',
      cardMainTitle: 'Reshmi M',
      cardSmallSubTitle: 'ILP Batch 03 2023-24',
      cardFirstSubTitle: '1 June 2024',
      cardSecondSubTitle: 'Due by 11:00 PM 13 June 2024',
      cardLeftText: 'Trainer Rejected',
      cardStatusFlag: 'red',
      cardLeftIcon: 'bi bi-circle-fill'
    }
  ];
}
