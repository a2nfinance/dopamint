import { useAppSelector } from "@/controller/hooks";
import { useDBAssetRule } from "@/hooks/useDBAssetRule";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { headStyle } from "@/theme/layout";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Modal, Row, Space, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { DetailTemplate } from "../templates/DetailTemplate";
import { useCanvasClient } from "@/hooks/useCanvasClient";

export const AllRules = () => {
    const {initializeCanvas} = useCanvasClient();
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [templateId, setTemplateId] = useState("")

    const { getAllRules, deleteRule } = useDBAssetRule();
    const { getNFTTemplateById } = useDBTemplate();
    const { rules } = useAppSelector(state => state.asset);
    const { template } = useAppSelector(state => state.template);
    const { loadAllRulesAction, deleteRuleAction } = useAppSelector(state => state.process);
    useEffect(() => {
        getAllRules();
    }, [])
    const handleDelete = useCallback(async () => {
        if (selectedId) {
            await deleteRule(selectedId);
            setIsDeleteModalOpen(false);
        }
    }, [selectedId])

    const handleViewDetail = useCallback(async () => {
        await getNFTTemplateById(templateId);
        setIsDetailModalOpen(true);
    }, [templateId])
    const openLink = useCallback(async (link:string) => {
        let state = await initializeCanvas(false);
        state.client?.openLink(link);
    }, [])
    return (
        <Spin spinning={loadAllRulesAction}>
            <Row gutter={8}>
                {
                    rules.map((r, index) => {
                        return <Col span={8} key={index}>
                            <Card title={r.name} styles={{ header: headStyle }} extra={
                                <Button icon={<DeleteOutlined />} onClick={() => { setSelectedId(r._id); setIsDeleteModalOpen(true) }}></Button>
                            }>
                                <Descriptions layout="vertical" column={1}>
                                    <Descriptions.Item label={"Description"}>
                                        {r.description}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={"Metadata URI"}>
                                        <Button  type="dashed" icon={<EyeOutlined />} onClick={() => openLink(r.metadata_uri)}>View detail</Button>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={"NFT template"}>
                                        <Button type="dashed" icon={<EyeOutlined />} onClick={() => { setTemplateId(r.nft_template_id); handleViewDetail() }}>View detail</Button>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                    })
                }

            </Row>
            <Modal title="Delete rule" open={isDeleteModalOpen} footer={false} onCancel={() => setIsDeleteModalOpen(false)}>
                <p>Are you sure to delete this rule?</p>
                <Space>
                    <Button type="primary" onClick={() => handleDelete()} loading={deleteRuleAction}>Ok</Button>
                    <Button onClick={() => setIsDeleteModalOpen(false)}>Cancel</Button>
                </Space>
            </Modal>

            <Modal title="NFT template" open={isDetailModalOpen} footer={false} onCancel={() => setIsDetailModalOpen(false)}>
                {
                    template && <DetailTemplate template={template} />
                }

            </Modal>
        </Spin>

    )
}