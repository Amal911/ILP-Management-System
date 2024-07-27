

import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-dropdown',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {
  @Input() dropDownLabel: string = '';
  @Input() dropDownElements: string[] = [];
  @Output() selectionChange = new EventEmitter<string>();
  @Input() isValid:boolean=true;

  selectElement(selectedElement: string) {
    this.dropDownLabel = selectedElement;
    this.selectionChange.emit(selectedElement);  
  }
}
 