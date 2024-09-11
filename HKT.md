### 0. Vision
Transform DopaMint into a fully-fledged application that supports content creators in incentivizing their followers with configurable exclusive NFTs.

### 1. Overview

Our project integrates MetaPlex CORE with the DSCVR ecosystem using the Canvas application. Content creators can create rules based on specific conditions, and followers who meet these conditions can mint specific NFTs.

### 2. Demo information 
- DopaMint Canvas Application
  - For content creators: Please create a post with the content being this address: `https://dopamint.a2n.finance`.
  - [For Followers]()
- [Video demo](https://www.youtube.com/watch?v=kyVQIwnfSB8)
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

### 3. Features
![creator_features](https://dopamint.a2n.finance/docs/creator_features.png)
### Features for Content Creators

- **NFT Templates Management:** Content creators can create multiple templates. All template data is stored in the cloud database and on decentralized storage.
- **Rule Management:**
  - **Streak-based Rules:** Followers can mint exclusive NFTs if their DSCVR streak and multiplier match the rules.
  - **Point-based Rules:** Followers can mint exclusive NFTs if their accumulated DSCVR points reach a specified value.
  - **Asset-based Rules:** Followers can mint a specific NFT if they own an existing asset required by the rule.

- **Plugin Settings:** Allows content creators to set up custom AppData plugins for their exclusive NFTs.
- **AI Tools:** A simple feature that allows generating images based on the OpenAI API with DALL-E 2 and DALL-E 3 models.

### Features for Followers

Followers can mint exclusive NFTs based on content creators' configured rules.

### 4. Architecture
![architecture](https://dopamint.a2n.finance/docs/Architecture.jpg)

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

### 5. Challenges we ran into
- **Challenge 01 - Reusing Metaplex Libraries for the Canvas Application:** In the first stage of DopaMint development, we did not want to code and handle each wallet interaction and transaction from scratch. So, we integrated Metaplex UMI, the Solana wallet adapter, and the Canvas wallet into DopaMint. There were some issues when the libraries were not fully compatible with each other, both in terms of UI and UX. To address these, we implemented solutions such as preselecting the Canvas wallet right after it is registered and customizing `useCanvasClient` and `useUMI` hooks to make the features compatible.

- **Challenge 02 - UX for a Complex Canvas Application:** We designed pages to run on a mobile screen, and large images are used to describe features. The data flow of the pages is consistent and managed by the Redux framework, ensuring that application data and user interaction feedback are updated simultaneously. Our solutions are not yet fully complete, but they provide an acceptable UX.

- **Challenge 03 - Metaplex's Complex Features:** Metaplex has many features and libraries. During the hackathon, we had to read and learn from many documents to understand how to use Metaplex properly. We decided to implement the most important features first, which were at the top of the recommended ideas.


### 6. Future Development
DeSoc and NFTs are inseparable, so there are many features left to develop for user loyalty programs and incentive activities. DopaMint is in its first phase of development, and we hope to contribute to the growth of the DSCVR community in the near future.

### 7. Conclusion
We extend special thanks to DSCVR, the hackathon workshops, Metaplex's open-source resources, and the supportive community on the DSCVR Discord channels. Without their contributions, we wouldn't have been able to complete our product on time.
