import { useAppSelector } from "@/controller/hooks";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { Card, Col, Flex, Image, Row } from "antd";
import { useEffect } from "react";

export const MyTemplates = () => {
    const { templates } = useAppSelector(state => state.template);
    const { getNFTTemplates } = useDBTemplate();
    useEffect(() => {
        getNFTTemplates();
    }, [])
    return (
       

            <Row gutter={12}>
                {templates.map((t, index) => <Col key={`template-${index}`} span={8}>
                    <Flex align="center" className="my-nft-template-wrapper" vertical={true}>
                        <Image src={t.image} preview={false} className="nft-template-image"/>
                        <p>{t.name}</p>
                    </Flex>
                    </Col>
                    )
                }
            </Row>
      
    )
}