import { Component, OnInit, NgZone } from '@angular/core';
import { AuthService } from './_services/auth.service';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AltvService } from './_services/altv.service';
import { Router } from '@angular/router';
import { NotifyService } from './_services/notify.service';
import { BaseService } from './_services/base.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'spa-cef';
  jwtHelper = new JwtHelperService();
  constructor(private authService: AuthService, private base: BaseService) {
  }

  ngOnInit() {
    const token = localStorage.getItem('token');
    if (token) {
      this.authService.decodedToken = this.jwtHelper.decodeToken(token);
    }
  }

  loggedIn() {
    return this.authService.loggedIn();
  }
}
