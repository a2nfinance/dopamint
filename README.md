## Introduction
DopaMint integrates MetaPlex CORE with the DSCVR ecosystem using the Canvas application. Content creators can create rules based on specific conditions, and followers who meet these conditions can mint specific NFTs.
## Demo information
- DopaMint Canvas Application
  - [For Followers]()
  - For content creators: Please create a post with the content being this address: `https://dopamint.a2n.finance`.
- [Video demo]()
- [Github](https://github.com/a2nfinance/dopamint)

<details>
  <summary>Click here to see demo screenshots</summary>

| ![homepage.png](https://dopamint.a2n.finance/screenshot/homepage.png) | 
|:--:| 
| *Content creators - All features* |
 
| ![nft_templates.png](https://dopamint.a2n.finance/screenshot/nft_templates.png) | 
|:--:| 
| *Content creators - NFT templates* |

| ![nft_template_form.png](https://dopamint.a2n.finance/screenshot/new_template_form.png) | 
|:--:| 
| *Content creators - New template form* |



| ![new_dscvr_point_rule.png](https://dopamint.a2n.finance/screenshot/new_dscvr_point_rule.png) | 
|:--:| 
| *Content creators - New DSCVR points-based rule form* |

| ![new_streak_rule.png](https://dopamint.a2n.finance/screenshot/new_streak_rule.png) | 
|:--:| 
| *Content creators - New DSCVR streak-based rule form* |

| ![new_asset_rule.png](https://dopamint.a2n.finance/screenshot/new_asset_rule.png) | 
|:--:| 
| *Content creators - New existing asset-based rule form* |

| ![plugin_setting_form.png](https://dopamint.a2n.finance/screenshot/plugin_setting_form.png) | 
|:--:| 
| *Content creators - New AppData plugin setting* |

| ![ai_tool_generated_image.png](https://dopamint.a2n.finance/screenshot/ai_tool_generated_image.png) | 
|:--:| 
| *Content creators - Generated images by AI tools* |  

| ![follower_nfts.png](https://dopamint.a2n.finance/screenshot/follower_nfts.png) | 
|:--:| 
| *Followers - All NFTs match the content creator's rules* |
 </details>

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


