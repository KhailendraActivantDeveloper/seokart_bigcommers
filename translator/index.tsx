"use client";
import { useLocale } from '@/context/LocaleContext';
import React, { useState, useEffect, useCallback } from 'react';

// Custom hook to get translations based on selected language
export const useTranslations = (key: string) => {
  const [translationData, setTranslationData] = useState<Record<string, string>>({});
  const { locale } = useLocale();
  useEffect(() => {
    // Dynamically import the translation file based on the language
    const loadTranslation = async () => {
      try {
        const data = await import(`../messages/${locale}.json`);
        setTranslationData(data[key] || {});
      } catch (error) {
        console.error(`Error loading translation file for language: ${locale}`, error);
      }
    };
    
    loadTranslation();
  }, [locale, key]);

  // Function to get the translation for a specific key
  const getTranslation = useCallback((innerKey: string) => {
    return translationData[innerKey] || `${key}.${innerKey}`; 
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [translationData]);

  // Rich text translation function
  const rich = (key: string, components: Record<string, (chunk: string) => JSX.Element>) => {
    const translation = getTranslation(key);

    // Split the translation based on tags and replace them with components
    return translation.split(/(<.*?>)/g).map((part, index) => {
      const tag = part.match(/<(.*?)>/);
      if (tag && components[tag[1]]) {
        // Extract the text between the tag and pass it to the component
        const content = translation.split(`<${tag[1]}>`)[1].split(`</${tag[1]}>`)[0];
        return <React.Fragment key={index}>{components[tag[1]](content)}</React.Fragment>;
      } else if (tag) {
        return null; // Skip unhandled tags
      } else {
        return <React.Fragment key={index}>{part}</React.Fragment>;
      }
    });
  };

  // Attach the `rich` method to the `getTranslation` function
  const translet: any = (innerKey: string) => getTranslation(innerKey);
  translet.rich = rich;

  return translet;
};
