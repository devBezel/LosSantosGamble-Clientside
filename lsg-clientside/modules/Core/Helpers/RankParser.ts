export class RankParser {
    public static parse(accountRank: number) {
        let rank = '';
        switch (accountRank) {
            case 0:
                rank = 'Gracz';
                break;
            case 1:
                rank = '~y~Betatester~s~';
                break;
            case 2:
                rank = '~b~Supporter~s~';
                break;
            case 3:
                rank = '~g~Community Manager~s~';
                break;
            case 4:
                rank = '~p~Developer~s~';
            case 5:
                rank = '~r~Administrator~s~';
            default:
                break;
        }
        return rank;

    }
}
