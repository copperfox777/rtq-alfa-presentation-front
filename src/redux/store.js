import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import { api } from './api'

export const store = configureStore({
  reducer: {
    // Добовляем редьюсер как слайс
    [api.reducerPath]: api.reducer,
  },
  // Добавляем апи мидлвар, что даст нам кэширование, инвалидацию, полинг,
  // и другие полезные штуки
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(api.middleware),
})

// Это нужно для refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch)
