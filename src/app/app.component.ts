import {Component} from '@angular/core';
declare var device;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  public title = 'eToro-task';
  constructor() {
    document.addEventListener('deviceready', () => {
      console.log(device.platform);
    }, false);
  }
}
