// require("dotenv").config();
module.exports = {
    // output: "export",
    reactStrictMode: false,
    webpack: (config, { dev }) => {
        if (dev) {
            Object.defineProperty(config, "devtool", {
                get() {
                    return "cheap-source-map";
                },
                set() {
                },
            });
        }
        return config;
    },
};