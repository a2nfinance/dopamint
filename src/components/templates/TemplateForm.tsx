import { useDBTemplate } from "@/hooks/useDBTemplate";
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
        <Card>
            <Form layout="vertical" onFinish={onFinish}>

                <Form.Item label="Name" name={"name"}>
                    <Input placeholder="Name" size="large" />
                </Form.Item>
                <Form.Item label="Description" name={"description"}>
                    <Input placeholder="Description" size="large" />
                </Form.Item>
                <Row gutter={12}>
                    <Col span={12}>
                        <Form.Item label="Image URL" name={"image"}>
                            <Input placeholder="Image" size="large" />
                        </Form.Item>
                    </Col>

                    <Col span={12}>
                        <Form.Item label="File extension" name={"image_file_type"}>
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
                        <Form.Item label="File extension" name={"animation_file_type"}>
                            <Select size="large" options={fileTypeOptions} />
                        </Form.Item>
                    </Col>
                </Row>



                <Form.Item label="External URL" name={"external_url"}>
                    <Input placeholder="Animation URL" size="large" />
                </Form.Item>
                <Button htmlType="submit" size="large" type="primary" block>Upload to the decentralized storage</Button>
            </Form>
        </Card >
    )
}