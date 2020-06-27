import Link from "next/link"
import Layout from "../components/layout"
import classnames from 'classnames'
import Author from '../components/author'
import styles from "./index.module.scss"

export default function Home() {
  return (
    <Layout home>
      <div className="container">
        <div className={classnames('title', styles.title)}>The Engineering Handbook</div>
        <h2 className={classnames('subtitle', styles.subtitle)}>How I run engineering teams</h2>

        <div className={styles.byline}>
          <Author avatar bio social />
        </div>

        <div className="container">
          <Link href="/ch">
            <button className={classnames(['button', 'is-dark'], styles.read)}>
                Start reading
            </button>
          </Link>
        </div>
      </div>
    </Layout>
  )
}
