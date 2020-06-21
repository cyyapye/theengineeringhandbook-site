import { getSortedChapters, SortableChapter } from '../lib/content'
import Layout from '../components/layout'

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
                    {chapters.map(({ id, date, title }) => (
                        <li key={id}>
                            {title}
                            <br />
                            {date}
                        </li>
                    ))}
                </ul>
            </div>
        </Layout>
    )

}