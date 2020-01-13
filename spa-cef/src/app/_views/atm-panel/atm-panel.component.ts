import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AltvService } from 'src/app/_services/altv.service';
import { BaseService } from 'src/app/_services/base.service';
import { NotifyService } from 'src/app/_services/notify.service';

@Component({
  selector: 'app-atm-panel',
  templateUrl: './atm-panel.component.html',
  styleUrls: ['./atm-panel.component.css']
})
export class AtmPanelComponent implements OnInit {

  atmForm: FormGroup;

  model: { deposit: number, withdraw: number };
  userAtmInformation: {name: string, surname: string, money: number, bank: number};

  constructor(private formBuilder: FormBuilder, private altvService: AltvService, private baseService: BaseService,
              private notify: NotifyService) { }

  ngOnInit() {
    this.createAtmForm();
    setTimeout(() => {
      this.userAtmInformation = this.baseService.userAtmInformation;
    }, 5);
  }

  createAtmForm() {
    this.atmForm = this.formBuilder.group({
      deposit: [''],
      withdraw: ['']
    });
  }



  next() {
    this.model = Object.assign({}, this.atmForm.value);
    console.log(this.model.deposit);
    if (this.model.deposit === null && this.model.withdraw === null) { return console.log('Musisz wprowadzić wartość do okna'); }

    if (this.model.deposit > 0) {
      if (this.userAtmInformation.money < this.model.deposit) {
        return this.notify.error('', 'Nie masz wystarczająco gotówki przy sobie');
      }

      this.userAtmInformation.money -= this.model.deposit;
      console.log('powiadomienie');
      return this.altvService.emit('cef:atmDeposit', this.model.deposit);
    }

    if (this.model.withdraw > 0) {
      if (this.userAtmInformation.bank < this.model.withdraw) {
        return this.notify.error('', 'Nie masz wystarczająco pieniędzy w banku');
      }
      // tslint:disable-next-line:no-unused-expression
      this.userAtmInformation.bank -= this.model.withdraw;
      return this.altvService.emit('cef:atmWithdraw', this.model.withdraw);
    }

  }
}
