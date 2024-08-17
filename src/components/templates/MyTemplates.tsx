import { useAppSelector } from "@/controller/hooks";
import { useCanvasClient } from "@/hooks/useCanvasClient";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { Card, Col, Flex, Image, Row } from "antd";
import { useEffect } from "react"

export const MyTemplates = () => {
    const {user} = useCanvasClient();
    const { templates } = useAppSelector(state => state.template);
    const { getNFTTemplates } = useDBTemplate();
    useEffect(() => {
        getNFTTemplates();
    }, [user?.id])
    return (
        <Card title="All templates">

            <Row gutter={12}>
                {templates.map((t, index) => <Col key={`template-${index}`} span={8}>
                    <Flex align="center" vertical={true}>
                        <Image src={t.image} preview={false} width={100} />
                        <p>{t.name}</p>
                    </Flex>
                    </Col>
                    )
                }
            </Row>
        </Card>
    )
}