import { Component, OnInit, Input } from '@angular/core';
import { SmartphoneData } from 'src/app/_models/smartphoneData';
import { SmartphoneMessageModel } from 'src/app/_models/smartphoneMessageModel';
import { SmartphoneContactModel } from 'src/app/_models/smartphoneContactModel';
import { AltvService } from 'src/app/_services/altv.service';

@Component({
  selector: 'app-smartphone-messages-app',
  templateUrl: './smartphone-messages-app.component.html',
  styleUrls: ['./smartphone-messages-app.component.css']
})
export class SmartphoneMessagesAppComponent implements OnInit {

  @Input() smartphoneData: SmartphoneData;

  // Do zmiany później
  currentMessage: { smartphoneId: number, message: SmartphoneMessageModel[], isInContact: any, smartphoneNumberDetail: number };
  isMessageAdding = false;
  getterNumber: any;
  newMessage: any = '';

  constructor(private altvService: AltvService) { }

  ngOnInit() {
  }

  selectMessage(messageView: SmartphoneMessageModel) {
    this.isMessageAdding = false;

    this.currentMessage = { smartphoneId: this.smartphoneData.smartphoneId, message: this.getAllConversationMessages(messageView),
                          isInContact: this.isInContact(messageView.getterNumber),
                            smartphoneNumberDetail: messageView.getterNumber };
  }

  getAllConversationMessages(message: SmartphoneMessageModel) {
    // tslint:disable-next-line:max-line-length
    console.log('ilosc wiadomosci ' + this.smartphoneData.smartphoneMessages.filter(x => x.getterNumber === this.smartphoneData.smartphoneNumber || x.cellphoneId === this.smartphoneData.smartphoneId).length);
    return this.smartphoneData.smartphoneMessages.filter(x => x.getterNumber === this.smartphoneData.smartphoneNumber ||
      x.cellphoneId === this.smartphoneData.smartphoneId);
  }

  isMessageSelected() {
    return this.currentMessage !== undefined ? true : false;
  }

  isInContact(senderNumber: number) {
    const contact = this.smartphoneData.smartphoneContacts.find(x => x.number === senderNumber);

    return contact !== undefined ? contact.name : senderNumber;
  }

  messageDate(date: Date) {
    return `${date.getHours}:${date.getMinutes}`;
  }


  messageList() {
    const messageList = this.uniqByKeepLast(this.smartphoneData.smartphoneMessages, n => n.getterNumber);
    const messageListToReturn = [];
    for (const element of messageList) {
      if (element.getterNumber !== this.smartphoneData.smartphoneNumber) {
        messageListToReturn.push(element);
      }
    }
    return messageListToReturn;
  }

  uniqByKeepLast(data: SmartphoneMessageModel[], key: any) {
    return [
      ...new Map(
        data.map(x => [key(x), x])
      ).values()
    ];
  }

  contactListSearch() {
    const contacts = this.smartphoneData.smartphoneContacts;
    const searchingContacts = [];
    if (this.getterNumber === undefined || this.getterNumber === '') {
      return;
    }
    // tslint:disable-next-line:prefer-for-of
    for (let i = 0; i < contacts.length; i++) {
      if (contacts[i].name.toLowerCase().includes(this.getterNumber)) {
        searchingContacts.push(contacts[i]);
      }
    }

    return searchingContacts;
  }

  selectContactFromSearch(smartphoneContact: SmartphoneContactModel) {
    this.getterNumber = smartphoneContact.number;
  }

  sendNewMessage() {
    console.log('new message: ' + this.newMessage);
    const messageModel = this.messageList().find(x => x.getterNumber === this.getterNumber);
    if (messageModel !== undefined) {

      this.altvService.emit('smartphone:sendMessage', this.smartphoneData.smartphoneId, this.getterNumber,
      this.newMessage);


      this.smartphoneData.smartphoneMessages.push({ id: 0, getterNumber: this.getterNumber, cellphone: null,
                        cellphoneId: this.smartphoneData.smartphoneId, message: this.newMessage,
                        date: new Date(), isRead: false });
      this.newMessage = '';


      this.isMessageAdding = false;
      this.selectMessage(messageModel);
    } else {
      console.log('jest undefined');
    }
  }

}
