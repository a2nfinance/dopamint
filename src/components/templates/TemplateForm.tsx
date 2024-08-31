import { useDBTemplate } from "@/hooks/useDBTemplate";
import { formStyle } from "@/theme/layout";
import { Button, Card, Col, Form, Input, Row, Select } from "antd"
const fileTypeOptions: { label: string, value: string }[] = [
    { label: "PNG", value: "png" },
    { label: "JPEG", value: "jpeg" },
    { label: "GIF", value: "gif" },
    { label: "SVG", value: "svg" },
];
export const TemplateForm = () => {
    const { saveNFTTemplate } = useDBTemplate();
    const onFinish = (values: FormData) => {
        saveNFTTemplate(values);
    }
    return (

        <Form layout="vertical" onFinish={onFinish} style={formStyle}>
            <Card>
                <Form.Item label="Name" name={"name"} rules={[{required: true, message: "Missing name"}]}>
                    <Input placeholder="Name" size="large" />
                </Form.Item>
                <Form.Item label="Description" name={"description"} rules={[{required: true, message: "Missing description"}]}>
                    <Input placeholder="Description" size="large" />
                </Form.Item>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Image URL" name={"image"} rules={[{required: true, message: "Missing image"}]}>
                            <Input placeholder="Image" size="large" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="Extension" name={"image_file_type"} rules={[{required: true, message: "Missing extension"}]}>
                            <Select size="large" options={fileTypeOptions} />
                        </Form.Item>
                    </Col>
                </Row>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Animation URL" name={"animation_url"}>
                            <Input placeholder="Animation URL" size="large" />
                        </Form.Item>
                    </Col>
                    <Col span={12}>
                        <Form.Item label="External URL" name={"external_url"}>
                            <Input placeholder="Animation URL" size="large" />
                        </Form.Item>
                    </Col>
                </Row>




                <Button htmlType="submit" size="large" type="primary" block>Upload to the decentralized storage</Button>
            </Card>
        </Form>
    )
}