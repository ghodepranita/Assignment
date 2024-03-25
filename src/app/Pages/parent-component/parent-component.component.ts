import { Component } from '@angular/core';

@Component({
  selector: 'app-parent-component',
  templateUrl: './parent-component.component.html',
  styleUrls: ['./parent-component.component.scss']
})
export class ParentComponentComponent {
  receiveData(data: any) {
    console.log('Received data from child component:', data);
    // Optionally, process the received data
  }
}
