import { useAppSelector } from "@/controller/hooks";
import { useDBPointRule } from "@/hooks/useDBPointRule";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { formStyle } from "@/theme/layout";
import { Alert, Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";

export const PointRuleForm = () => {
    const { getNFTTemplates } = useDBTemplate();
    const { savePointRule } = useDBPointRule();
    const { templates } = useAppSelector(state => state.template);
    const { newRuleAction } = useAppSelector(state => state.process);
    const onFinish = (values: any) => {
        savePointRule(values);
    }

    useEffect(() => {
        getNFTTemplates();
    }, [])
    return (

        <Form layout="vertical" initialValues={{ range: [20, 50] }} style={formStyle} onFinish={onFinish}>
            <Card>
                <Alert type="info" message={"Followers can mint new NFTs based on their DSCVR points"} showIcon />
                <br />
                <Form.Item label={"Name"} name={"name"} rules={[{ required: true, message: "Missing name" }]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label={"Description"} name={"description"} rules={[{ required: true, message: "Missing description" }]}>
                    <Input size="large" />
                </Form.Item>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label={"Minimum DSCVR point"} name={"min_point"} rules={[{ required: true, message: "Missing minimum DSCVR points" }]}>
                            <Input size="large" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Maximum DSCVR point"} name={"max_point"} rules={[{ required: true, message: "Missing maximum DSCVR points" }]}>
                            <Input size="large" type="number" />
                        </Form.Item>
                    </Col>
                </Row>


                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label={"NFT template"} name={"nft_template_id"} rules={[{ required: true, message: "Missing template" }]}>
                            <Select size="large" options={templates.map(t => ({
                                label: t.name,
                                value: t._id
                            }))} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Registered user since"} name={"user_create_from"} rules={[{ required: true, message: "Missing registered user since" }]}>
                            <DatePicker size="large" />
                        </Form.Item>
                    </Col>
                </Row>


                <Button htmlType="submit" loading={newRuleAction} type="primary" size="large" block>Submit</Button>
            </Card>
        </Form>
    )
}