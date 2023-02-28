import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { PostListPageProps } from '.'

export interface PostDetailPageProps {
	todo: any
}

export default function PostDetailPage({ todo, ...props }: PostDetailPageProps) {
	const router = useRouter()
	if (!todo) return null

	console.log(todo)

	return (
		<div>
			<h1>PostDetailPage page 1</h1>
			<ul key={todo.id}>
				<li>Id: {todo.id}</li>
				<li>Title: {todo.title}</li>
			</ul>
		</div>
	)
}

// You should use getStaticPaths if you’re statically pre-rendering pages that use dynamic routes

export const getStaticPaths: GetStaticPaths = async () => {
	console.log('\nGet static paths')
	const response = await fetch('https://jsonplaceholder.typicode.com/todos')
	const data = await response.json()

	return {
		paths: data.map((todo: any) => ({ params: { postId: (todo.id).toString() } })),
		fallback: false,
	}
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (
	ctx: GetStaticPropsContext
) => {
	console.log('\nGet static props', ctx.params)
	const postId = ctx.params?.postId
	if (!postId) return { notFound: true }

	const response = await fetch(`https://jsonplaceholder.typicode.com/todos/${postId}`)
	const data = await response.json()

	return {
		props: {
			todo: data,
		},
	}
}
