import {getContent} from '@/lib/cms'
import ContentSettings from '@/components/ContentSettings'
import { siteUrl, isPreview } from '@/lib/seo'
import { siteSchema } from '@/lib/schema'
import JsonLd from '@/components/JsonLd'
import { Playfair_Display, Open_Sans, Cormorant_Garamond } from 'next/font/google'
import SiteChrome from '@/components/SiteChrome'
import Script from 'next/script'
import './globals.css'

const heading = Playfair_Display({ subsets: ['latin'], weight: 'variable', variable: '--font-playfair', display: 'swap' })
const body = Open_Sans({ subsets: ['latin'], weight: 'variable', variable: '--font-open-sans', display: 'swap' })
const editorial = Cormorant_Garamond({ subsets: ['latin'], weight: 'variable', style: ['normal', 'italic'], variable: '--font-cormorant', display: 'swap' })

export const revalidate = 300

export const metadata = {
  metadataBase: new URL(siteUrl), applicationName: 'SERIÉ',
  robots: { index: !isPreview, follow: !isPreview },
  verification: { google: process.env.GOOGLE_SITE_VERIFICATION || undefined, other: process.env.BING_SITE_VERIFICATION ? { 'msvalidate.01': process.env.BING_SITE_VERIFICATION } : undefined },
  icons: { icon: '/icon.svg', apple: '/apple-touch-icon.png' },
  title: { default: 'SERIÉ | Lash, Brow & Training in Winnipeg', template: '%s | SERIÉ Winnipeg' },
  description: 'Personalized lash extensions, Korean lash lifts, brow lamination, Nano and Combo Brows, and hands-on training with Seri in Winnipeg.',
}

const gtmId = process.env.NEXT_PUBLIC_GTM_ID

export default async function RootLayout({ children }) {
  const {settings,images,announcement}=await getContent()
  return (
    <html lang="en" className={'scroll-smooth motion-reduce:scroll-auto ' + heading.variable + ' ' + body.variable + ' ' + editorial.variable}>
      <body>
        {gtmId && (
          <>
            <Script src={`https://www.googletagmanager.com/gtm.js?id=${gtmId}`} strategy="afterInteractive" />
            <Script id="gtag-init" strategy="afterInteractive">
              {`window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());`}
            </Script>
          </>
        )}
        <JsonLd data={siteSchema(settings)} />
        <div id="root">
          <ContentSettings value={{settings,images}}>
            <SiteChrome announcement={announcement} />
            {children}
          </ContentSettings>
        </div>
      </body>
    </html>
  )
}