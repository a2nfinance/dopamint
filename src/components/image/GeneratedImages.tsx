import { Card, Image } from "antd"

export const GeneratedImages = ({image}: {image: any}) => {
    return(
        <Card>
            {
                image?.map((i, index) => {
                    return <Image src={i.url} key={`image-${index}`} />
                })
            }
        </Card>
    )
}