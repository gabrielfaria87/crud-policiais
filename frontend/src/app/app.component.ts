import { Component } from '@angular/core';
import { AppRoutingModule } from "./app-rounting.module";

@Component({
  selector: 'app-root',
  imports: [AppRoutingModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'frontend';
}
