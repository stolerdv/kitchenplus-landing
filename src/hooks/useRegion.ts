export type Locale = 'ru' | 'kk' | 'en';
export type Currency = 'RUB' | 'KZT' | 'USD';

export interface Region {
  locale: Locale;
  currency: Currency;
}

const KZ_TIMEZONES = new Set([
  'Asia/Almaty',
  'Asia/Qyzylorda',
  'Asia/Aqtau',
  'Asia/Aqtobe',
  'Asia/Atyrau',
  'Asia/Oral',
]);

const RU_TIMEZONES = new Set([
  'Europe/Moscow',
  'Europe/Kaliningrad',
  'Europe/Samara',
  'Asia/Yekaterinburg',
  'Asia/Omsk',
  'Asia/Krasnoyarsk',
  'Asia/Irkutsk',
  'Asia/Yakutsk',
  'Asia/Vladivostok',
  'Asia/Magadan',
  'Asia/Sakhalin',
  'Asia/Kamchatka',
  'Asia/Anadyr',
]);

function detectRegion(): Region {
  const tz = Intl.DateTimeFormat().resolvedOptions().timeZone;
  if (KZ_TIMEZONES.has(tz)) {
    return { locale: 'ru', currency: 'KZT' };
  }
  if (RU_TIMEZONES.has(tz)) {
    return { locale: 'ru', currency: 'RUB' };
  }
  return { locale: 'en', currency: 'USD' };
}

export function useRegion(): Region {
  return detectRegion();
}
