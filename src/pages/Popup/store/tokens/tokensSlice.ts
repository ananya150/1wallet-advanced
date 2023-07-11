import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface Token {
    contract_decimals: number;
    contract_name: string;
    contract_ticker_symbol: string;
    contract_address: string;
    logo_url: string;
    last_transferred_at: any;
    native_token: boolean;
    type: string;
    is_spam: boolean;
    balance: string;
    quote_rate: any;
    quote: any;
    pretty_quote: any;
  }


  export const fetchTokens = createAsyncThunk(
    'tokens/fetchTokens',
    async (walletAddress: string) => {
      const response = await axios.get(`https://api.covalenthq.com/v1/matic-mumbai/address/${walletAddress}/balances_v2/?key=cqt_rQTwHfPHR84KHTYbX7Xkmy7Cc4Gk`);
      console.log("data is ",response.data.data.items)
      return response.data.data.items;  // This gets passed as `action.payload`
    }
  );
  

export const tokensSlice = createSlice({
    name: 'tokens',
    initialState: [],
    reducers: {},
    extraReducers: builder => {
      builder.addCase(fetchTokens.fulfilled, (state, action) => {
        return action.payload;  // `action.payload` contains the response data
      });
    }
})

export default tokensSlice.reducer;