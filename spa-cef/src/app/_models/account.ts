import { AccountPremium } from './accountPremium';

export interface Account {
    id: number;
    username: string;
    rank: number;
    accountPremium: AccountPremium;
}
