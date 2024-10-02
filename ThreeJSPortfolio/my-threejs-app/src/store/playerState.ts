import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface PlayerState {
  status: string;
}

const initialState: PlayerState = {
  status: "idle",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<string>) => {
      state.status = action.payload;
    },
  },
});

export const { setStatus } = playerSlice.actions;

export default playerSlice.reducer;
