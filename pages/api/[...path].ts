import type { NextApiRequest, NextApiResponse } from 'next'
import httpProxy from 'http-proxy'

export const config = {
	api: {
		bodyParser: false,
	},
}

const proxy = httpProxy.createProxyServer()

export default function handler(req: NextApiRequest, res: NextApiResponse<any>) {
	return new Promise((resolve) => {
		//Don's send cookies to API server
		req.headers.cookie = ''
		proxy.web(req, res, {
			target: process.env.API_URL,
			changeOrigin: true,
			selfHandleResponse: false,
		})

        //Handle issue API resolved without sending a response in Next js
		proxy.once('proxyRes', () => {            
			resolve(true)
		})
	})
}
