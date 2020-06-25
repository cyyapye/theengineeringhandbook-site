import Layout from '../../components/layout'
import { GetStaticProps } from 'next'
import { getChapterIds, getChapter, SortableChapter } from '../../lib/chapter'
import classnames from 'classnames'
import styles from './chapter.module.scss'

export default function Chapter({ chapter }: ChapterProps) {
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

    return {
        props: {
            chapter,
        }
    }
}

interface ChapterProps {
    chapter: SortableChapter
}