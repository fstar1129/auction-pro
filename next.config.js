module.exports = {
  reactStrictMode: false,
  images: {
    domains: ["arrland.app"],
  },
  async redirects() {
    return [
      {
        source: '/redirect',
        destination: 'https://google.com',
        permanent: true,
      }
    ]
  },
  async headers() {
    return [
      {
        source: "/",
        headers: [
          { key: "web-build", value: process.env.VERCEL_GIT_COMMIT_SHA },
        ],
      },
    ];
  },
};
