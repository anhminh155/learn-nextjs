import { GetStaticProps, GetStaticPropsContext, GetStaticPaths } from 'next'
import { useRouter } from 'next/router'
import * as React from 'react'
import { PostListPageProps } from '.'

export interface PostDetailPageProps {
	todo: any
}

export default function PostDetailPage({ todo, ...props }: PostDetailPageProps) {
	const router = useRouter()
	
	if (router.isFallback) {
		return <div>Loading...</div>
	}
	
	if (!todo) return null

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
	const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1')
	const data = await response.json()

	return {
		paths: data.data.map((todo: any) => ({ params: { postId: todo.id.toString() } })),
		fallback: true,
	}
}

export const getStaticProps: GetStaticProps<PostDetailPageProps> = async (
	ctx: GetStaticPropsContext
) => {
	console.log('\nGet static props', ctx.params)
	const postId = ctx.params?.postId
	if (!postId) return { notFound: true }

	const response = await fetch(`https://js-post-api.herokuapp.com/api/posts/${postId}`)
	const data = await response.json()

	return {
		props: {
			todo: data,
		},
		revalidate: 5,
	}
}
