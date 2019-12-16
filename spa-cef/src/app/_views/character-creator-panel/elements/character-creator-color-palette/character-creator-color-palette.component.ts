import { Component, OnInit } from '@angular/core';
import { ColorPalette } from 'src/app/_models/colorPalette';

@Component({
  selector: 'app-character-creator-color-palette',
  templateUrl: './character-creator-color-palette.component.html',
  styleUrls: ['./character-creator-color-palette.component.css']
})
export class CharacterCreatorColorPaletteComponent implements OnInit {

  constructor() { }

  colors: ColorPalette[] = [
    {
      colorId: 0,
      colorHex: '#0c0c0f'
    },
    {
      colorId: 1,
      colorHex: '#372f28'
    },
    {
      colorId: 2,
      colorHex: '#48372d'
    },
    {
      colorId: 3,
      colorHex: '#5e3526'
    },
    {
      colorId: 4,
      colorHex: '#7b3a1f'
    },
    {
      colorId: 5,
      colorHex: '#904221'
    },
    {
      colorId: 6,
      colorHex: '#a55a33'
    },
    {
      colorId: 7,
      colorHex: '#ad6e47'
    },
    {
      colorId: 8,
      colorHex: '#b98056'
    },
    {
      colorId: 9,
      colorHex: '#a97851'
    },
    {
      colorId: 10,
      colorHex: '#c39866'
    },
    {
      colorId: 11,
      colorHex: '#cda872'
    },
    {
      colorId: 12,
      colorHex: '#ceaa73'
    },
    {
      colorId: 16,
      colorHex: '#c99663'
    },
    {
      colorId: 16,
      colorHex: '#c99663'
    },
    {
      colorId: 17,
      colorHex: '#9b5637'
    },
    {
      colorId: 18,
      colorHex: '#8a3121'
    },
    {
      colorId: 19,
      colorHex: '#6f1210'
    },
    {
      colorId: 20,
      colorHex: '#8f1611'
    },
    {
      colorId: 21,
      colorHex: '#a51c15'
    },
    {
      colorId: 22,
      colorHex: '#e04823'
    },
    {
      colorId: 23,
      colorHex: '#e64e1e'
    },
    {
      colorId: 24,
      colorHex: '#d06437'
    },
    {
      colorId: 25,
      colorHex: '#dc5726'
    },
    {
      colorId: 26,
      colorHex: '#8a7160'
    },
    {
      colorId: 27,
      colorHex: '#967e6c'
    },
    {
      colorId: 28,
      colorHex: '#dfc8b4'
    },
    {
      colorId: 29,
      colorHex: '#efdccb'
    },
    {
      colorId: 30,
      colorHex: '#785163'
    },
    {
      colorId: 31,
      colorHex: '#844f67'
    },
    {
      colorId: 32,
      colorHex: '#a54464'
    },
    {
      colorId: 33,
      colorHex: '#fd41d2'
    },
    {
      colorId: 34,
      colorHex: '#ff4895'
    },
    {
      colorId: 35,
      colorHex: '#feabb6'
    },
    {
      colorId: 36,
      colorHex: '#088b80'
    },
    {
      colorId: 37,
      colorHex: '#08838f'
    },
    {
      colorId: 38,
      colorHex: '#084c7b'
    },
    {
      colorId: 39,
      colorHex: '#78bc71'
    },
    {
      colorId: 40,
      colorHex: '#2e8b5a'
    },
    {
      colorId: 41,
      colorHex: '#1b5e50'
    },
    {
      colorId: 42,
      colorHex: '#bfc52d'
    },
    {
      colorId: 43,
      colorHex: '#a1bc13'
    },
    {
      colorId: 44,
      colorHex: '#5ca524'
    },
    {
      colorId: 45,
      colorHex: '#e9bd56'
    },
    {
      colorId: 46,
      colorHex: '#f7c80e'
    },
    {
      colorId: 47,
      colorHex: '#ef9d0f'
    },
    {
      colorId: 48,
      colorHex: '#f87d0f'
    },
    {
      colorId: 49,
      colorHex: '#f2721f'
    },
    {
      colorId: 50,
      colorHex: '#f75911'
    },
    {
      colorId: 51,
      colorHex: '#f95c23'
    },
    {
      colorId: 52,
      colorHex: '#ed3010'
    },
    {
      colorId: 53,
      colorHex: '#d00c0f'
    },
    {
      colorId: 54,
      colorHex: '#a70a0e'
    },
    {
      colorId: 55,
      colorHex: '#231612'
    },
    {
      colorId: 56,
      colorHex: '#4b2c21'
    },
    {
      colorId: 57,
      colorHex: '#562e1f'
    },
    {
      colorId: 58,
      colorHex: '#47271c'
    },
    {
      colorId: 59,
      colorHex: '#502e20'
    },
    {
      colorId: 60,
      colorHex: '#2f1c16'
    },
    {
      colorId: 61,
      colorHex: '#08090e'
    },
    {
      colorId: 62,
      colorHex: '#a9855b'
    },
    {
      colorId: 63,
      colorHex: '#ecceab'
    }

  ];

  ngOnInit() {
  }

}
