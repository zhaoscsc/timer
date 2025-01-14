export const fallbackLng = 'en'

export const languageNameMap = [
    { code: 'de', name: 'Deutsch' },
    { code: 'en', name: 'English' },
    { code: 'ja', name: '日本語' },
    { code: 'ko', name: '한국어' },
]


export const locales = languageNameMap.map(lang => lang.code)

export const languages = languageNameMap.map(lang => lang.code)

export const defaultNS = 'translation'
export const cookieName = 'i18next'

export function getOptions (lng = fallbackLng, ns = defaultNS) {
    return {
        supportedLngs: languages,
        fallbackLng,
        lng,
        fallbackNS: defaultNS,
        defaultNS,
        ns
    }
}


export function languagePath (path = '') {
    const normalizedPath = path === ''
        ? ''
        : path.startsWith('/') ? path : `/${path}`;

    const paths = {};
    languageNameMap.forEach(({ code }) => {
        if (code === fallbackLng) {
            paths['x-default'] = process.env.NEXT_PUBLIC_SITE_URL + normalizedPath;
            paths[code] = process.env.NEXT_PUBLIC_SITE_URL + normalizedPath;
        } else {
            paths[code] = `${process.env.NEXT_PUBLIC_SITE_URL}/${code}${normalizedPath}`;
        }
    });
    return paths;
}

export const localePrefix = 'as-needed';

export const pathnames = {
    '/': '/',
};