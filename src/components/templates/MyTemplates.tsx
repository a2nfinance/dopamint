import { useAppSelector } from "@/controller/hooks";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { InfoCircleFilled, InfoOutlined } from "@ant-design/icons";
import { Col, Flex, Image, Modal, Row, Spin, Tooltip } from "antd";
import { useCallback, useEffect, useState } from "react";
import { DetailTemplate } from "./DetailTemplate";

export const MyTemplates = () => {
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const { templates, template } = useAppSelector(state => state.template);
    const { loadMyTemplatesAction } = useAppSelector(state => state.process);
    const { getNFTTemplates, getNFTTemplateById } = useDBTemplate();
    useEffect(() => {
        getNFTTemplates();
    }, [])

    const handleViewDetail = useCallback(async (nft_template_id) => {
        await getNFTTemplateById(nft_template_id);
        setIsDetailModalOpen(true);
    }, [])
    return (

        <Spin spinning={loadMyTemplatesAction}>

            <Row gutter={12}>
                {templates.map((t, index) => <Col key={`template-${index}`} span={8}>
                    <Flex align="center" className="my-nft-template-wrapper" vertical={true}>
                        <Image src={t.image} preview={true} className="nft-template-image" />
                        <Tooltip title={t.description}><p>{t.name} <InfoCircleFilled onClick={() => handleViewDetail(t._id)} /></p></Tooltip>
                    </Flex>
                </Col>
                )
                }
            </Row>
            <Modal title="NFT template" open={isDetailModalOpen} footer={false} onCancel={() => setIsDetailModalOpen(false)}>
                {
                    template && <DetailTemplate template={template} />
                }

            </Modal>
        </Spin>



    )
}