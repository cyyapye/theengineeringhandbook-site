import Link from 'next/link'
import Layout from '../components/layout'
import styles from './index.module.css'

export default function Home() {
  return (
    <Layout home>
      <div>
        <h1 className={styles.title}>
          The Engineering Handbook
        </h1>

        <p className={styles.description}>
          How I run engineering teams
        </p>
        <p>
          <Link href="/content">
            <a>Start reading</a>
          </Link>
        </p>
      </div>
    </Layout>
  )
}
