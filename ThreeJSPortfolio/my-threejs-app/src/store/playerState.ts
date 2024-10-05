import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type AnimationName = "Idle" | "Walk" | "Run" | "Jump";

interface PlayerState {
  state: AnimationName;
}

const initialState: PlayerState = {
  state: "Idle",
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setPlayerState: (state, action: PayloadAction<AnimationName>) => {
      state.state = action.payload;
    },
  },
});

export const { setPlayerState } = playerSlice.actions;

export default playerSlice.reducer;
