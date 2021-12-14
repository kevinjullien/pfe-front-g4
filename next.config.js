const PREFIX = process.env.URL_API ??  "https://pfe-back-g4-dev.herokuapp.com/" //http://localhost:3000/ TODO
const FIXED_PREFIX = PREFIX.endsWith("/") ? PREFIX : PREFIX + "/"
const API = FIXED_PREFIX + ":path*"
console.log("API path: ", API)
module.exports = {
  env:{
    customKey: PREFIX//"https://pfe-back-g4-dev.herokuapp.com/",
  },
  images: {
    domains: ['images.unsplash.com'],
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: API,
      },
    ];
  },

};