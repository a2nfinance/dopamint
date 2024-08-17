import { useDBTemplate } from "@/hooks/useDBTemplate";
import { Button, Card, Form, Input } from "antd"

export const TemplateForm = () => {
    const {saveNFTTemplate} = useDBTemplate();
    const onFinish = (values: FormData) => {
        saveNFTTemplate(values);
    }
    return (
        <Card title={"New template"}>
            <Form layout="vertical" onFinish={onFinish}>
                <Form.Item label="Name" name={"name"}>
                    <Input placeholder="Name" size="large" />
                </Form.Item>
                <Form.Item label="Description" name={"description"}>
                    <Input placeholder="Description" size="large" />
                </Form.Item>
                <Form.Item label="Image" name={"image"}>
                    <Input placeholder="Image" size="large" />
                </Form.Item>
                <Form.Item label="Animation URL" name={"animation_url"}>
                    <Input placeholder="Animation URL" size="large" />
                </Form.Item>
                <Form.Item label="External URL" name={"external_url"}>
                    <Input placeholder="Animation URL" size="large" />
                </Form.Item>
                <Button htmlType="submit" size="large" type="primary" block>Save</Button>
            </Form>
        </Card>
    )
}