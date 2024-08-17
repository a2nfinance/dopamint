import { useUMI } from "@/hooks/useUMI"
import { Button, Form, Input } from "antd"
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
export default function UMIUploader() {
    const { uploadFromLink } = useUMI();
    const onFinish = (values: FormData) => {
        uploadFromLink(values["image_url"])
    }
    return (
        <Form layout="vertical" onFinish={onFinish}>
            <Form.Item name={"image_url"}>
                <Input />
            </Form.Item>
            <WalletMultiButton />
            <Button type="primary" size="large" htmlType="submit">Upload</Button>
        </Form>
    )
}