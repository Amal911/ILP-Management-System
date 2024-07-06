import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [],
  templateUrl: './dropdown.component.html',
  styleUrl: './dropdown.component.scss'
})
export class DropdownComponent {
  @Input() dropdownLabel: string='';
  @Input() firstDropdownElement: string='';
  @Input() secondDropdownElement: string='';
  @Input() thirdDropdownElement: string='';


}
