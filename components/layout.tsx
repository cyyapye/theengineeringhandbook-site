import Head from 'next/head'
import Link from 'next/link'
import styles from './layout.module.css'
import utilStyles from '../styles/utils.module.css'
import * as React from 'react'

const name = "Ye Cheng"
const siteTitle = 'The Engineering Handbook'

export default function Layout({ children, home }: { children: React.ReactNode, home?: boolean }) {
    return (
        <div className={styles.container}>
            <Head>
                <title>{siteTitle}</title>
                <link rel="icon" href="/favicon.ico" />
                <meta
                    name="description"
                    content="Learn how to build a personal website using Next.js"
                />
                <meta
                    property="og:image"
                    content={`https://og-image.now.sh/${encodeURI(
                        siteTitle
                    )}.png?theme=light&md=0&fontSize=75px&images=https%3A%2F%2Fassets.vercel.com%2Fimage%2Fupload%2Ffront%2Fassets%2Fdesign%2Fnextjs-black-logo.svg`}
                />
                <meta name="og:title" content={siteTitle} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <header className={styles.header}>
            {!home && (
                <>
                    <h2 className={utilStyles.headingLg}>
                        <Link href="/">
                            <a className={utilStyles.colorInherit}>{siteTitle}</a>
                        </Link>
                    </h2>
                </>
            )}
            </header>
            <main className={styles.main}>
                {children}
            </main>
            <footer className={styles.footer}>
              <a
                href="https://twitter.com/cyyapye"
                target="_blank"
                rel="noopener noreferrer"
              >
                Written by @cyyapye
              </a>
            </footer>
        </div>
    )
}