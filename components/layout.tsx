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
                    <div className="navbar">
                        <div className="container">
                            <div className="navbar-brand">
                                <Link href="/">
                                    <a className="navbar-item">
                                        {siteTitle}
                                    </a>
                                </Link>
                                <span className="navbar-burger burger" data-target="navbarMenu">
                                    <span></span>
                                    <span></span>
                                    <span></span>
                                </span>
                            </div>
                            <div id="navbarMenu" className="navbar-menu">
                                <div className="navbar-end">
                                    <Link href="/">
                                        <a className="navbar-item is-active">
                                            Home
                                        </a>
                                    </Link>
                                    <Link href="/about">
                                        <a className="navbar-item">
                                            About
                                        </a>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </header>
            )}
            <main className="hero-body">
                <div className="container">{children}</div>
            </main>
            <footer className={classnames('hero-foot')}>
                <div className={classnames('container', styles.footer)}>
                    &copy; {new Date().getFullYear()} <Author /> CC BY-NC-SA 4.0
                </div>
            </footer>
        </section>
    )
}
