import { useAppSelector } from "@/controller/hooks";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { Card, Col, Flex, Image, Row, Tooltip } from "antd";
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
                        <Image src={t.image} preview={true} className="nft-template-image"/>
                        <Tooltip title={t.description}><p>{t.name}</p></Tooltip>
                    </Flex>
                    </Col>
                    )
                }
            </Row>
      
    )
}