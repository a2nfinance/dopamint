// require("dotenv").config();
const cspHeader = `
    default-src 'self';
    connect-src 'self' https://api.devnet.solana.com/ https://api.dscvr.one/ https://api1.stg.dscvr.one/ https://*.helius-rpc.com/ wss://*.helius-rpc.com/ wss://api.devnet.solana.com/;
    img-src 'self' https://*;
    script-src 'self';
`

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
    async headers() {
        return [
            {
                source: '/(.*)',
                headers: [
                    {
                        key: 'Content-Security-Policy',
                        value: cspHeader.replace(/\n/g, ''),
                    },
                ],
            },
        ]
    },
};