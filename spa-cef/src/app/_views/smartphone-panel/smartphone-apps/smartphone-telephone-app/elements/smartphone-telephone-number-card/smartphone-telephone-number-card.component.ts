import { Component, OnInit } from '@angular/core';
import { AltvService } from 'src/app/_services/altv.service';


@Component({
  selector: 'app-smartphone-telephone-number-card',
  templateUrl: './smartphone-telephone-number-card.component.html',
  styleUrls: ['./smartphone-telephone-number-card.component.css']
})
export class SmartphoneTelephoneNumberCardComponent implements OnInit {

  numbers: { number: any, letters: string }[] = [
    {
      number: 1,
      letters: ''
    },
    {
      number: 2,
      letters: 'ABC'
    },
    {
      number: 3,
      letters: 'DEF'
    },
    {
      number: 4,
      letters: 'GHI'
    },
    {
      number: 5,
      letters: 'JKL'
    },
    {
      number: 6,
      letters: 'MNO'
    },
    {
      number: 7,
      letters: 'PQRS'
    },
    {
      number: 8,
      letters: 'TUV'
    },
    {
      number: 9,
      letters: 'WXYZ'
    },
    {
      number: '*',
      letters: ''
    },
    {
      number: 0,
      letters: '+'
    },
    {
      number: '#',
      letters: ''
    }
  ];

  senderValue = '';

  constructor(private altvService: AltvService) { }


  ngOnInit() {
  }

  calculateNumber(num: number) {
    console.log(this.senderValue);
    this.senderValue += num.toString();
  }

  deleteNumber() {
    this.senderValue = this.senderValue.slice(0, -1);
  }

  call() {
    console.log(this.senderValue);
    this.altvService.emit('smartphone:call', this.senderValue);
  }

}
