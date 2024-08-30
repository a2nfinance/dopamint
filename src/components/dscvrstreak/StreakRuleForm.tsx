
import { useAppSelector } from "@/controller/hooks";
import { useDBStreakRule } from "@/hooks/useDBStreakRule";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { formStyle } from "@/theme/layout";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
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
                <Form.Item label={"Name"} name={"name"}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label={"Description"} name={"description"}>
                    <Input size="large" />
                </Form.Item>

                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label={"Minimum streak"} name={"min_streak"}>
                            <Input size="large" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Maximum streak"} name={"max_streak"}>
                            <Input size="large" type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label={"Minimum mutiplier"} name={"min_mutiplier"}>
                            <Input size="large" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Maximum mutiplier"} name={"max_mutiplier"}>
                            <Input size="large" type="number" />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label={"NFT template"} name={"nft_template_id"}>
                            <Select size="large" options={templates.map(t => ({
                                label: t.name,
                                value: t._id
                            }))} />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Created user since"} name={"user_create_from"}>
                            <DatePicker size="large" />
                        </Form.Item>
                    </Col>
                </Row>

                <Button htmlType="submit" type="primary" block>Submit</Button>
            </Card>

        </Form>
    )
}