import { Component } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, Event } from '@angular/router';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent,],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'finalv2';

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events.subscribe((event: Event) => {
      if (event instanceof NavigationStart) {
        this.showSplash();
      } else if (event instanceof NavigationEnd) {
        setTimeout(() => {
          this.hideSplash();
        }, 1000); // Efecto visual
      }
    });
  }

  showSplash() {
    if (typeof document !== 'undefined') { 
      const splash = document.getElementById('splash-screen');
      if (splash) {
        splash.classList.remove('splash-hidden');
        splash.classList.add('splash-visible');
      }
    }
  }

  hideSplash() {
    if (typeof document !== 'undefined') { 
      const splash = document.getElementById('splash-screen');
      if (splash) {
        splash.classList.remove('splash-visible');
        splash.classList.add('splash-hidden');
      }
    }
  }
}
