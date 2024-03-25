import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-child-component',
  templateUrl: './child-component.component.html',
  styleUrls: ['./child-component.component.scss']
})
export class ChildComponentComponent {
  @Output() childEvent = new EventEmitter<any>();

  sendDataToParent() {
    const data = 'Some data from child component';
    this.childEvent.emit(data);
    alert(data);
  }
}
