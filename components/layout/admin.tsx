import * as React from 'react'
import { LayoutProps } from '@/models/index'
import Link from 'next/link'

export function AdminLayout({ children }: LayoutProps) {
	return (
		<div>
			<h1>Admin Layout</h1>
			<div className="">Sidebar</div>
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
