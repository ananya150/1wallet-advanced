import { createSlice } from "@reduxjs/toolkit";
import type {  BigNumberish, BytesLike } from "ethers";
import { AccessListish } from 'ethers/lib/utils.js';
import { createBackgroundAsyncThunk } from "./utils";
import { RootState } from ".";

export type EthersTransactionRequest = {
    to: string;
    from?: string;
    nonce?: BigNumberish;
  
    gasLimit?: BigNumberish;
    gasPrice?: BigNumberish;
  
    data?: BytesLike;
    value?: BigNumberish;
    chainId?: number;
  
    type?: number;
    accessList?: AccessListish;
  
    maxPriorityFeePerGas?: BigNumberish;
    maxFeePerGas?: BigNumberish;
  
    customData?: Record<string, any>;
  };
export type PromiseOrValue<T> = T | Promise<T>;
export type UserOperationStruct = {
    sender: PromiseOrValue<string>;
    nonce: PromiseOrValue<BigNumberish>;
    initCode: PromiseOrValue<BytesLike>;
    callData: PromiseOrValue<BytesLike>;
    callGasLimit: PromiseOrValue<BigNumberish>;
    verificationGasLimit: PromiseOrValue<BigNumberish>;
    preVerificationGas: PromiseOrValue<BigNumberish>;
    maxFeePerGas: PromiseOrValue<BigNumberish>;
    maxPriorityFeePerGas: PromiseOrValue<BigNumberish>;
    paymasterAndData: PromiseOrValue<BytesLike>;
    signature: PromiseOrValue<BytesLike>;
};

export type TransactionState = {
    transactionRequest?: EthersTransactionRequest;
    transactionsRequest?: EthersTransactionRequest[];
    modifiedTransactionRequest?: EthersTransactionRequest;
  
    requestOrigin?: string;
    userOperationRequest?: Partial<UserOperationStruct>;
    unsignedUserOperation?: UserOperationStruct;
  };

export const initialState: TransactionState = {
    transactionsRequest: undefined,
    transactionRequest: undefined,
    userOperationRequest: undefined,
    unsignedUserOperation: undefined,
  };
  

type SigningReducers = {
    sendTransactionRequest: (
      state: TransactionState,
      {
        payload,
      }: {
        payload: {
          transactionRequest: EthersTransactionRequest;
          origin: string;
        };
      }
    ) => TransactionState;
    sendTransactionsRequest: (
      state: TransactionState,
      {
        payload,
      }: {
        payload: {
          transactionsRequest: EthersTransactionRequest[];
          origin: string;
        };
      }
    ) => TransactionState;
    setModifyTransactionRequest: (
      state: TransactionState,
      {
        payload,
      }: {
        payload: EthersTransactionRequest;
      }
    ) => TransactionState;
    sendUserOperationRquest: (
      state: TransactionState,
      { payload }: { payload: UserOperationStruct }
    ) => TransactionState;
    setUnsignedUserOperation: (
      state: TransactionState,
      { payload }: { payload: UserOperationStruct }
    ) => TransactionState;
    clearTransactionState: (state: TransactionState) => TransactionState;
  };
  
const transactionsSlice = createSlice<
    TransactionState,
    SigningReducers,
    'signing'
  >({
    name: 'signing',
    initialState,
    reducers: {
      sendTransactionRequest: (
        state,
        {
          payload: { transactionRequest, origin },
        }: {
          payload: {
            transactionRequest: EthersTransactionRequest;
            origin: string;
          };
        }
      ) => {
        return {
          ...state,
          transactionRequest: transactionRequest,
          requestOrigin: origin,
        };
      },
      sendTransactionsRequest: (
        state,
        {
          payload: { transactionsRequest, origin },
        }: {
          payload: {
            transactionsRequest: EthersTransactionRequest[];
            origin: string;
          };
        }
      ) => {
        return {
          ...state,
          transactionsRequest: transactionsRequest,
          requestOrigin: origin,
        };
      },
      setModifyTransactionRequest: (
        state,
        {
          payload,
        }: {
          payload: EthersTransactionRequest;
        }
      ) => ({
        ...state,
        modifiedTransactionRequest: payload,
      }),
      sendUserOperationRquest: (
        state,
        { payload }: { payload: UserOperationStruct }
      ) => ({
        ...state,
        userOperationRequest: payload,
      }),
      setUnsignedUserOperation: (
        state,
        { payload }: { payload: UserOperationStruct }
      ) => ({
        ...state,
        unsignedUserOperation: payload,
      }),
      clearTransactionState: (state) => ({
        ...state,
        typedDataRequest: undefined,
        signDataRequest: undefined,
        transactionRequest: undefined,
        transactionsRequest: undefined,
        modifiedTransactionRequest: undefined,
        requestOrigin: undefined,
        userOperationRequest: undefined,
        unsignedUserOperation: undefined,
      }),
    },
  });
  
export const {
    sendTransactionRequest,
    sendTransactionsRequest,
    setModifyTransactionRequest,
    sendUserOperationRquest,
    setUnsignedUserOperation,
    clearTransactionState,
  } = transactionsSlice.actions;
  
export default transactionsSlice.reducer;

// TODO replace KeyringService  ProviderBridgeService
class KeyringService {
    public createPassword = (password: any) => {}
    public addAccount = (implementation: any, context: any) => {return ''}
    public personalSign = (activeAccount: string, context: any , pendingSigningDataRequest: any) => {return ''}
    public createUnsignedUserOp = (address: any, transactionRequest: any, context: any) => 
    {
        const a: any = null
        return a
    }
}
class ProviderBridgeService {
    public denyOrRevokePermission = (newPermission: any) => {}
    public grantPermission = (newPermission: any) => {}
    public resolveRequest = (para1?: string, signedMessage?: any) => {}
    public rejectRequest = (para1?: string, para2?: any) => {}
}

export const createUnsignedUserOp = createBackgroundAsyncThunk(
    'transactions/createUnsignedUserOp',
    async (
      { address, context }: { address: string; context?: any },
      { dispatch, extra: { mainServiceManager } }
    ) => {
      const keyringService = mainServiceManager.getService(
        KeyringService.name
      ) as KeyringService;
  
      const state = mainServiceManager.store.getState() as RootState;
      const transactionRequest = state.transactions.transactionRequest;
  
      if (transactionRequest) {
        const userOp = await keyringService.createUnsignedUserOp(
          address,
          transactionRequest,
          context
        );
        dispatch(setUnsignedUserOperation(userOp));
      }
    }
  );
  
export const rejectTransaction = createBackgroundAsyncThunk(
    'transactions/rejectTransaction',
    async (address: string, { dispatch, extra: { mainServiceManager } }) => {
      dispatch(clearTransactionState());
  
      const requestOrigin = (mainServiceManager.store.getState() as RootState)
        .transactions.requestOrigin;
  
      const providerBridgeService = mainServiceManager.getService(
        ProviderBridgeService.name
      ) as ProviderBridgeService;
  
      providerBridgeService.rejectRequest(requestOrigin || '', '');
    }
  );