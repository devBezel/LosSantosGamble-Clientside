import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AltvService } from './_services/altv.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spa-cef';
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService, private altvService: AltvService, private router: Router, private ngZone: NgZone) {
    this.redirectToPage();
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  redirectToPage() {
    this.altvService.on('change:route', async (routeClient: string) => {
      await this.ngZone.run(async () => await this.router.navigate([routeClient]));
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
