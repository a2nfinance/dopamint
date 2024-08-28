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
                        <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/settings/dscvr-points")}>
                            <MotionImage src={"/feature_icon/dscvr_points_nft.jpg"} />
                            <p>DSCVR points-based</p>
                        </Flex>
                    </Col>
                    <Col span={8}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/settings/streak")}>
                         
                            <MotionImage src={"/feature_icon/streak_nft.jpg"} />
                            <p>Streak-based</p>
                        </Flex>
                    </Col>

                    <Col span={8}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/settings/existing-assets-based")}>
                            <MotionImage src={"/feature_icon/dscvr_points_nft.jpg"} />
                            <p>Existing assets-based</p>
                        </Flex>
                    </Col>
                    <Col span={8}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true}  onClick={() => router.push("/nft/settings/plugin")}>
                            <MotionImage src={"/feature_icon/dscvr_points_nft.jpg"} />
                            <p>Plugin Settings</p>
                        </Flex>
                    </Col>
                    <Col span={8}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/upload")}>
                            <MotionImage src={"/feature_icon/AI_tools_2.jpg"} />
                            <p>AI tools</p>
                        </Flex>
                    </Col>

                </Row>
            </Flex>
    )
}