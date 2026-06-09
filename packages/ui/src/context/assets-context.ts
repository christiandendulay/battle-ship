import { createContext, useContext } from 'react';

export type AssetUrls = {
  [key: string]: string;
};

export type AssetsContextType = {
  imageUrls: AssetUrls;
  loading: boolean;
};

export const AssetsContext = createContext<AssetsContextType | null>(null);

export function useAssetsContext(): AssetsContextType {
  const context = useContext(AssetsContext);
  if (!context) {
    throw new Error('useAssetsContext must be used within AssetsProvider');
  }
  return context;
}

export function useImageUrl(key: string): string | undefined {
  const { imageUrls } = useAssetsContext();
  return imageUrls[key];
}
