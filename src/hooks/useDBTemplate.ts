import { useAppDispatch } from "@/controller/hooks";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { setTemplate, setTemplateList } from "@/controller/template/templateSlice";
import { useCanvasClient } from "./useCanvasClient";

export const useDBTemplate = () => {
    const { initializeCanvas } = useCanvasClient();
    const dispatch = useAppDispatch();
    const saveNFTTemplate = async (values: FormData) => {

        let state = await initializeCanvas(false);
        if (!state.user) return;
        if (state.user.id) {

            let req = await fetch("/api/nft-templates/create", {
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
    const getNFTTemplates = async () => {
        let state = await initializeCanvas(false);
        if (!state.user) return;
        if (state.user.id) {
            console.log("state.user", state.user);
            dispatch(updateActionStatus({ actionName: actionNames.loadMyTemplatesAction, value: true }))
            let req = await fetch("/api/nft-templates/getList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ owner: state.user.id })
            })
            let res = await req.json();
            console.log("res", res);
            dispatch(setTemplateList(res));
            dispatch(updateActionStatus({ actionName: actionNames.loadMyTemplatesAction, value: false }))
        }
    }

    const getNFTTemplateById = async (_id: string) => {

        let req = await fetch("/api/nft-templates/getById", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ _id: _id })
        })
        let res = await req.json();
        dispatch(setTemplate(res));

    }

    return { saveNFTTemplate, getNFTTemplates, getNFTTemplateById }
}