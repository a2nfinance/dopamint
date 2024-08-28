import { useAppSelector } from "@/controller/hooks";
import { useCanvasClient } from "@/hooks/useCanvasClient";
import { Spin } from "antd";
import { useEffect } from "react";
import { ForCreator } from "./feature/ForCreator";
import { ForFollower } from "./feature/ForFollower";

export const Features = () => {
    const { checkingUserFeaturesAction } = useAppSelector(state => state.process);
    const { isContentCreator } = useAppSelector(state => state.user);
    const { checIsContentCreator } = useCanvasClient();
    useEffect(() => {
        checIsContentCreator();
    }, [])
    return (
        <Spin spinning={checkingUserFeaturesAction}>

            {
                isContentCreator ? <ForCreator /> : <ForFollower />
            }

        </Spin>

    )
}