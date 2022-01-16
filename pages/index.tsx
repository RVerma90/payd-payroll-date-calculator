import type { NextPage } from 'next'
import Head from 'next/head'
import styles from '../styles/Home.module.css'

import { Footer } from '../components'

const Home: NextPage = () => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Payd - Payroll Date Calculator</title>
        <meta name="description" content="Payroll Date Calculator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        <h1 className={styles.title}>
          Welcome to <a href="https://nextjs.org">Payd</a>
        </h1>

        <p className={styles.description}>
          Get started by entering the start date
        </p>

      </main>

      <Footer />
    </div>
  )
}

export default Home
