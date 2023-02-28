import { GetServerSideProps, GetServerSidePropsContext } from 'next'
import React from 'react'

type Props = {}

export default function ParamsPage({}: Props) {
	return <div>ParamsPage</div>
}

export const getServerSideProps: GetServerSideProps = async (ctx: GetServerSidePropsContext) => {
	// const { data } = await  // your fetch function here
	// fake slow query
	await new Promise((resolve) => setTimeout(resolve, 3000))

	return {
		props: {},
	}
}
