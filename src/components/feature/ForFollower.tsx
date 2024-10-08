import { useAppSelector } from "@/controller/hooks";
import { useUMI } from "@/hooks/useUMI";
import { DeploymentUnitOutlined } from "@ant-design/icons";
import { useWallet } from "@solana/wallet-adapter-react";
import { Alert, Button, Col, Flex, Row, Tooltip } from "antd";
import { NFTImage } from "./NFTImage";


export const ForFollower = () => {
    const wallet = useWallet();
    const { createAsset, selectCanvasWallet } = useUMI();
    const { appliedRules } = useAppSelector(state => state.user);
    const { mintNFTAction } = useAppSelector(state => state.process)
    // Need to check whether what NFT user can mint.
    const handleMintNFT = (wallet, template: any) => {
        createAsset(wallet, template);
    }

    const handleConnect = () => {
        selectCanvasWallet(wallet)
    }

    return (
        <Flex gap={"middle"} align="center" justify="center" style={{height: "403px"}}>
            {(appliedRules.length > 0) ? <Row gutter={12} style={{ width: "100%" }}>
                {appliedRules.map((t, index) => (<Col span={8} key={`template-col-${index}`}>
                    <Flex align="center" className="nft-image-wrapper" vertical={true}>
                        <div className="nft-image-box">
                            <NFTImage src={t.image} />
                            {
                                t.minted ? <Button block type="text" size="large" className="mint-btn">Already minted</Button> : <Button loading={mintNFTAction} block className="mint-btn" icon={<DeploymentUnitOutlined />}
                                    type="text" onClick={() => { wallet.connected ? handleMintNFT(wallet, t) : handleConnect() }}>
                                    {wallet.connected ? "Mint" : "Connect to mint"}
                                </Button>
                            }

                        </div>

                        <Tooltip title={t.description}><p>{t.name}</p></Tooltip>

                    </Flex>
                </Col>))
                }
            </Row>
                : <Alert type="info" showIcon={true} message="There are no NFTs available for minting at the moment. Please check back later, as the content creator may release exclusive and special items in the near future."/>
            }
        </Flex>
    )
}