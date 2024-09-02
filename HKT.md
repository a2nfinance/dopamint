### 0. Vision

Transform into a fully-fledged application that support content creator to incentive their followers and do marketing campains using exclusive NFTs.

### 1. Overview

Our project integrates MetaPlex CORE with DSCVR ecosystem using Canvas application. Content creator can create rules based-on specific conditions, follower who meet these conditions can mint specific NFTs.

### 2. Demo information 
- [DopaMint Canvas Application]()
- [Video demo]()
- [Github](https://github.com/a2nfinance/dopamint)


### 3. Features
![creator_features](/public/docs/creator_features.png)
### Features for content creators
- **NFT templates management:** content creator can make many templates. All template data is stored in the cloud database and on the the decentralized storage.
- **Rule Management:**
    - **Streak-based rules:** Followers can mint exclusive NFTs if their DSCVR streak and multiplier match rules.
    - **Point-based rules:** Followers can mint exclusive NFT if their accumulate DSCVR points reach a qualified value.
    - **Asset-based rule:** Followers can mint a specific NFT If followers own a existing asset and that asset is required in the rule.

- **Plugin settings:** Allow content creators to setup custom AppData plugins for their exlusive NFTs.
- **AI Tools:** A simple feature allows to generate images base-on OpenAI API with Dall-e-2 and Dall-e-3 model.
### Features for followers

Followers can mint exclusive NFTs based-on content creators' configured rules.

### 4. Architecture
![architecture](/public/docs/Architecture.jpg)

DopaMint application contains four main modules:

- **UI components:** imrpove UX when user interact with application. 
    - Use canvas client: to get user, content information and resize page.
    - Use canvas wallet adapter: to sign transaction for minting NFT. Dopamint use Solana wallet adapter to support Metaplex UMI. Canvas wallet adapter registers Canvas wallet, then Canvas wallet is selected by default to connect with other wallet such as fantom, solflare.
    - Ant Design: contains many useful react components to speed up the development process.

- **DB integration**: store rules and history data of the application.
    - Use Mongo Atlas: DopaMint uses cloud DB to store data.
    - USe Mongoose: to read/write data from client application.
- **GraphQL integration**: We use DSCVR GraphQL end-points to get detail information of user and content, which is used in condition checking of NFT minting rules.
- **Metaplex integration**: to do all actions related to NFTs
    - Use Metaplex core: to minting NFTs
    - Use Metaplex UMI: to support transaction process on both client and server sides.
    - Use IRYS uploader: to upload image and JSON data to the decentralized storage.

### 5. Challenges we ran into
- **Challenge 01 -** Reuse Metaplex libraries for Canvas application: In the first stage of DopaMint development. We don't want to code and handle each wallet interaction and transaction from scratch. So we integrates Metaplex UMI, Solana wallet adapter, and Canvas wallet in to DopaMint. There are some issues when libraries are not fully compatible with eachother both UI and UX. So we do some sulutions: preselect Cavas wallet right after this wallet is registered, custom useCanvasClient and useUMI hooks to make compatible features.
- **Challenge 02 -** UX for a complex canvas application: we build pages like these pages run on a horizontal mobile screen, large images are used to describle features. Data flow of pages are consistency and managed by Redux framework. So application data and user interaction feedback are updated simunately. Our solutions are not completed at the current time, but it make acceptable UX.

- **Challenge 03 -** Metaplex complex features: Metaplex has a lot of features and libraries. During the hackathon, we have to read and learn many docs to understand how to use Metaplex with right purposes. We decised to make important features first which are on top of recommended ideas.


### 6. Future Development
DeSoc and NFTs can't be separated. So there are a lot of remain features to develop for user loyalty program and user incentive activities. DopaMint is in first phase of development, so we hope to can contribute to growth of DSCVR community in the near future.

### 7. Conclusion
 We extend special thanks to DSCVR, hackathon workshops, Metaplex's open-source resources, and the supportive community on DSCVR Discord channels. Without their contributions, we wouldn't have been able to complete our product on time.
