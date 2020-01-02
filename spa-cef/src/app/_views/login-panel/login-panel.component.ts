import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { NotifyService } from 'src/app/_services/notify.service';

@Component({
  selector: 'app-login-panel',
  templateUrl: './login-panel.component.html',
  styleUrls: ['./login-panel.component.css']
})
export class LoginPanelComponent implements OnInit {

  model: any = {};

  constructor(private authService: AuthService, private router: Router, private notify: NotifyService) { }

  ngOnInit() {
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
      this.notify.success('Zalogowano poprawnie!', 'Wybierz swoją postać, aby wejść do gry');
    }, error => {
      console.log(error);
      this.notify.error('Wystąpił bląd!', 'Spróbuj wpisać inny login lub hasło.');
    }, () => {
      this.router.navigate(['/characters']);
    });
  }

}
