import { Col, Flex, Row } from "antd"
import { useRouter } from "next/router"
import { MotionImage } from "./MotionImage";

export const ForCreator= () => {
    const router = useRouter();
    return (
        <Flex gap={"middle"} align="center" justify="center">
                <Row gutter={12}>
                    <Col span={8}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/templates")}>
                            <MotionImage src={"/feature_icon/nft_template.jpg"} />
                            <p>NFT Templates</p>
                        </Flex>
                    </Col>
                   
                    <Col span={8}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/settings/streak")}>
                         
                            <MotionImage src={"/feature_icon/streak_nft.jpg"} />
                            <p>Streak-based Rules</p>
                        </Flex>
                    </Col>

                    <Col span={8}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/ai/generate-image")}>
                            <MotionImage src={"/feature_icon/AI_tools_2.jpg"} />
                            <p>AI tools</p>
                        </Flex>
                    </Col>
                    <Col span={8}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/settings/dscvr-points")}>
                            <MotionImage src={"/feature_icon/dscvr_points_nft.jpg"} />
                            <p>Points-based rules</p>
                        </Flex>
                    </Col>
                    <Col span={8}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/settings/existing-assets-based")}>
                            <MotionImage src={"/feature_icon/asset-based-rules.jpg"} />
                            <p>Assets-based rules</p>
                        </Flex>
                    </Col>
                    <Col span={8}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true}  onClick={() => router.push("/nft/settings/plugin")}>
                            <MotionImage src={"/feature_icon/nft-with-plugin.jpg"} />
                            <p>Plugin Settings</p>
                        </Flex>
                    </Col>
                    

                </Row>
            </Flex>
    )
}