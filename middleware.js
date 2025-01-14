import createMiddleware from 'next-intl/middleware';
import {locales,pathnames,localePrefix} from "./app/i18n/settings";
// import {pathnames, locales, localePrefix} from './config';

export default createMiddleware({
    defaultLocale: 'en',
    locales,
    pathnames,
    localePrefix,
    localeDetection: false
});

export const config = {
    matcher: [
        // Enable a redirect to a matching locale at the root
        '/',

        // Set a cookie to remember the previous locale for
        // all requests that have a locale prefix
        '/(en|zh|ja|ko|de|fr|ru|ar|es|hi|tw)/:path*',

        // Enable redirects that add missing locales
        // (e.g. `/pathnames` -> `/en/pathnames`)
        '/((?!_next|_vercel|image|auth|api|.*\\..*).*)'
    ]
};
