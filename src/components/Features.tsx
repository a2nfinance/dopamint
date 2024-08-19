import { useCanvasClient } from "@/hooks/useCanvasClient";
import { useResizeObserver } from "@/hooks/useResizeObserver";
import { Col, Flex, Image, Row } from "antd";
import { useRouter } from "next/router";
export const Features = () => {
    const router = useRouter();
    const { client } = useCanvasClient();
    useResizeObserver(client);
    return (

        <Flex gap={"middle"} align="center" justify="center">
            <Row gutter={12}>
                <Col span={8}>
                    <Flex align="center" vertical={true} onClick={() => router.push("/nft/templates")}>
                        <Image src="/icon.png" preview={false} width={100} />
                        <p>NFT Templates</p>
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex align="center" vertical={true} onClick={() => router.push("/nft/settings/dscvr-points")}>
                        <Image src="/icon.png" preview={false} width={100} />
                        <p>DSCVR points-based NFT settings</p>
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex align="center" vertical={true}>
                        <Image src="/icon.png" preview={false} width={100} />
                        <p>Streak-based NFT settings</p>
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex align="center" vertical={true}>
                        <Image src="/icon.png" preview={false} width={100} />
                        <p>Whitelisting Canvas </p>
                    </Flex>
                </Col>

                <Col span={8}>
                    <Flex align="center" vertical={true}>
                        <Image src="/icon.png" preview={false} width={100} />
                        <p>Existing assets-based NFT</p>
                    </Flex>
                </Col>
                <Col span={8}>
                    <Flex align="center" vertical={true} onClick={() => router.push("/nft/upload")}>
                        <Image src="/icon.png" preview={false} width={100} />
                        <p>AI tools</p>
                    </Flex>
                </Col>

            </Row>
        </Flex>

    )
}