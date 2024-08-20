import { useAppSelector } from "@/controller/hooks";
import { Spin } from "antd";
import { useRouter } from "next/router";
import { ForCreator } from "./feature/ForCreator";
import { ForFollower } from "./feature/ForFollower";
import { useEffect } from "react";
import { useCanvasClient } from "@/hooks/useCanvasClient";

export const Features = () => {
    const { checkingUserFeaturesAction } = useAppSelector(state => state.process);
    const { isContentCreator } = useAppSelector(state => state.user);
    const { checIsContentCreator } = useCanvasClient();
    // const { state } = useCanvasClient();
    // useResizeObserver(state.client);
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