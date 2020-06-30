import Link from 'next/link'
import { GetStaticProps } from 'next'
import { getGithubPreviewProps } from 'next-tinacms-github'
import Layout from '../../components/layout'
import { getChapterIds, getChapter, getChapterParser, getPrevNextChapters, SortableChapter } from '../../lib/chapter'
import styles from './chapter.module.scss'

export default function Chapter({
    file: {
        data: { chapter, previous, next }
    }
}: { file: { data: ChapterProps } }) {
    return (
        <Layout>
            <div className="is-size-6 is-uppercase">
                {chapter.id}
            </div>
            <h1 className="title page-title">
                {chapter.title}
            </h1>
            <div className="content"
                dangerouslySetInnerHTML={{ __html: chapter.htmlContent }} />
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

    const chapter = await getChapter(params.id as string)
    const { previous, next } = getPrevNextChapters(chapter.id)

    if (preview) {
        const previewProps = await getGithubPreviewProps({
            ...previewData,
            fileRelativePath: `chapters/${chapter.id}.md`,
            parse: getChapterParser(chapter.id),
        })

        previewProps.props.file.data = await previewProps.props.file.data
        return previewProps
    }

    return {
        props: {
            sourceProvider: null,
            error: null,
            preview: false,
            file: {
                fileRelativePath: `chapters/${chapter.id}.md`,
                data: {
                    chapter,
                    previous,
                    next,
                },
            },
        }
    }
}

interface ChapterProps {
    chapter: SortableChapter
    previous: SortableChapter
    next: SortableChapter
}