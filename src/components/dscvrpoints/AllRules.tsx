import { useAppSelector } from "@/controller/hooks";
import { useDBPointRule } from "@/hooks/useDBPointRule"
import { headStyle } from "@/theme/layout";
import { DeleteFilled, DeleteOutlined, EyeOutlined, FundViewOutlined } from "@ant-design/icons";
import { Button, Card, Col, Descriptions, Row, Spin } from "antd";
import { useEffect } from "react";
import { LuView } from "react-icons/lu";

export const AllRules = () => {
    const { getAllRules } = useDBPointRule();
    const { rules } = useAppSelector(state => state.pointRule);
    const { loadAllRulesAction } = useAppSelector(state => state.process);
    useEffect(() => {
        getAllRules();
    }, [])
    return (
        <Spin spinning={loadAllRulesAction}>
            <Row gutter={8}>
                {
                    rules.map((r, index) => {
                        return <Col span={8} key={index}>
                            <Card title={r.name} styles={{ header: headStyle }} extra={
                                <Button icon={<DeleteOutlined />}></Button>
                            }>
                                <Descriptions layout="vertical" column={1}>
                                    <Descriptions.Item label={"Description"}>
                                        {r.description}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={"DSCVR Points"}>
                                        Min: {r.min_point} Max: {r.max_point}
                                    </Descriptions.Item>
                                    <Descriptions.Item label={"NFT template"}>
                                        <Button type="dashed" icon={<EyeOutlined />}>View detail</Button>
                                    </Descriptions.Item>
                                </Descriptions>
                            </Card>
                        </Col>
                    })
                }

            </Row>
        </Spin>

    )
}