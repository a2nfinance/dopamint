import { useAppSelector } from "@/controller/hooks";
import { useDBAssetRule } from "@/hooks/useDBAssetRule";
import { useDBTemplate } from "@/hooks/useDBTemplate";
import { formStyle } from "@/theme/layout";
import { Alert, Button, Card, Form, Input, Select } from "antd";
import { useEffect } from "react";

export const AssetRuleForm = () => {
    const { getNFTTemplates } = useDBTemplate();
    const { saveAssetRule } = useDBAssetRule();
    const { templates } = useAppSelector(state => state.template);
    const onFinish = (values: any) => {
        saveAssetRule(values);
    }

    useEffect(() => {
        getNFTTemplates();
    }, [])
    return (

        <Form layout="vertical" initialValues={{ range: [20, 50] }} style={formStyle} onFinish={onFinish}>
            <Card>
                <Alert type="info" message={"Followers can mint new NFTs based on their existing NFTs with specific metadata_uri."} showIcon />
                <br />
                <Form.Item label={"Name"} name={"name"} rules={[{ required: true, message: "Missing name" }]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label={"Description"} name={"description"} rules={[{ required: true, message: "Missing description" }]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label={"Metadata URI"} name={"metadata_uri"} rules={[{ required: true, message: "Missing metadata URI of a NFT" }]}>
                    <Input size="large" />
                </Form.Item>
                <Form.Item label={"NFT template"} name={"nft_template_id"} rules={[{ required: true, message: "Missing template" }]}>
                    <Select size="large" options={templates.map(t => ({
                        label: t.name,
                        value: t._id
                    }))} />
                </Form.Item>
                <Button htmlType="submit" type="primary" size="large" block>Submit</Button>
            </Card>
        </Form>
    )
}