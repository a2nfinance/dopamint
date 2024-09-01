import { useAppSelector } from "@/controller/hooks";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { Col, Flex, Image, Row, Spin, Tooltip } from "antd";
import { useEffect } from "react";

export const MyTemplates = () => {
    const { templates } = useAppSelector(state => state.template);
    const { loadMyTemplatesAction } = useAppSelector(state => state.process);
    const { getNFTTemplates } = useDBTemplate();
    useEffect(() => {
        getNFTTemplates();
    }, [])
    return (

        <Spin spinning={loadMyTemplatesAction}>

            <Row gutter={12}>
                {templates.map((t, index) => <Col key={`template-${index}`} span={8}>
                    <Flex align="center" className="my-nft-template-wrapper" vertical={true}>
                        <Image src={t.image} preview={true} className="nft-template-image" />
                        <Tooltip title={t.description}><p>{t.name}</p></Tooltip>
                    </Flex>
                </Col>
                )
                }
            </Row>
        </Spin>



    )
}