import { useAppSelector } from "@/controller/hooks";
import { GeneratedImages } from "./GeneratedImages";
import { Col, Row } from "antd";
import { useEffect } from "react";
import { useDBGeneratedImage } from "@/hooks/useDBGeneratedImage";

export const AllImages = () => {
    const { images } = useAppSelector(state => state.image);
    const { getList } = useDBGeneratedImage();
    useEffect(() => {
        getList();
    }, [])
    return (
        <Row gutter={12}>
            {
                (images.length > 0) && images.map((i, index) => <Col span={12}><GeneratedImages key={`img-list-${index}`} image={i.image} /></Col>)
            }
        </Row>
    )
}