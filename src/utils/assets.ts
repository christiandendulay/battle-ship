const ASSETS_URL = import.meta.env.VITE_ASSETS_URL as string;

export const getAssetUrl = (path: string): string => {
  return `${ASSETS_URL}/${path}`;
};