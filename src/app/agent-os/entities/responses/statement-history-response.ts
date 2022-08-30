import { StatementHistory } from '../dtos/statement-history';

export class StatementHistoryResponse {
    statementHistory: Array<StatementHistory> = new Array<StatementHistory>();

    constructor(data: any) {
        Object.assign(this, data);
    }
}
