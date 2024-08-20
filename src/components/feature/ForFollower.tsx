import { Col, Flex, Row } from "antd"
import { useRouter } from "next/router"
import { MotionImage } from "./MotionImage";

export const ForFollower = () => {
    const router = useRouter();
    return (
        <Flex gap={"middle"} align="center" justify="center">
            Generate NFT
        </Flex>
    )
}