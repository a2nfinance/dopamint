import { MyTemplates } from "@/components/templates/MyTemplates";
import { TemplateForm } from "@/components/templates/TemplateForm";
import { Col, Divider, Row } from "antd";

export default function Templates() {
    return (
        <Row gutter={8}>
            <Col span={8}>
                <TemplateForm />
            </Col>

            <Col span={16}>
                <MyTemplates />
            </Col>
        </Row>
    )
}