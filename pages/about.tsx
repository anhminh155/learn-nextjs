import * as React from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { useRouter } from 'next/router'

const Header = dynamic(() => import('components/common/header'), { ssr: false })

export interface AboutPageProps {}

export default function About(props: AboutPageProps) {
	const router = useRouter()
	const [todoList, setTodoList] = React.useState<any>()
	const page = router.query.page

	console.log(router.query)

	React.useEffect(() => {
		if (!page) return
		;(async () => {
			const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${page}`).then(
				(response) => response.json()
			)
			const data = await response
			setTodoList(data)
		})()
	}, [page])

	const handleNextClick = () => {
		router.push(
			{
				pathname: '/about',
				query: {
					page: (Number(page) || 1) + 1,
				},
			},
			undefined,
			{ shallow: true }
		)
	}

	return (
		<div>
			<div className="">About page</div>
			<ul>
				<li>Id: {todoList?.id}</li>
				<li>Title: {todoList?.title}</li>
			</ul>
			<button onClick={handleNextClick}>Next page</button>
			<Header />
		</div>
	)
}
