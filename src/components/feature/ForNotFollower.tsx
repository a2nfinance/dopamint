import { Col, Flex, Modal, Row, Skeleton } from "antd"
import { useEffect, useState } from "react"

export const ForNotFollower = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    useEffect(() => {
        setIsModalOpen(true);
    }, [])
    return (
        <>
            <Flex gap={"middle"} align="center" justify="center">
                <Row gutter={8}>
                    {[0, 1, 2, 3, 4, 5].map((t, index) => (<Col span={8} key={`placeholder-col-${index}`}>
                        <Flex align="center" className="feature-logo-wrapper" vertical={true}>
                            <Skeleton.Image active={true} style={{ minWidth: "150px", minHeight: "150px" }} />
                            <br/>
                        </Flex>
                    </Col>))
                    }
                </Row>
            </Flex>

            <Modal title="Access exclusive NFTs" open={isModalOpen} footer={false} onCancel={() => setIsModalOpen(false)}>
                <p>Follow this content creator to see which exclusive NFTs you can mint!</p>
            </Modal>
        </>
    )
}