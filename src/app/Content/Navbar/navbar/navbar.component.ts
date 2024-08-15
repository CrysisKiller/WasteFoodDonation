import { Component, inject, OnInit, Renderer2 } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe, NgIf } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router, RouterLink, RouterOutlet } from '@angular/router';
import { MatMenuModule } from '@angular/material/menu';
import { AuthService } from '../../../Services/AuthServices/auth.service';
import { PortfolioService } from '../../../Services/PortfolioService/portfolio.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    MatMenuModule,
    RouterLink,
    NgIf,
  ],
})
export class NavbarComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private portfolioService = inject(PortfolioService);
  private renderer = inject(Renderer2);
  private service = inject(AuthService);
  private route = inject (Router);
  light: boolean = false;
  dark: boolean = false;
  loading=false;


  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  ngOnInit(): void {
    const savedTheme = localStorage.getItem('theme') || 'light';
    this.light=true;
    this.setTheme(savedTheme);
    this.portfolioService.loading$.subscribe(isloading => {
      this.loading = isloading;
    });
  }

  setTheme(theme: string): void {
    localStorage.setItem('theme', theme);
    this.renderer.removeClass(document.body, 'light-theme');
    this.renderer.removeClass(document.body, 'dark-theme');

    switch (theme) {
      case 'Light':
        this.renderer.addClass(document.body, 'light-theme');
        this.light = true;
        this.dark = false;
        break;
      case 'Dark':
        this.renderer.addClass(document.body, 'dark-theme');
        this.dark = true;
        this.light = false;
        break;
    }
  }

  Logout():void{
    this.service.logout();
    this.route.navigateByUrl("/login");
  }
}

