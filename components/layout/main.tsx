import { LayoutProps } from '@/models/common'
import React, { useEffect } from 'react'
import Link from 'next/link'

export function MainLayout({ children }: LayoutProps) {
	useEffect(() => {
		console.log('MainLayout mounting...')

		return () => console.log('MainLayout unmounting...')
	}, [])
	return (
		<div>
			<h1>Main Layout</h1>

			<Link legacyBehavior href={'/'}>
				<a>Home</a>
			</Link>
			<Link legacyBehavior href={'/about'}>
				<a>About</a>
			</Link>
			<div className="">{children}</div>
		</div>
	)
}
