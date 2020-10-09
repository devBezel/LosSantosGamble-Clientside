import { Item } from './Item';

export interface SmartphoneMessageModel {
    id: number;
    getterNumber: number;
    cellphoneId: number;
    cellphone: Item;
    message: string;
    date: Date;
    isRead: boolean;
}
