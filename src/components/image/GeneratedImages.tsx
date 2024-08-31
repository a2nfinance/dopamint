import { LinkOutlined } from "@ant-design/icons"
import { Card, Divider, Image, Input } from "antd"

export const GeneratedImages = ({image}: {image: any}) => {
    return(
        <Card>
            {
                image?.map((i, index) => {
                    return <div key={`generated_image_${index}`}>
                    <Image src={i.url} key={`image-${index}`} preview={true}/>
                    <Divider />
                    <Input value={i.url} size="large" contentEditable={false} addonAfter={<LinkOutlined />} />
                    </div>
                })
            }
        </Card>
    )
}