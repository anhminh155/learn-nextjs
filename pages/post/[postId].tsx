import { useRouter } from 'next/router'
import * as React from 'react'

export interface PostDetailPageProps {}

export default function PostDetailPage(props: PostDetailPageProps) {
	const router = useRouter()

	return (
		<div>
			<h1>PostDetailPage page 1</h1>
			<p>Post ID: {JSON.stringify(router.query)}</p>
		</div>
	)
}