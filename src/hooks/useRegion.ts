import { useState, useEffect } from 'react';

export type Locale = 'ru' | 'kk' | 'en';
export type Currency = 'RUB' | 'KZT' | 'USD';

export interface Region {
  locale: Locale;
  currency: Currency;
}

const FALLBACK: Region = { locale: 'ru', currency: 'RUB' };

export function useRegion(): Region {
  const [region, setRegion] = useState<Region>(FALLBACK);

  useEffect(() => {
    const apiUrl = (import.meta as any).env?.VITE_API_URL ?? '';
    fetch(`${apiUrl}/api/v1/region`)
      .then((r) => r.json())
      .then((data) => {
        if (data.locale && data.currency) {
          setRegion({ locale: data.locale, currency: data.currency });
        }
      })
      .catch(() => {
        // keep fallback
      });
  }, []);

  return region;
}
