import { useAppSelector } from "@/controller/hooks";
import { GeneratedImages } from "./GeneratedImages";
import { Col, Row, Spin } from "antd";
import { useEffect } from "react";
import { useDBGeneratedImage } from "@/hooks/useDBGeneratedImage";
import { useCanvasClient } from "@/hooks/useCanvasClient";

export const AllImages = () => {
    const { initializeCanvas, state } = useCanvasClient();
    const { images } = useAppSelector(state => state.image);
    const { getList } = useDBGeneratedImage();
    const { loadGeneratedImagesAction } = useAppSelector(state => state.process)
    useEffect(() => {
        getList();
    }, [])

    const doCopy = async (url: string) => {
        try {
            if (!state.client) {
                let newState = await initializeCanvas(false);
                await newState.client?.copyToClipboard(url);

            } else {
                await state.client?.copyToClipboard(url);
            }
        } catch (e) {
            console.log(e);
        }

    }
    return (
        <Spin spinning={loadGeneratedImagesAction}>
            <Row gutter={12}>
                {
                    (images.length > 0) && images.map((i, index) => <Col key={`images-${index}`} span={12}><GeneratedImages doCopy={doCopy} image={i.image} /></Col>)
                }
            </Row>
        </Spin>
    )
}