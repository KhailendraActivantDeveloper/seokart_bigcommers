"use client";
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';

interface LocaleContextType {
    locale: string;
    setLocale: (locale: string) => void;
}

const LocaleContext = createContext<LocaleContextType>({
    locale: 'en',
    setLocale: () => { },
});

export const LocaleProvider = ({ children }: { children: ReactNode }) => {
    // Check localStorage value during initialization
    const getInitialLocale = () => {
        const langLocalValue = window.localStorage.getItem('lang');
        return langLocalValue ? langLocalValue : 'en';
    };

    const [locale, setLocale] = useState<string>(typeof window !== 'undefined' ? getInitialLocale() : 'en');
    const [isMounted, setIsMounted] = useState(false);


    useEffect(() => {
        // Update localStorage whenever locale changes
        setIsMounted(true);
        window.localStorage.setItem('lang', locale);
        
    }, [locale]);

  if (!isMounted) {
    return null;
  }

    return (
        <LocaleContext.Provider value={{ locale, setLocale }}>
            {children}
        </LocaleContext.Provider>
    );
};

export const useLocale = () => useContext(LocaleContext);
