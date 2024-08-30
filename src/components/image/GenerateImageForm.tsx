import { useAppSelector } from "@/controller/hooks";
import { useDBGeneratedImage } from "@/hooks/useDBGeneratedImage";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { GeneratedImages } from "./GeneratedImages";

export const GenerateImageForm = () => {
    const { generateImage } = useDBGeneratedImage()
    const { image } = useAppSelector(state => state.image);
    const { generateImageAction } = useAppSelector(state => state.process);

    const onFinish = (values: any) => {
        generateImage(values);
    }
    return (
        <Row gutter={12}>
            <Col span={12}>
                <Form layout="vertical" initialValues={{ size: "256x256" }} onFinish={onFinish}>
                    <Card>
                        <Form.Item label={"Prompt"} name={"prompt"}>
                            <Input type="text" size="large"/>
                        </Form.Item>
                        <Form.Item label={"Size"} name={"size"}>
                            <Select options={[
                                { label: "256x256", value: "256x256" },
                                { label: "512x512", value: "512x512" },
                                { label: "1024x1024", value: "1024x1024" }
                            ]} size="large" />
                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="primary" block htmlType="submit" loading={generateImageAction}>Generate</Button>
                        </Form.Item>
                    </Card>
                </Form>
            </Col>
            <Col span={12}>
                {image && <GeneratedImages image={image} />}
            </Col>

        </Row>
    )
}