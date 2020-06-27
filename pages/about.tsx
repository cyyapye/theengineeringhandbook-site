import Layout from '../components/layout'
import { AuthorData } from '../components/author'
import classnames from 'classnames'
import styles from './about.module.scss'

export default function About() {
    return (
        <Layout>
            <h1 className="title page-title">
                About
            </h1>
            <div className="content">
                <figure className={classnames('image', 'is-128x128', styles.photo)}>
                    <img
                        className="is-rounded"
                        src="/images/headshot-128x128.jpg"
                        srcSet={[
                        '/images/headshot-512x512.jpg 4x',
                        '/images/headshot-256x256.jpg 3x',
                        '/images/headshot-192x192.jpg 2x',
                        '/images/headshot-128x128.jpg 1x',
                        ].join(', ')}
                        alt={AuthorData.name} />
                </figure>
                <p>
                    Hi there! I'm Ye Cheng. When I started writing on <a href="https://cyyapye.com">my
                    blog</a>, I mostly wrote about the lessons I learned from reading and running
                    engineering teams. But, occasionally, I also write about personal stories. 
                    Then, I realized the content is easier to consume if I separate the lessons from
                    my personal stories.
                </p>
                <p>
                    Besides, I've always wanted to write a book no one wants to pay for. So,
                    why not start now?
                </p>
                <p>
                    My plan is to write the book live in the open. So, what you'll see is raw notes
                    slowly transformed into readable content as chapters are written.
                </p>
            </div>
        </Layout>
    )
}