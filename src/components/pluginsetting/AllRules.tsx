import { useAppSelector } from "@/controller/hooks";
import { useDBPluginSetting } from "@/hooks/useDBPluginSetting";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { headStyle } from "@/theme/layout";
import { DeleteOutlined, EyeOutlined } from "@ant-design/icons";
import { Button, Card, Col, Collapse, Descriptions, Divider, Input, Modal, Row, Space, Spin } from "antd";
import { useCallback, useEffect, useState } from "react";
import { DetailTemplate } from "../templates/DetailTemplate";

const TextArea = Input.TextArea;

export const AllRules = () => {
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [selectedId, setSelectedId] = useState("");
    const [templateId, setTemplateId] = useState("")

    const { getAllRules, deleteRule } = useDBPluginSetting();
    const { getNFTTemplateById } = useDBTemplate();
    const { settings } = useAppSelector(state => state.plugin);
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

    const handleViewDetail = useCallback(async (nft_template_id) => {
        await getNFTTemplateById(nft_template_id);
        setIsDetailModalOpen(true);
    }, [])
    return (
        <Spin spinning={loadAllRulesAction}>
            <Row gutter={12}>
                {
                    settings.map((r, index) => {
                        return <Col span={12} key={index}>
                            <Card title={r.name} styles={{ header: headStyle }} extra={
                                <Button icon={<DeleteOutlined />} onClick={() => { setSelectedId(r._id); setIsDeleteModalOpen(true) }}></Button>
                            }>
                                <Descriptions layout="vertical" column={1}>
                                    <Descriptions.Item label={"Description"}>
                                        {r.description}
                                    </Descriptions.Item>

                                    <Descriptions.Item label={"Custom data"}>
                                        <Collapse style={{ width: "100%", height: "auto" }} items={[{
                                            key: '1',
                                            label: 'Detail',
                                            children: <TextArea value={JSON.stringify(r.custom_data)} contentEditable={false} />,
                                        },]} />
                                    </Descriptions.Item>
                                </Descriptions>
                                <Divider />
                                <Descriptions column={2} layout="vertical">

                                    <Descriptions.Item label={"NFT template"}>
                                        <Button type="dashed" icon={<EyeOutlined />} onClick={() => handleViewDetail(r.nft_template_id)}>View detail</Button>
                                    </Descriptions.Item>
                                    <Descriptions.Item label={"Priority"}>
                                        {r.priority}
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