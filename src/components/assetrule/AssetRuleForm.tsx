import { useAppSelector } from "@/controller/hooks";
import { useDBAssetRule } from "@/hooks/useDBAssetRule";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { formStyle } from "@/theme/layout";
import { Button, Card, Col, DatePicker, Form, Input, Row, Select, Slider } from "antd";
import { useEffect } from "react";

export const AssetRuleForm = () => {
    const {getNFTTemplates} = useDBTemplate();
    const {saveAssetRule} = useDBAssetRule();
    const {templates} = useAppSelector(state => state.template);
    const onFinish = (values: any) => {
        saveAssetRule(values);
    }

    useEffect(() => {
        getNFTTemplates();
    }, [])
    return (

        <Form layout="vertical" initialValues={{ range: [20, 50] }} style={formStyle}  onFinish={onFinish}>
            <Card>
                <Form.Item label={"Name"} name={"name"}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label={"Description"} name={"description"}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label={"Point range"} name={"range"}>
                    <Slider min={1} max={100000} step={10}  range />
                </Form.Item>
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


                <Button htmlType="submit" type="primary" size="large" block>Submit</Button>
            </Card>
        </Form>
    )
}