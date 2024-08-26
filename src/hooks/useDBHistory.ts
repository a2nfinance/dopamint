import { useAppDispatch } from "@/controller/hooks";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { useCanvasClient } from "./useCanvasClient";

export const useDBHistory = () => {
    const { initializeCanvas } = useCanvasClient();
    const dispatch = useAppDispatch();
    const saveHistory = async (values: FormData) => {
        let state = await initializeCanvas(false);
        if (!state.user) return;
        if (state.user.id) {
            let req = await fetch("/api/history/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ ...values, owner: state.user.id })
            })
            let res = await req.json();
            console.log(res);

            // Dispatch process createTemplateAction end here.
            // refetch template list

        }
    }
    const getByUserIdAndMetadata = async () => {
        let state = await initializeCanvas(false);
        if (!state.user) return;
        if (state.user.id) {
            console.log("state.user", state.user);
            dispatch(updateActionStatus({ actionName: actionNames.loadMyTemplatesAction, value: true }))
            let req = await fetch("/api/history/getByUserIdAndMetadata", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ owner: state.user.id })
            })
            let res = await req.json();
            console.log("res", res);
            // dispatch(setTemplateList(res));
            // dispatch(updateActionStatus({ actionName: actionNames.loadMyTemplatesAction, value: false }))
        }
    }

    return { saveHistory, getByUserIdAndMetadata }
}