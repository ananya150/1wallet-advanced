import { createSelector } from '@reduxjs/toolkit';
type RootState = any;

const getNetworkState = (state: RootState) => state.network;

export const getActiveNetwork = createSelector(
  getNetworkState,
  (network) => network.activeNetwork
);

export const getSupportedNetworks = createSelector(
  getNetworkState,
  (network) => network.supportedNetworks
);
