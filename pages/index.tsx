import Link from "next/link"
import Layout from "../components/layout"
import styles from "./index.module.scss"
import classnames from 'classnames'
import Author from '../components/author'

export default function Home() {
  return (
    <Layout home>
      <div className="container">
        <div className={classnames('title', styles.title)}>The Engineering Handbook</div>
        <h2 className={classnames('subtitle', styles.subtitle)}>How I run engineering teams</h2>

        <div className={styles.byline}>
          <Author />
        </div>

        <div className="container">
          <button className={classnames(['button', 'is-dark'], styles.read)}>
            <Link href="/content">
              <a>Start reading</a>
            </Link>
          </button>
        </div>
      </div>
    </Layout>
  )
}
