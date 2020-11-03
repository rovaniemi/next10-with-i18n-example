import React, { createContext, useState, useRef, useEffect } from "react";
import rosetta from "rosetta";

import { useRouter } from "next/router";
// import rosetta from 'rosetta/debug';

const i18n = rosetta();

export const I18nContext = createContext();

export default function I18n({ children, lngDict }) {
  const router = useRouter();
  const { defaultLocale, locale } = router;
  // default language
  i18n.locale(locale);
  const activeLocaleRef = useRef(locale || defaultLocale);
  const [, setTick] = useState(0);
  const firstRender = useRef(true);

  const i18nWrapper = {
    activeLocale: activeLocaleRef.current,
    t: (...args) => i18n.t(...args),
    locale: (l, dict) => {
      i18n.locale(l);
      activeLocaleRef.current = l;
      if (dict) {
        i18n.set(l, dict);
      }
      // force rerender to update view
      setTick((tick) => tick + 1);
    },
    blogs: lngDict?.blog?.posts,
  };

  // for initial SSR render
  if (locale && firstRender.current === true) {
    firstRender.current = false;
    i18nWrapper.locale(locale, lngDict);
  }

  // when locale is updated
  useEffect(() => {
    if (locale) {
      i18nWrapper.locale(locale, lngDict);
    }
  }, [lngDict, locale]);

  return (
    <I18nContext.Provider value={i18nWrapper}>{children}</I18nContext.Provider>
  );
}
