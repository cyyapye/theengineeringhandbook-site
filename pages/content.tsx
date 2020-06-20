import { getSortedChapters } from '../lib/content'
import Layout from '../components/layout'

export async function getStaticProps() {
    const chapters = getSortedChapters()

    return {
        props: {
            chapters
        }
    }
}

export default function Content({ chapters }) {
    return (
        <Layout>
            <section>
                <ul>
                    {chapters.map(({ id, date, title }) => (
                        <li key={id}>
                            {title}
                            <br />
                            {date}
                        </li>
                    ))}
                </ul>
            </section>
        </Layout>
    )

}