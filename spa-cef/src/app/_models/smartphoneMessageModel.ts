import { Item } from './item';

export interface SmartphoneMessageModel {
    id: number;
    getterNumber: number;
    cellphone: Item;
    cellphoneId: number;
    message: string;
    date: Date;
    isRead: boolean;
}
