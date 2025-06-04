import {Component, EventEmitter, Output} from '@angular/core';
import {MatIcon} from '@angular/material/icon';

@Component({
  selector: 'app-popup-helper',
  imports: [
    MatIcon
  ],
  templateUrl: './popup-helper.component.html',
  styleUrl: './popup-helper.component.css'
})
export class PopupHelperComponent {

  constructor() {}

  @Output() close = new EventEmitter<void>();

  closePopup() {
    this.close.emit();
  }

}
