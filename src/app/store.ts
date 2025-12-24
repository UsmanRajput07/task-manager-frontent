import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/auth.slice";
import { persistStore } from "redux-persist";
import makePersistReducer from "./persistConfig";

export const store = configureStore({
  reducer: {
    auth: makePersistReducer("auth", userReducer),
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});

export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
