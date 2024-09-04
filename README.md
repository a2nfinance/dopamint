## Introduction
DopaMint integrates MetaPlex CORE with the DSCVR ecosystem using the Canvas application. Content creators can create rules based on specific conditions, and followers who meet these conditions can mint specific NFTs.
## Demo information
- DopaMint Canvas Application
  - [For Followers]()
  - For content creators: Please create a post with the content being this address: `https://dopamint.a2n.finance`.
- [Video demo]()
- [Github](https://github.com/a2nfinance/dopamint)

## System design
![System Design](/public/docs/Architecture.jpg)

DopaMint application contains four main modules:

- **UI Components:** Improve UX when users interact with the application. 
  - **Use Canvas Client:** To retrieve user and content information and resize the page.
  - **Use Canvas Wallet Adapter:** To sign transactions for minting NFTs. DopaMint uses the Solana wallet adapter to support Metaplex UMI. The Canvas wallet adapter registers the Canvas wallet, which is then selected by default to connect with other wallets, such as Fantom and Solflare.
  - **Ant Design:** Contains many useful React components to speed up the development process.

- **DB Integration:** Stores rules and historical data of the application.
  - **Use Mongo Atlas:** DopaMint uses a cloud DB to store data.
  - **Use Mongoose:** To read/write data from the client application.

- **GraphQL Integration:** We use DSCVR GraphQL endpoints to get detailed information about users and content, which is used for condition checking of NFT minting rules.

- **Metaplex Integration:** To perform all actions related to NFTs.
  - **Use Metaplex Core:** For minting NFTs.
  - **Use Metaplex UMI:** To support the transaction process on both client and server sides.
  - **Use IRYS Uploader:** To upload images and JSON data to decentralized storage.

## Installation
You need to setup the .env file first.

| Environment variable | Required | Description |
| -------- | ------- |--------|
|DATABASE_URL|✅ | Mongo cloud database|
|UPLOADER_SECRET_KEY|✅| Account secret key for image and json uploader|
|NEXT_PUBLIC_SOLANA_RPC_URL|✅| Solana RPC URL|
|NEXT_PUBLIC_DSCVR_GRAPHQL|✅| DSCVR GraphQL endpoint|
|OPEN_API_KEY|✅| Default OpenAI API key|

Commands:

- ```cd dopamint```
- ```npm i```
- ```npm run dev``` for developer mode
- ```npm run build; npm run start``` for production mode

## Testing
You just need to post content with this URL: `https://dopamint.a2n.finance`.


