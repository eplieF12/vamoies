
import React, { createContext, useContext, useState, ReactNode } from 'react';

interface FavoriteItem {
  id: number;
  type: 'freelancer' | 'job' | 'establishment';
  name: string;
  avatar?: string;
  location?: string;
  category?: string;
}

interface FavoritesContextType {
  favorites: FavoriteItem[];
  addToFavorites: (item: FavoriteItem) => void;
  removeFromFavorites: (id: number, type: string) => void;
  isFavorite: (id: number, type: string) => boolean;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

export const FavoritesProvider = ({ children }: { children: ReactNode }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

  const addToFavorites = (item: FavoriteItem) => {
    setFavorites(prev => [...prev, item]);
  };

  const removeFromFavorites = (id: number, type: string) => {
    setFavorites(prev => prev.filter(item => !(item.id === id && item.type === type)));
  };

  const isFavorite = (id: number, type: string) => {
    return favorites.some(item => item.id === id && item.type === type);
  };

  return (
    <FavoritesContext.Provider value={{
      favorites,
      addToFavorites,
      removeFromFavorites,
      isFavorite
    }}>
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => {
  const context = useContext(FavoritesContext);
  if (!context) {
    throw new Error('useFavorites must be used within a FavoritesProvider');
  }
  return context;
};
