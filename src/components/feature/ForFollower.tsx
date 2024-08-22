import { Button, Col, Flex, Row } from "antd"
import { useRouter } from "next/router"
import { MotionImage } from "./MotionImage";
import { useAppSelector } from "@/controller/hooks";
import { useUMI } from "@/hooks/useUMI";


export const ForFollower = () => {
    const router = useRouter();
    const {createAsset} = useUMI();
    const { appliedRules } = useAppSelector(state => state.user);
    // Need to check whether what NFT user can mint.
    const handleMintNFT = (template: any) => {
        createAsset(template);
    }
    return (
        <Flex gap={"middle"} align="center" justify="center">
            <Row gutter={12} style={{width: "100%"}}>
                {appliedRules.map((t, index) => (<Col span={8} key={`template-col-${index}`}>
                    <Flex align="center" className="feature-logo-wrapper" vertical={true}>
                        <MotionImage src={t.image} />
                        <p>{t.name}</p>
                        <span>{t.description}</span>
                        <Button type="primary" size="large" onClick={() => handleMintNFT(t)}>Mint</Button>
                    </Flex>
                </Col>))
                }
            </Row>
        </Flex>
    )
}