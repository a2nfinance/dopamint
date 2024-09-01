
import { useAppSelector } from "@/controller/hooks";
import { useDBStreakRule } from "@/hooks/useDBStreakRule";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { formStyle } from "@/theme/layout";
import { Alert, Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";

export const StreakRuleForm = () => {
    const { getNFTTemplates } = useDBTemplate();
    const { templates } = useAppSelector(state => state.template);
    const { saveStreakRule } = useDBStreakRule()
    const onFinish = (values: any) => {
        saveStreakRule(values);
    }
    useEffect(() => {
        getNFTTemplates();
    }, [])
    return (
        <Form layout="vertical" initialValues={{ streak_range: [1, 10], min_multiplier: [0, 10] }} onFinish={onFinish} style={formStyle}>
            <Card>
                <Alert type="info" message={"Followers can mint new NFTs based on their streak and multiplier"} showIcon />
                <br />
                <Form.Item label={"Name"} name={"name"} rules={[{ required: true, message: "Missing name" }]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label={"Description"} name={"description"} rules={[{ required: true, message: "Missing description" }]}>
                    <Input size="large" />
                </Form.Item>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label={"Minimum streak"} name={"min_streak"} rules={[{ required: true, message: "Missing minimum number of streaks" }]}>
                            <Input size="large" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Maximum streak"} name={"max_streak"} rules={[{ required: true, message: "Missing maximum number of streaks" }]}>
                            <Input size="large" type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label={"Minimum multiplier"} name={"min_multiplier"} rules={[{ required: true, message: "Missing minimum number of multiplier" }]}>
                            <Input size="large" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Maximum multiplier"} name={"max_multiplier"} rules={[{ required: true, message: "Missing maximum number of multiplier" }]}>
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

                <Button htmlType="submit" size="large" type="primary" block>Submit</Button>
            </Card>

        </Form>
    )
}