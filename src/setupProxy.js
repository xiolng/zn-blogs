// @ts-ignore
const proxy = require("http-proxy-middleware")

module.exports = function (app) {
    app.use(
        proxy("/api", {
            target: "http://localhost:5599",
            changeOrigin: true,
            secure: false,
            pathRewrite: {"^/api": "/"}
        })
    )
    app.use(
        proxy("/apis", {
            target: "http://localhost:5599",
            changeOrigin: true,
            secure: false,
            pathRewrite: {"^/api": "/api"}
        })
    )
}
