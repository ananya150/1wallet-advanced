type StoreState = any;
type VaultState = any;
type KeyringView = any;
type KeyringViewUserInput = any;


export type ChromeMessages<T> = {
    type:
      | 'keyring/createPassword'
      | 'keyring/locked'
      | 'keyring/unlock'
      | 'keyring/unlocked'
      | 'keyring/vaultUpdate'
      | 'keyring/createKeyringForImplementation'
      | 'keyring/newAccountView'
      | 'keyring/validateKeyringViewInputValue'
      | 'keyring/addAcount';
    data?: T;
  };
  
  export type CreatePasswordChromeMessage = {
    password: string;
  };

  export type UnlockedKeyringChromeMessage = {
    storeState: StoreState;
  };

  export type UnlockKeyringChromeMessage = {
    password: string;
  };

  export type VaultUpdate = {
    vault: VaultState;
  };

  export type CreateKeyringForImplementation = {
    implementation: string;
  };

  export type NewAccountView = {
    implementation: string;
    view: KeyringView | undefined;
  };

  export type ValidateKeyringViewInputValue = {
    implementation: string;
    inputs: Array<any>;
  };

  export type KeyringInputErrorMessage = {
    errors: Array<any>;
  };

  export type AddAcount = {
    implementation: string;
    userInputs: KeyringViewUserInput;
  };

  export const AllowedQueryParamPage = {
    signTransaction: '/sign-transaction',
    dappPermission: '/dapp-permission',
    signData: '/sign-data',
    personalSignData: '/personal-sign',
  } as const;


  export type AllowedQueryParamPageType =
  (typeof AllowedQueryParamPage)[keyof typeof AllowedQueryParamPage];