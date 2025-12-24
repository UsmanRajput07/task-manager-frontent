import storage from "redux-persist/lib/storage";
import { persistReducer, type WebStorage } from "redux-persist";
import type { Reducer } from "@reduxjs/toolkit";
interface PersistConfig {
  key: string;
  storage: WebStorage;
  whitelist?: string[];
  blacklist?: string[];
}

const makePersistReducer = (
  key: string,
  reducer: Reducer,
  whitelist?: string[],
  blacklist?: string[]
) => {
  const config: PersistConfig = { key, storage };
  if (whitelist) config.whitelist = whitelist;
  if (blacklist) config.blacklist = blacklist;
  return persistReducer(config, reducer);
};
export default makePersistReducer;
