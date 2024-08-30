import { useAppSelector } from "@/controller/hooks";
import { useDBPointRule } from "@/hooks/useDBPointRule";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { formStyle } from "@/theme/layout";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select } from "antd";
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
                <Form.Item label={"Name"} name={"name"}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label={"Description"} name={"description"}>
                    <Input size="large" />
                </Form.Item>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label={"Minimum DSCVR point"} name={"min_point"}>
                            <Input size="large" type="number" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label={"Maximum DSCVR point"} name={"max_point"}>
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


                <Button htmlType="submit" loading={newRuleAction} type="primary" size="large" block>Submit</Button>
            </Card>
        </Form>
    )
}