/** @type {import('next').NextConfig} */
const apiUpstream = process.env.API_UPSTREAM || 'http://localhost:3001'
const vncUpstream = process.env.VNC_UPSTREAM || 'http://localhost:6080'

const nextConfig = {
  output: 'standalone',
  async rewrites() {
    return [
      { source: '/api/:path*', destination: `${apiUpstream}/api/:path*` },
      { source: '/novnc/:path*', destination: `${vncUpstream}/:path*` },
      // Проксируем WebSocket трафик noVNC на pa9-gui:6080
      { source: '/websockify', destination: `${vncUpstream}/websockify` },
      { source: '/websockify/:path*', destination: `${vncUpstream}/websockify/:path*` },
    ]
  },
}

module.exports = nextConfig
