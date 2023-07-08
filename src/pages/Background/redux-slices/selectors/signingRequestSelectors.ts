import { createSelector } from '@reduxjs/toolkit';
type RootState = any;

const getSigningState = (state: RootState) => state.signing;

export const selectCurrentPendingSignDataRequest = createSelector(
  getSigningState,
  (signing) => {
    return signing.signDataRequest;
  }
);
