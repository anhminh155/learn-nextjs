import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy, { ProxyResCallback } from 'http-proxy'

type Data = {
	message: string
}

export const config = {
	api: {
		bodyParser: false,
	},
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<Data>) {
	if (req.method !== 'POST') {
		return res.status(404).json({ message: 'Method not supported!!!' })
	}

	return new Promise((resolve) => {
		//Don's send cookies to API server
		req.headers.cookie = ''

		const handleLoginResponse: ProxyResCallback = (proxyRes, req, res) => {
			let body = ''
			proxyRes.on('data', function (chunk) {
				body += chunk
			})
			proxyRes.on('end', function () {
				const { accessToken, expiredAt } = JSON.parse(body)

				console.log(accessToken, expiredAt)
				
				res.end('my response to cli')
			})
		}

		proxy.once('proxyRes', handleLoginResponse)
		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: true,
		})
	})
}
