import { useAppSelector } from "@/controller/hooks";
import { useDBGeneratedImage } from "@/hooks/useDBGeneratedImage";
import { Button, Card, Col, Form, Input, Row, Select } from "antd";
import { GeneratedImages } from "./GeneratedImages";
import { useState } from "react";

export const GenerateImageForm = () => {
    const { generateImage } = useDBGeneratedImage()
    const { image } = useAppSelector(state => state.image);
    const { generateImageAction } = useAppSelector(state => state.process);
    const [selectedModel, setSelectedModel] = useState();
    const onFinish = (values: any) => {
        generateImage(values);
    }
    const imageSizeForDallE2 = [
        { label: "256x256", value: "256x256" },
        { label: "512x512", value: "512x512" },
        { label: "1024x1024", value: "1024x1024" }
    ];

    const imageSizeForDallE3 = [
        { label: "1024x1024", value: "1024x1024" },
        { label: "1024x1792", value: "1024x1792" },
        { label: "1792x1024", value: "1792x1024" }
    ]
    return (
        <Row gutter={12}>
            <Col span={12}>
                <Form layout="vertical" initialValues={{ model: "dall-e-2", size: "256x256" }} onFinish={onFinish}>
                    <Card>
                        <Form.Item label={"Prompt"} name={"prompt"} rules={[{required: true, message: "Missing prompt"}]}>
                            <Input.TextArea size="large" />
                        </Form.Item>
                        <Form.Item label={"Model"} name={"model"} rules={[{required: true, message: "Missing model"}]}>
                            <Select size="large" options={[
                                { label: "Dall-e-2", value: "dall-e-2" },
                                { label: "Dall-e-3", value: "dall-e-3" },
                            ]} onChange={(value) => setSelectedModel(value)} />
                        </Form.Item>
                        <Form.Item help={`You can use your own OpenAI project API key. If you use the default API key, services can be unavailable due to a limited rates.`} 
                        label={"Your OpenAI project key"} 
                        name={"open_api_key"}>
                            <Input size="large" />
                        </Form.Item>
                        
                        <Form.Item label={"Size"} name={"size"} rules={[{required: true, message: "Missing size"}]}>
                            <Select options={selectedModel === "dall-e-2" ? imageSizeForDallE2 : imageSizeForDallE3} size="large" />
                        </Form.Item>

                        <Form.Item>
                            <Button size="large" type="primary" block htmlType="submit" loading={generateImageAction}>Generate</Button>
                        </Form.Item>
                    </Card>
                </Form>
            </Col>
            <Col span={12}>
                {image ? <GeneratedImages image={image} /> : <Card loading={generateImageAction}></Card>}
            </Col>

        </Row>
    )
}