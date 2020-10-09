import { Component, OnInit, Input, HostListener, ElementRef, QueryList, ViewChildren, AfterViewInit, ViewChild } from '@angular/core';
import { SmartphoneMessageModel } from 'src/app/_models/smartphoneMessageModel';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-smartphone-message-detail-app',
  templateUrl: './smartphone-message-detail-app.component.html',
  styleUrls: ['./smartphone-message-detail-app.component.css']
})
export class SmartphoneMessageDetailAppComponent implements OnInit, AfterViewInit  {

  constructor(private altvService: AltvService) {
  }

  messageToSend: string;
  // messagesToReturn = [];

  // tslint:disable-next-line:max-line-length
  @Input() currentMessage: { smartphoneId: number, message: SmartphoneMessageModel[], isInContact: any, smartphoneNumberDetail: number, messageToAdd: string };

  @ViewChildren('messageContainer') messageContainers: QueryList<ElementRef>;
  @ViewChild('window', { static: false }) window;

  ngOnInit() {

  }

  // tslint:disable-next-line:use-lifecycle-interface
  ngAfterViewInit() {
    this.scrollToBottom(); // For messsages already present
    this.messageContainers.changes.subscribe((list: QueryList<ElementRef>) => {
      this.scrollToBottom(); // For messages added later
    });
}

  isMessageOwner(message: SmartphoneMessageModel) {
    return message.cellphoneId === this.currentMessage.smartphoneId ? true : false;
  }

  messageList() {
    // this.messagesToReturn = [];
    const messagesToReturn = [];
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < this.currentMessage.message.length; i++) {
      if (!this.isMessageOwner(this.currentMessage.message[i])) {
        if (this.currentMessage.message[i].cellphone.secondParameter === this.currentMessage.smartphoneNumberDetail) {
          messagesToReturn.push(this.currentMessage.message[i]);
        }
      } else {
        if (this.currentMessage.message[i].getterNumber === this.currentMessage.smartphoneNumberDetail) {
         messagesToReturn.push(this.currentMessage.message[i]);
        }
      }
    }

    messagesToReturn.sort((a: SmartphoneMessageModel, b: SmartphoneMessageModel) => {
        const dateA = new Date(a.date);
        const dateB = new Date(b.date);

        return dateA.getTime() - dateB.getTime();
    });
    return messagesToReturn;
  }

  sendMessage() {
    // id: number;
    // getterNumber: number;
    // cellphone: Item;
    // cellphoneId: number;
    // message: string;
    // date: Date;
    // isRead: boolean;
    this.altvService.emit('smartphone:sendMessage', this.currentMessage.smartphoneId, this.currentMessage.smartphoneNumberDetail,
                          this.messageToSend);

    this.currentMessage.message.push({ id: 0, getterNumber: this.currentMessage.smartphoneNumberDetail, cellphone: null,
                                      cellphoneId: this.currentMessage.smartphoneId, message: this.messageToSend,
                                      date: new Date(), isRead: false });
    this.messageToSend = '';
  }

  @HostListener('document:keyup', ['$event'])
  handleDeleteKeyboardEvent(event: KeyboardEvent) {
    if (event.key === 'Enter' && this.messageToSend !== undefined) {
      this.sendMessage();
    }
  }

  scrollToBottom() {
    try {
      console.log('scrollToBottom called');
      this.window.nativeElement.top = this.window.nativeElement.scrollHeight;
    } catch (err) {}
  }


}
