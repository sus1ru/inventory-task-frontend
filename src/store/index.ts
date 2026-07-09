import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { productsApi } from './productsApi';
import { DashboardApi } from './dashboardApi';
import { categoryApi } from './categoryApi';
export const store = configureStore({
  reducer: {
    [productsApi.reducerPath]: productsApi.reducer,
    [DashboardApi.reducerPath]: DashboardApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      productsApi.middleware,
      DashboardApi.middleware,
      categoryApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;