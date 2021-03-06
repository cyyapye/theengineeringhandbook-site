import React, { useEffect } from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { 
    getGithubPreviewProps,
    GithubError
} from 'next-tinacms-github'
import {
    useGithubEditing,
    useGithubToolbarPlugins,
    useGithubMarkdownForm,
} from 'react-tinacms-github'
import {
    usePlugin,
    useCMS,
} from 'tinacms'
import {
    InlineForm,
    InlineTextarea,
} from 'react-tinacms-inline'
import { 
    getChapterIds,
    getChapter,
    getChapterParser,
    getPrevNextChapters,
    SortableChapter,
} from '../../lib/chapter'
import {
    MarkdownCreatorPlugin,
} from '../../lib/markdown-creator-plugin'
import slugify from '@sindresorhus/slugify'
import Layout from '../../components/layout'
import Content from '../../components/content'
import styles from './chapter.module.scss'

interface FileData {
    id: string
    frontmatter: any
    markdownBody?: string
    htmlContent?: string
}

interface ChapterProps {
    sourceProvider: null
    error: GithubError
    preview: boolean
    file: {
        sha: string
        fileRelativePath: string
        data: FileData
    }
    previous: SortableChapter
    next: SortableChapter
}

export default function Chapter({
    file,
    previous,
    next,
    preview,
}: ChapterProps) {
    const cms = useCMS()

    useEffect(() => {
        import('react-tinacms-editor').then(
        ({ HtmlFieldPlugin, MarkdownFieldPlugin }) => {
            cms.plugins.add(HtmlFieldPlugin)
            cms.plugins.add(MarkdownFieldPlugin)
        })
    }, [])
      
    const chapter = file.data
    const formConfig: any = {
        id: chapter.id,
        label: chapter.id,
        fields: [
            { 
                name: 'frontmatter.title',
                label: 'Title',
                component: 'text',
            },
            { 
                name: 'markdownBody',
                label: 'Body',
                component: 'markdown',
            },
        ],
    }
    const [pageData, form] = useGithubMarkdownForm(file, formConfig)

    const markdownCreator = new MarkdownCreatorPlugin({
        label: 'New Chapter',
        fields: [
            { name: 'frontmatter.title', label: 'Title', component: 'text', required: true },
            { name: 'markdownBody', label: 'Body', component: 'markdown'}
        ],
        getFileRelativePath({ frontmatter }) {
            const slug = slugify(frontmatter.title.toLowerCase())
            return `chapters/${slug}.md`
        },
        getFrontmatter({ frontmatter }) {
            return new Promise(resolve => {
                resolve({
                    title: frontmatter.title,
                    date: new Date().toJSON(),
                })
            })
        },
        getMarkdownBody({ markdownBody }) {
            return markdownBody
        }
    })
    usePlugin([form, markdownCreator])

    useGithubToolbarPlugins()

    return (
        <Layout>
            <EditLink editMode={preview} />
            <div className="is-size-6 is-uppercase">
                {chapter.id}
            </div>
            <InlineForm form={form}>
                <h1 className="title page-title">
                    <InlineTextarea name="frontmatter.title" focusRing={false} />
                </h1>
                <Content chapter={chapter} />
            </InlineForm>
            <div className="columns mt-4">
                {previous && (
                    <div className="column has-text-left">
                        <Link href="/ch/[id]" as={`/ch/${previous.id}`}>
                            <a className={styles.chapterNavButton}>
                                <span className="icon">
                                    <i className="fas fa-chevron-left"></i>
                                </span>
                                <span>{previous.frontmatter.title}</span>
                            </a>
                        </Link>
                    </div>
                )}
                {next && (
                    <div className="column has-text-right">
                        <Link href="/ch/[id]" as={`/ch/${next.id}`}>
                            <a className={styles.chapterNavButton}>
                                <span>{next.frontmatter.title}</span>
                                <span className="icon">
                                    <i className="fas fa-chevron-right"></i>
                                </span>
                            </a>
                        </Link>
                    </div>
                )}
            </div>
        </Layout>
    )
}

export async function getStaticPaths() {
    const paths = getChapterIds()

    return {
        paths,
        fallback: false,
    }
}

export const getStaticProps: GetStaticProps = async ({ 
    params,
    preview,
    previewData,
}) => {
    if (!params) return { props: {} }

    const chapterId = params.id as string
    const fileRelativePath = `chapters/${chapterId}.md`
    const { previous, next } = getPrevNextChapters(chapterId)

    if (preview) {
        const previewProps = await getGithubPreviewProps({
            ...previewData,
            fileRelativePath,
            parse: getChapterParser(chapterId),
        })

        if (previewProps.props.file) {
            previewProps.props.file.data = await previewProps.props.file.data
        }

        return {
            props: {
                ...previewProps.props,
                previous,
                next,
            }
        }
    }

    const chapter = await getChapter(chapterId)

    return {
        props: {
            sourceProvider: null,
            error: null,
            preview: false,
            file: {
                fileRelativePath,
                data: chapter,
            },
            previous,
            next,
        }
    }
}

export const EditLink = ({ editMode }: EditLinkProps) => {
    if (editMode) {
        return null
    }

    const github = useGithubEditing()

    return (
        <span
            className="icon is-pulled-right"
            aria-label="edit"
            onClick={editMode ? github.exitEditMode : github.enterEditMode}>
            <i className="fas fa-pen-nib"/>
        </span>
    )
}

export interface EditLinkProps {
    editMode: boolean
}