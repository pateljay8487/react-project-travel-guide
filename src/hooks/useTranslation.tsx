import React, {
    createContext, useContext, useEffect,
} from 'react';
import strings from '../lang/Lang';
import useLocalStorage from './useLocalStorage';

export interface OnlyChildrenProps {
    children: React.ReactNode,
}

export type Languages = "en" | "es" | "fr";

type TranslationContextProps = [Languages, (value: Languages) => void | Languages | null]

const TranslationContext = createContext<TranslationContextProps>([
    "en",
    () => { },
]);

export default function useTranslation() {
    return useContext(TranslationContext);
}

export function TranslationProvider({ children }: OnlyChildrenProps) {
    const {
        storedValue: language,
        setStorageValue,
    } = useLocalStorage<Languages>('language', strings.getLanguage() as Languages | 'en');

    document.querySelector("html")?.setAttribute('lang', language?.toString() || 'en');

    function setLanguage(lang: Languages) {
        console.log("lang",lang);
        
        setStorageValue(lang)
        strings.setLanguage(lang)
    }

    useEffect(() => {
        if (language) {
            strings.setLanguage(language);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [language])

    return (
        <TranslationContext.Provider
            value={[
                language || "en",
                setLanguage,
            ]}
        >
            {children}
        </TranslationContext.Provider>
    );
}
