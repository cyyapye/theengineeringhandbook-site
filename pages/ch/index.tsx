import Link from 'next/link'
import { getSortedChapters, SortableChapter } from '../../lib/chapter'
import Layout from '../../components/layout'
import styles from './index.module.scss'

export async function getStaticProps() {
    const chapters = getSortedChapters()

    return {
        props: {
            chapters
        }
    }
}

export default function Content({ chapters }: { chapters: SortableChapter[] }) {
    return (
        <Layout>
            <div style={{minHeight: '100vh', flex: 1, flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'flex-start'}}>
                <ul>
                    {chapters.map(({ id, date, title }, i) => (
                        <li key={id}>
                            <div className={styles.chapter}>
                                <div className="is-size-7">
                                    {id}
                                </div>
                                <Link href="/ch/[id]" as={`/ch/${id}`}>
                                    <a className={styles.title}>{title}</a>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )

}