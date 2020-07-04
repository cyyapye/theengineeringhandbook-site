import React from 'react'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getGithubPreviewProps } from 'next-tinacms-github'
import {
    useGithubToolbarPlugins,
    useGithubMarkdownForm,
} from 'react-tinacms-github'
import {
    useForm,
    usePlugins,
    usePlugin,
    useCMS,
    Form,
    FormOptions,
} from 'tinacms'
import Layout from '../../components/layout'
import { getChapterIds, getChapter, getChapterParser, getPrevNextChapters, SortableChapter } from '../../lib/chapter'
import styles from './chapter.module.scss'

interface FileData {
    id: string
    frontmatter: any
    markdownBody?: string
    htmlContent?: string
}

export default function Chapter({
    file,
    // file: {
    //     data: { chapter, previous, next }
    // }
    previous,
    next,
}: { file: {
        sha: string
        fileRelativePath: string
        data: FileData
    } }) {
    const cms = useCMS()

    React.useEffect(() => {
        import('react-tinacms-editor').then(
        ({ HtmlFieldPlugin, MarkdownFieldPlugin }) => {
            cms.plugins.add(HtmlFieldPlugin)
            cms.plugins.add(MarkdownFieldPlugin)
        })
    }, [])
      
    // const { chapter, previous, next } = file.data
    console.log(file)
    const chapter = file.data

    // const formConfig: any = {
    //     id: chapter.id,
    //     initialValues: chapter,
    //     onSubmit() {
    //         cms.alerts.success('Saved')
    //     },
    // }

    // const [pageData, form] = useForm(formConfig)
    const formConfig: any = {
        id: chapter.id,
        label: chapter.id,
        // initialValues: {
        //     title: chapter.title,
        //     markdownContent: chapter.htmlContent,
        // },
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

    console.log(pageData, form)
    usePlugin(form)

    useGithubToolbarPlugins()

    return (
        <Layout>
            <div className="is-size-6 is-uppercase">
                {chapter.id}
            </div>
            <h1 className="title page-title">
                {chapter.frontmatter.title}
            </h1>
            <div className="content"
                dangerouslySetInnerHTML={{ __html: chapter.htmlContent || '' }} />
            <div className="columns mt-4">
                {previous && (
                    <div className="column has-text-left">
                        <Link href="/ch/[id]" as={`/ch/${previous.id}`}>
                            <a className={styles.chapterNavButton}>
                                <span className="icon">
                                    <i className="fas fa-chevron-left"></i>
                                </span>
                                <span>{previous.title}</span>
                            </a>
                        </Link>
                    </div>
                )}
                {next && (
                    <div className="column has-text-right">
                        <Link href="/ch/[id]" as={`/ch/${next.id}`}>
                            <a className={styles.chapterNavButton}>
                                <span>{next.title}</span>
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
    const { previous, next } = getPrevNextChapters(chapterId)

    if (preview) {
        const previewProps = await getGithubPreviewProps({
            ...previewData,
            fileRelativePath: `chapters/${chapterId}.md`,
            parse: getChapterParser(chapterId),
        })

        previewProps.props.file.data = await previewProps.props.file.data
        previewProps.props.previous = previous
        previewProps.props.next = next
        return previewProps
    }

    const chapter = await getChapter(chapterId)

    return {
        props: {
            sourceProvider: null,
            error: null,
            preview: false,
            file: {
                fileRelativePath: `chapters/${chapter.id}.md`,
                data: chapter,
                // data: {
                //     chapter,
                //     previous,
                //     next,
                // },
            },
            previous,
            next,
        }
    }
}

interface ChapterProps {
    chapter: SortableChapter
    previous: SortableChapter
    next: SortableChapter
}