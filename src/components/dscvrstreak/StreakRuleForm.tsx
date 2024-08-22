import { Button, DatePicker, Form, Input, Select, Slider } from "antd"

export const StreakRuleForm = () => {
    return (
        <Form layout="vertical" initialValues={{ range: [20, 50] }}>
            <Form.Item label={"Name"} name={"name"}>
                <Input size="large" />
            </Form.Item>
            <Form.Item label={"Name"} name={"description"}>
                <Input size="large" />
            </Form.Item>
            <Form.Item label={"Streak range"} name={"streak_range"}>
                <Slider range />
            </Form.Item>
            <Form.Item label={"Multiplier range"} name={"mutiplier_range"}>
                <Slider range />
            </Form.Item>
            <Form.Item label={"NFT template"} name={"nft_template"}>
                <Select size="large" options={[]} />
            </Form.Item>
            <Form.Item label={"Created user since"} name={"user_create_from"}>
                <DatePicker size="large" />
            </Form.Item>
            <Button htmlType="submit" type="primary" block>Submit</Button>
        </Form>
    )
}