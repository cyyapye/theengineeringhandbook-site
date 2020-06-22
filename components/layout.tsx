import Head from "next/head"
import Link from "next/link"
import * as React from "react"
import Author from "./author"
import classnames from 'classnames'
import styles from "./layout.module.scss"

const name = "Ye Cheng"
const siteTitle = "The Engineering Handbook"

export default function Layout({
    children,
    home,
}: {
    children: React.ReactNode
    home?: boolean
}) {
    return (
        <section className="hero is-fullheight">
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
            {!home && (
                <header className="hero-head">
                    <h2>
                        <Link href="/">
                            <a className="">{siteTitle}</a>
                        </Link>
                    </h2>
                </header>
            )}
            <main className="hero-body">{children}</main>
            <footer className={classnames('hero-foot')}>
                <div className={classnames('container', styles.footer)}>
                    &copy; {new Date().getFullYear()} <Author /> CC BY-NC-SA 4.0
                </div>
            </footer>
        </section>
    )
}
