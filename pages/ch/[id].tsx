import Link from 'next/link'
import { GetStaticProps } from 'next'
import Layout from '../../components/layout'
import { getChapterIds, getChapter, getPrevNextChapters, SortableChapter } from '../../lib/chapter'
import classnames from 'classnames'
import styles from './chapter.module.scss'

export default function Chapter({ chapter, previous, next }: ChapterProps) {
    return (
        <Layout>
            <div className="is-size-6 is-uppercase">
                {chapter.id}
            </div>
            <div className={classnames('title', styles.title)}>
                {chapter.title}
            </div>
            <div className="content"
                dangerouslySetInnerHTML={{ __html: chapter.htmlContent }} />
            <div className="columns mt-4">
                {previous && (
                    <div className="column has-text-left">
                        <Link href={`/ch/${previous.id}`}>
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
                        <Link href={`/ch/${next.id}`}>
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

export const getStaticProps: GetStaticProps = async ({ params }) => {
    if (!params) return { props: {} }

    const chapter = await getChapter(params.id as string)
    const { previous, next } = getPrevNextChapters(chapter.id)

    return {
        props: {
            chapter,
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