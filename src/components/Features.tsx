import { useAppSelector } from "@/controller/hooks";
import { useCanvasClient } from "@/hooks/useCanvasClient";
import { Spin } from "antd";
import { useEffect } from "react";
import { ForCreator } from "./feature/ForCreator";
import { ForFollower } from "./feature/ForFollower";
import { ForNotFollower } from "./feature/ForNotFollower";

export const Features = () => {
    const { checkingUserFeaturesAction } = useAppSelector(state => state.process);
    const { isContentCreator, user } = useAppSelector(state => state.user);
    const { checIsContentCreator } = useCanvasClient();
    useEffect(() => {
        checIsContentCreator();
    }, [isContentCreator])
    return (
        <Spin spinning={checkingUserFeaturesAction} style={{textAlign: "center"}}>
            {
                user?.id && (isContentCreator ? <ForCreator /> : (user.isFollowing ? <ForFollower /> : <ForNotFollower />) )
            }
        </Spin>

    )
}