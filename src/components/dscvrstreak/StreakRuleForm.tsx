
import { useAppSelector } from "@/controller/hooks";
import { useDBStreakRule } from "@/hooks/useDBStreakRule";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { Button, Col, DatePicker, Form, Input, Row, Select, Slider } from "antd";
import { useEffect } from "react";

export const StreakRuleForm = () => {
    const { getNFTTemplates } = useDBTemplate();
    const { templates } = useAppSelector(state => state.template);
    const { saveStreakRule } = useDBStreakRule()
    const onFinish = (values: any) => {
        values = {
            ...values,
            min_streak: values["streak_range"][0],
            max_streak: values["streak_range"][1],
            min_multiplier: values["mutiplier_range"][0],
            max_multiplier: values["mutiplier_range"][1],
        };
        saveStreakRule(values);
    }
    useEffect(() => {
        getNFTTemplates();
    }, [])
    return (
        <Form layout="vertical" initialValues={{ streak_range: [1, 10], min_multiplier: [0, 10] }} onFinish={onFinish}>
            <Form.Item label={"Name"} name={"name"}>
                <Input size="large" />
            </Form.Item>
            <Form.Item label={"Description"} name={"description"}>
                <Input size="large" />
            </Form.Item>
            <Form.Item label={"Streak range"} name={"streak_range"}>
                <Slider range min={1} max={1000} />
            </Form.Item>
            <Form.Item label={"Multiplier range"} name={"mutiplier_range"}>
                <Slider range min={0} max={100} />
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

            <Button htmlType="submit" type="primary" block>Submit</Button>
        </Form>
    )
}