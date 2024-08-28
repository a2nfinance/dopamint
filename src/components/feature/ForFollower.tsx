import { useAppSelector } from "@/controller/hooks";
import { useUMI } from "@/hooks/useUMI";
import { useWallet } from "@solana/wallet-adapter-react";
import { Button, Col, Flex, Row } from "antd";
import { MotionImage } from "./MotionImage";
import { useCallback } from "react";


export const ForFollower = () => {
    const wallet = useWallet();
    const { createAsset, selectCanvasWallet } = useUMI();
    const { appliedRules } = useAppSelector(state => state.user);
    // Need to check whether what NFT user can mint.
    const handleMintNFT = (wallet, template: any) => {
        createAsset(wallet, template);
    }

    const handleConnect = () => {
        selectCanvasWallet(wallet)
    }

    return (
        <Flex gap={"middle"} align="center" justify="center">
            <Row gutter={12} style={{ width: "100%" }}>
                {appliedRules.map((t, index) => (<Col span={8} key={`template-col-${index}`}>
                    <Flex align="center" className="feature-logo-wrapper" vertical={true}>
                        <MotionImage src={t.image} />
                        <p>{t.name}</p>
                        <span>{t.description}</span>
                        <Button type="primary" size="large" onClick={() => { wallet.connected ? handleMintNFT(wallet, t) : handleConnect() }}>{wallet.connected ? "Mint" : "Connect to mint"}</Button>
                    </Flex>
                </Col>))
                }
            </Row>
        </Flex>
    )
}