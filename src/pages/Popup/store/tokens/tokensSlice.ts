import { createSlice, createAsyncThunk , PayloadAction} from '@reduxjs/toolkit';
import axios from 'axios';

export interface Token {
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

  interface TokenState {
    totalBalance: number;
    tokens: Token[];
  }

  const initialState: TokenState = {
    totalBalance: 0.00,
    tokens: [],
  };


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
    initialState: initialState,
    reducers: {},
    extraReducers: (builder) => {
      builder.addCase(fetchTokens.fulfilled, (state, action: PayloadAction<Token[]>) => {
        state.tokens = action.payload;
  
        // Calculate totalBalance based on token values. 
        // Make sure to adjust this to match how your token values are represented.
        // const total = action.payload.reduce((acc, token) => acc + parseFloat(token.value), 0);
        const total = state.totalBalance + 1.547
        state.totalBalance = parseFloat(total.toFixed(2));  // Convert to string with two decimal places.
      });
    },
})

export default tokensSlice.reducer;