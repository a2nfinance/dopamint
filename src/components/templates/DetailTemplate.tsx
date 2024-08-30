import { Descriptions, Image } from "antd"

export const DetailTemplate = ({template}:{template: any}) => {
    return (
        <>
        <Descriptions layout="vertical" column={1}>
                    <Descriptions.Item label={"Name"}>{template.name}</Descriptions.Item>
                    <Descriptions.Item label={"Description"}>{template.description}</Descriptions.Item>
                    <Descriptions.Item label={"Image"}>
                        <Image src={template.image} />
                    </Descriptions.Item>
                 </Descriptions>
        </>
    )
}