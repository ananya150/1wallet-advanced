export type BatchTransactionItem = {
    timestamp: string;
    label: string;
    to: string;
    amount: string;
    data: string;
}

export class TransactionBatch {
    public transactions: BatchTransactionItem[];

    constructor ()  {
        this.transactions = [];
    }

    public init = async () => {
        const {batchTransactions} = await chrome.storage.local.get(['batchTransactions']);
        this.transactions = batchTransactions;
        return this.transactions;
    }

    public addElement = async(element: BatchTransactionItem) => {
        this.transactions.push(element);
        await chrome.storage.local.set({batchTransactions: this.transactions});
        return this.transactions;
    }

    public removeIndex = async (index: number) => {
        if (index >= 0 && index < this.transactions.length) {
            this.transactions.splice(index, 1);
            await chrome.storage.local.set({batchTransactions: this.transactions});
        }
        return this.transactions;
    }

    public moveIndex = async (fromIndex: number, toIndex: number) => {
        if (fromIndex >= 0 && fromIndex < this.transactions.length && toIndex >= 0 && toIndex < this.transactions.length) {
            const element = this.transactions.splice(fromIndex, 1)[0];
            this.transactions.splice(toIndex, 0, element);
            await chrome.storage.local.set({batchTransactions: this.transactions});
        }
        return this.transactions;
    }
}