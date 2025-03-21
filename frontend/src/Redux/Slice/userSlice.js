import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: null,
  reducers: {
    setUser: (state, action) => action.payload,
    logoutUser: () => null,
  },
});

export const { setUser, logoutUser } = userSlice.actions;
export default userSlice.reducer;
