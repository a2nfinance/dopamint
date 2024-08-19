import { useUMI } from "@/hooks/useUMI"
import { Button, Flex, Form, Input } from "antd"
export default function UMIUploader() {
    // const { uploadFromLink } = useUMI();
    const onFinish = (values: FormData) => {
        // uploadFromLink(values["image_url"])
    }
    return (
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name={"image_url"}>
                <Input size="large" />
            </Form.Item>
            <Flex justify="center" align="center" gap={"middle"}>
                <Button type="primary" size="large" htmlType="submit">Upload</Button>
            </Flex>

        </Form>
    )
}