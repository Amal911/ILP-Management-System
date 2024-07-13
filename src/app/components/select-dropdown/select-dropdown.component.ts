import { NgFor } from '@angular/common';
import { Component, Input } from '@angular/core';
import { NgModel } from '@angular/forms';

@Component({
  selector: 'app-select-dropdown',
  standalone: true,
  imports: [NgFor],
  templateUrl: './select-dropdown.component.html',
  styleUrl: './select-dropdown.component.scss'
})
export class SelectDropdownComponent {

  @Input() label: string = '';
  @Input() options: string[] = [];
  @Input() defaultOption: string = 'Choose option';
  @Input() controlId: string = '';

}

