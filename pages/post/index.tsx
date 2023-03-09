import * as React from 'react'
import { GetStaticProps, GetStaticPropsContext } from 'next'
import Link from 'next/link'

export interface PostListPageProps {
	data: any[]
}

export default function PostList({ data, ...props }: PostListPageProps) {
	return (
		<div>
			Post List Page
			<ul>
				{data?.map((d: any) => (
					<Link style={{ margin: '20px' }} key={d.id} href={`post/${d.id}`}>
						<li>Id: {d.id}</li>
						<li>Title: {d.title}</li>
					</Link>
				))}
			</ul>
		</div>
	)
}

// You should use getStaticProps when:
//- The data required to render the page is available at build time ahead of a user’s request.
//- The data comes from a headless CMS.
//- The data can be publicly cached (not user-specific).
//- The page must be pre-rendered (for SEO) and be very fast — getStaticProps generates HTML and JSON files, both of which can be cached by a CDN for performance.

export const getStaticProps: GetStaticProps<PostListPageProps> = async (
	ctx: GetStaticPropsContext
) => {
	const response = await fetch('https://js-post-api.herokuapp.com/api/posts?_page=1').then(
		(response) => response.json()
	)

	const data = await response.data

	return {
		props: {
			data: data,
		},
	}
}
