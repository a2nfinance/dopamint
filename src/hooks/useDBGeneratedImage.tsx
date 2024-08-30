import { useAppDispatch } from "@/controller/hooks";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { useCanvasClient } from "./useCanvasClient";
import { MESSAGE_TYPE, openNotification } from "@/utils/noti";
import { generateImageFailMessage, generateImageSuccessMessage } from "@/config/message";
import { updateImageState } from "@/controller/image/imageSlice";

export const useDBGeneratedImage = () => {
    const { initializeCanvas } = useCanvasClient();
    const dispatch = useAppDispatch();
    const generateImage = async (values: FormData) => {
        try {
            dispatch(updateActionStatus({ actionName: actionNames.generateImageAction, value: true }))
            let state = await initializeCanvas(false);
            if (!state.user) return;
            if (state.user.id) {
                let req = await fetch("/api/image/generate", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ ...values, owner: state.user.id })
                })
                let res = await req.json();
                dispatch(updateImageState({key: "image", value: res}))
                openNotification("Generate images", generateImageSuccessMessage, MESSAGE_TYPE.SUCCESS);
                getList();
            }
        } catch (e) {
            openNotification("Generate images", generateImageFailMessage, MESSAGE_TYPE.ERROR);
            console.log(e);
        }
        dispatch(updateActionStatus({ actionName: actionNames.generateImageAction, value: false }))
    }
    const getList= async () => {
         let state = await initializeCanvas(false);
        if (!state.user) return;
        if (state.user.id) {
            dispatch(updateActionStatus({ actionName: actionNames.loadGeneratedImagesAction, value: true }))
            let req = await fetch("/api/image/getList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ owner: state.user.id })
            })
            let res = await req.json();
            dispatch(updateImageState({ key: "images", value: res }));
            dispatch(updateActionStatus({ actionName: actionNames.loadGeneratedImagesAction, value: false }))
        }
    }

    return { generateImage, getList }
}