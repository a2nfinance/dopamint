import { useAppSelector } from "@/controller/hooks";
import { useDBPluginSetting } from "@/hooks/useDBPluginSetting";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { formStyle } from "@/theme/layout";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Card, Col, Divider, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";

export const SettingForm = () => {
    const { getNFTTemplates } = useDBTemplate();
    const { savePluginSetting } = useDBPluginSetting();
    const { templates } = useAppSelector(state => state.template);
    const onFinish = (values: any) => {
        savePluginSetting(values);
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
                <Form.Item label={"NFT template"} name={"nft_template_id"}>
                    <Select size="large" options={templates.map(t => ({
                        label: t.name,
                        value: t._id
                    }))} />
                </Form.Item>
                <Form.List name="custom_data">
                    {(fields, { add, remove }) => (
                        <Card title={"Custom data"}>
                            {fields.map(({ key, name, ...restField }, index) => (

                                <Row key={key} style={{ display: 'flex' }} gutter={12}>
                                    <Col span={10}>
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'key']}
                                            rules={[{ required: true, message: 'Require KEY' }]}
                                        >
                                            <Input size="large" placeholder="Key" />


                                        </Form.Item>
                                    </Col>
                                    <Col span={10}>

                                        <Form.Item
                                            {...restField}
                                            name={[name, 'value']}
                                            rules={[{ required: true, message: 'Missing value' }]}
                                        >
                                            <Input size='large' placeholder="Value" />
                                        </Form.Item>

                                    </Col>
                                    <Col span={4} style={{ display: "flex", justifyContent: "center" }}>
                                        <MinusCircleOutlined onClick={() => remove(name)} style={{ paddingBottom: "25px" }} />

                                    </Col>



                                </Row>


                            ))}

                            <Form.Item>
                                <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                                    Add custom Key/Value
                                </Button>
                            </Form.Item>
                        </Card>
                    )}
                </Form.List>
                <Divider />
                <Button htmlType="submit" type="primary" size="large" block>Submit</Button>
            </Card>
        </Form>
    )
}