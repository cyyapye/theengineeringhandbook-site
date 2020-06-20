import Head from 'next/head'
import { getSortedChapters } from '../lib/content'

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
        <div className="container">
            <Head>
                <title>The Engineering Handbook</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>
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
        </div>
    )

}