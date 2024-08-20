import { useCanvasClient } from "@/hooks/useCanvasClient";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { Col, Flex, Image, Row } from "antd";
import { useRouter } from "next/router";
import { motion } from "framer-motion";
const whileHoverSettings = { scale: 1, rotate: 360, opacity: 0.8 };
const whileTapSettings = {
    scale: 0.8,
    // rotate: -90,
    borderRadius: "100%"
}
export const Features = () => {
    const router = useRouter();
    const { state } = useCanvasClient();
    useResizeObserver(state.client);
    return (

        <Flex gap={"middle"} align="center" justify="center">
            <Row gutter={12}>
                <Col span={8}>
                    <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/templates")}>
                        <motion.div
                            whileHover={whileHoverSettings}
                            whileTap={whileTapSettings}
                        >
                            <Image src="/feature_icon/nft_template.jpg" className="feature-logo" preview={false} />
                        </motion.div>
                        <p>NFT Templates</p>
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/settings/dscvr-points")}>
                        <motion.div
                            whileHover={whileHoverSettings}
                            whileTap={whileTapSettings}
                        >
                            <Image src="/feature_icon/dscvr_points_nft.jpg" className="feature-logo" preview={false} />
                        </motion.div>
                        <p>DSCVR points-based</p>
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/settings/streak")}>
                        <motion.div
                            whileHover={whileHoverSettings}
                            whileTap={whileTapSettings}
                        >
                            <Image src="/feature_icon/streak_nft.jpg" preview={false} className="feature-logo" />
                        </motion.div>
                        <p>Streak-based</p>
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex align="center" className="feature-logo-wrapper" vertical={true}>
                        <motion.div
                            whileHover={whileHoverSettings}
                            whileTap={whileTapSettings}
                        >
                            <Image src="/feature_icon/dscvr_points_nft.jpg" className="feature-logo" preview={false} />
                        </motion.div>
                        <p>Whitelisting Canvas</p>
                    </Flex>
                </Col>

                <Col span={8}>
                    <Flex align="center" className="feature-logo-wrapper" vertical={true}>
                        <motion.div
                            whileHover={whileHoverSettings}
                            whileTap={whileTapSettings}
                        >
                            <Image src="/feature_icon/dscvr_points_nft.jpg" className="feature-logo" preview={false} />
                        </motion.div>
                        <p>Existing assets-based</p>
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex align="center" className="feature-logo-wrapper" vertical={true} onClick={() => router.push("/nft/upload")}>
                        <motion.div
                            whileHover={whileHoverSettings}
                            whileTap={whileTapSettings}
                        >
                            <Image src="/feature_icon/AI_tools_2.jpg" preview={false} className="feature-logo" />
                        </motion.div>
                        <p>AI tools</p>
                    </Flex>
                </Col>

            </Row>
        </Flex>

    )
}