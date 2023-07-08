import { createSlice } from "@reduxjs/toolkit";
import { createBackgroundAsyncThunk } from "./utils";

export type PermissionRequest = {
    key: string;
    origin: string;
    faviconUrl: string;
    chainID: string;
    title: string;
    state: 'request' | 'allow' | 'deny';
    accountAddress: string;
  };
  

export type DappPermissionState = {
    permissionRequests: {[origin: string]: PermissionRequest| undefined}
    allowed: {
        evm: {
          [origin_address: string]: PermissionRequest | undefined;
        };
    };
}

export const initialState: DappPermissionState = {
    permissionRequests: {},
    allowed: {
      evm: {},
    },
  };

type DappPermissionReducers = {
    requestPermission: (
      state: DappPermissionState,
      { payload }: { payload: PermissionRequest }
    ) => DappPermissionState;
    grantPermission: (
      state: DappPermissionState,
      { payload }: { payload: PermissionRequest }
    ) => DappPermissionState;
    permissionDenyOrRevoke: (
      state: DappPermissionState,
      { payload }: { payload: PermissionRequest }
    ) => DappPermissionState;
  };

const dappPermissionSlice = createSlice<
  DappPermissionState,
  DappPermissionReducers,
  'dapp-permission'
>({
    name: 'dapp-permission',
    initialState,
    reducers: {
        requestPermission: (state, { payload: permissionRequest }) => {
            return {
              ...state,
              permissionRequests: {
                ...state.permissionRequests,
                [permissionRequest.origin]: { ...permissionRequest },
              },
            };
          },
        grantPermission: (state, { payload: permission }) => {
            return {
              ...state,
              permissionRequests: {
                ...state.permissionRequests,
                [permission.origin]: undefined,
              },
              allowed: {
                evm: {
                  ...state.allowed.evm,
                  [`${permission.origin}_${permission.accountAddress}`]: permission,
                },
              },
            };
          },
        permissionDenyOrRevoke: (state, { payload: permission }) => {
            const permissionRequests = {
              ...state.permissionRequests,
            };
            delete permissionRequests[permission.origin];
      
            const allowed = {
              evm: {
                ...state.allowed.evm,
              },
            };
      
            delete allowed.evm[`${permission.origin}_${permission.accountAddress}`];
      
            return {
              ...state,
              permissionRequests: {
                ...permissionRequests,
              },
              allowed: {
                ...allowed,
              },
            };
          },
    }
})

export const { requestPermission } = dappPermissionSlice.actions;
export default dappPermissionSlice.reducer;

// TODO import ProviderBridgeService

class ProviderBridgeService {
    public denyOrRevokePermission = (newPermission: any) => {}
    public grantPermission = (newPermission: any) => {}
}

export const denyOrRevokePermission = createBackgroundAsyncThunk(
    'dapp-permission/denyOrRevokePermission',
    async (
      permission: PermissionRequest,
      { dispatch, extra: { mainServiceManager } }
    ) => {
      const newPermission: PermissionRequest = {
        ...permission,
        state: 'deny',
      };
  
      dispatch(dappPermissionSlice.actions.permissionDenyOrRevoke(newPermission));
      const providerBridgeService = mainServiceManager.getService(
        ProviderBridgeService.name
      ) as ProviderBridgeService;
  
      providerBridgeService.denyOrRevokePermission(newPermission);
    }
  );

// Async thunk to bubble the permissionGrant action from  store to emitter.
export const grantPermission = createBackgroundAsyncThunk(
    'dapp-permission/permissionGrant',
    async (
      permission: PermissionRequest,
      { dispatch, extra: { mainServiceManager } }
    ) => {
      const newPermission: PermissionRequest = {
        ...permission,
        state: 'allow',
      };
      dispatch(dappPermissionSlice.actions.grantPermission(newPermission));
      const providerBridgeService = mainServiceManager.getService(
        ProviderBridgeService.name
      ) as ProviderBridgeService;
  
      providerBridgeService.grantPermission(newPermission);
    }
  );