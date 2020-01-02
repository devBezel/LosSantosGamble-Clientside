import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class NotifyService {

  audio = new Audio();

  constructor(private toastrService: ToastrService) { }

  success(title: string, message: string) {
    this.toastrService.success(message, title);
    this.playAudio('success.mp3');
  }

  error(title: string, message: string) {
    this.toastrService.error(message, title);
    this.playAudio('success.mp3');
  }

  playAudio(audioName: string) {
    this.audio.src = '../../assets/sounds/notify/' + audioName;
    this.audio.load();
    this.audio.play();
  }
}
