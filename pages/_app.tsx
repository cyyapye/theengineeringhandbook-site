import { AppProps } from 'next/app'
import { useEffect } from 'react'
import Router from 'next/router'
import * as gtag from '../lib/gtag'
import '../styles/global.scss'

export default function App({ Component, pageProps }: AppProps) {
    useEffect(() => {
        const handleRouteChange = (url: string) => {
            gtag.pageView(url)
        }

        Router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            Router.events.off('routeChangeComplete', handleRouteChange)
        }
    }, [])
    
    return <Component {...pageProps} />
}