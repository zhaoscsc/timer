// app/[lng]/layout.tsx
import React from 'react';
import { Inter } from 'next/font/google';
import { dir } from 'i18next'
import {languagePath, languages} from '../i18n/settings'
import { useTranslation } from "@/app/i18n";
import "../globals.css";
import { Analytics } from '@vercel/analytics/react';
import { ThemeProvider } from '@/components/providers/ThemeProvider'

const inter = Inter({ subsets: ['latin'] });

export async function generateStaticParams() {
    return languages.map((lng) => ({ lng }))
}

export async function generateMetadata({ params: { lng } }: { params: { lng: string } }) {
    const { t } = await useTranslation(lng,'seo');
    const currentYear = new Date().getFullYear();
    const canonicalPath = lng === 'en' ? '' : `/${lng}`;
    return {
        title: t('SEO.Home.title'),
        description: t('SEO.Home.description'),
        openGraph: {
            title: t('SEO.Home.title'),
            description: t('SEO.Home.description'),
            type: 'website',
            url: 'https://minutetimers.net',
        },
        alternates: {
            canonical: `${process.env.NEXT_PUBLIC_SITE_URL}${canonicalPath}`,
            languages: languagePath(``)
        }
    };
}

const Layout: React.FC<{ children: React.ReactNode; params: { lng: string } }> = ({ children, params: { lng } }) => {
    const isProduction = process.env.NODE_ENV === 'production'

    return (
        <html lang={lng} dir={dir(lng)} suppressHydrationWarning>
        <body className={inter.className}>
            <ThemeProvider
                attribute="class"
                defaultTheme="system"
                enableSystem
                disableTransitionOnChange
            >
                {children}
            </ThemeProvider>
            <Analytics />
        </body>
        </html>
    );
};

export default Layout;