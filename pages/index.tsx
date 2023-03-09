import { MainLayout } from 'components/layout'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { NextPageWithLayout } from '../models'
import styles from '../styles/Home.module.css'

const Home: NextPageWithLayout = () => {
	return (
		<div>
			<div className={styles.container}>
				<Head>
					<title>Learn NextJS | anhminh155</title>
					<meta name="description" content="Learn NextJS Typescript" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				<main className={styles.main}>
					<Link href="about">About</Link>
				</main>

				<footer className={styles.footer}>
					<a
						href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
						target="_blank"
						rel="noopener noreferrer"
					>
						Powered by{' '}
						<span className={styles.logo}>
							<Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
						</span>
					</a>
				</footer>
			</div>
		</div>
	)
}

Home.Layout = MainLayout

export default Home
