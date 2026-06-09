import { AssetsContext } from '../../context/assets-context';
import { useAssetUrls } from '../../hooks/useAssetUrls';
import { ReactNode } from 'react';

import { ASSET_KEYS } from '../../types';

export function AssetsProvider({ children, apiUrl }: { children: ReactNode; apiUrl: string }) {
  const { loading, urls: imageUrls } = useAssetUrls(ASSET_KEYS, apiUrl);

  return <AssetsContext.Provider value={{ imageUrls, loading }}>{children}</AssetsContext.Provider>;
}
