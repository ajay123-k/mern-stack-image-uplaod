import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./Slice/userSlice";
import tokenReducer from "./Slice/tokenSlice";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";

// Persist config
const persistConfig = {
  key: "root",
  storage,
  version: 1,
};

// Combine reducers
const rootReducer = combineReducers({
  user: userReducer,
  token: tokenReducer,
});

// Wrap reducers with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create store with middleware fix
const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // 🔥 Fix non-serializable value warning
    }),
});

// Create persistor
export const persistor = persistStore(store);

export default store;
