import { Token } from "./Popup/store/tokens/tokensSlice";
export type BatchTransactionItem = {
    id: string;
    token: Token;
    to: string;
    amount: string;
}

export const getBtachedTransactions = async() => {
    const {batchTransactions} = await chrome.storage.local.get(['batchTransactions']);
    return batchTransactions;
}

export const addElementToBatch = async (element: BatchTransactionItem) => {
    const {batchTransactions} = await chrome.storage.local.get(['batchTransactions']);
    const newTx = batchTransactions;
    newTx.push(element);
    await chrome.storage.local.set({batchTransactions: newTx});
    return newTx;
}

export const removeElement = async (id: string) => {
    const {batchTransactions} = await chrome.storage.local.get(['batchTransactions']);
    const newTx: BatchTransactionItem[] = batchTransactions;
    const indexToRemove = newTx.findIndex(element => element.id === id);
    if(indexToRemove !== undefined){
        newTx.splice(indexToRemove, 1);
        await chrome.storage.local.set({batchTransactions: newTx});
    }
    return newTx;
}

export const clearAllBatch = async () => {
    const newTxs: BatchTransactionItem[] = []
    await chrome.storage.local.set({batchTransactions: newTxs});
    return newTxs;
}