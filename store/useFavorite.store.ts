// store/favoriteStore.ts
import { create } from "zustand";

interface FavoriteStore {
  favorites: Set<string>;
  setFavorites: (newSet: Set<string>) => void;
}

export const useFavoriteStore = create<FavoriteStore>((set) => ({
  favorites: new Set(),

  setFavorites: (newSet) => set({ favorites: newSet }),
}));
