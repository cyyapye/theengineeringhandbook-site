import App, { AppProps } from 'next/app'
import { TinaCMS, TinaProvider } from 'tinacms'
import {
    useGithubEditing,
    GithubClient,
    TinacmsGithubProvider,
} from 'react-tinacms-github'
import { useEffect } from 'react'
import Router from 'next/router'
import * as gtag from '../lib/gtag'
import '../styles/global.scss'

export default class Site extends App {
    cms: TinaCMS

    constructor(props) {
        super(props)

        this.cms = new TinaCMS({
            apis: {
                github: new GithubClient({
                    proxy: '/api/proxy-github',
                    authCallbackRoute: '/api/create-github-access-token',
                    clientId: process.env.GITHUB_CLIENT_ID,
                    baseRepoFullName: process.env.REPO_FULL_NAME,
                }),
            },
            sidebar: {
                hidden: !props.pageProps.preview,
            },
            toolbar: {
                hidden: !props.pageProps.preview,
            },
        })
    }

    componentDidMount() {
        const handleRouteChange = (url: string) => {
            gtag.pageView(url)
        }

        Router.events.on('routeChangeComplete', handleRouteChange)

        return () => {
            Router.events.off('routeChangeComplete', handleRouteChange)
        }
    }

    render() {
        const { Component, pageProps } = this.props

        return (
            <TinaProvider cms={this.cms}>
                <TinacmsGithubProvider
                    editMode={pageProps.preview}
                    enterEditMode={enterEditMode}
                    exitEditMode={exitEditMode}
                    error={pageProps.error}
                >
                    <EditLink editMode={pageProps.preview} />
                    <Component {...pageProps} />
                </TinacmsGithubProvider>
            </TinaProvider>
        )
    }
}

const enterEditMode = () => {
    const token = localStorage.getItem('tinacms-github-token') || null
    const headers = new Headers()

    if (token) {
        headers.append('Authorization', 'Bearer ' + token)
    }

    return fetch(`/api/preview`, { headers: headers }).then(() => {
        window.location.href = window.location.pathname
    })
}

const exitEditMode = () => {
    return fetch(`/api/reset-preview`).then(() => {
        window.location.reload()
    })
}

export const EditLink = ({ editMode }: EditLinkProps) => {
    const github = useGithubEditing()

    return (
        <button onClick={editMode ? github.exitEditMode : github.enterEditMode}>
            {editMode ? 'Exit Edit Mode' : 'Edit This Site'}
        </button>
    )
}

export interface EditLinkProps {
    editMode: boolean
}