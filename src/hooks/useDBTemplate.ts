import { useAppDispatch, useAppSelector } from "@/controller/hooks"
import { useCanvasClient } from "./useCanvasClient";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { setTemplateList } from "@/controller/template/templateSlice";
// import { setList } from "@/controller/pipeline/pipelineSlice";
// import { setFormsProps, setFormsState } from "@/controller/setup/setupFormsSlice";

export const useDBTemplate = () => {
    // const data = useAppSelector(state => state.setupForms)
    // const { address } = useChain("akash");
    const {user} = useCanvasClient();
    const dispatch = useAppDispatch();
    const saveNFTTemplate = async (values: FormData) => {
        if (!user) return;
        if (user.id) {
           
            let req = await fetch("/api/nft-templates/create", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({...values, owner: user.id})
            })
            let res = await req.json();
            
            // Dispatch process createTemplateAction end here.
            // refetch template list

        }
    }
    const getNFTTemplates = async () => {
        if (!user) return;
        if (user.id) {
            dispatch(updateActionStatus({actionName: actionNames.loadMyTemplatesAction, value: true}))
            let req = await fetch("/api/nft-templates/getList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({owner: user.id})
            })
            let res = await req.json();
            dispatch(setTemplateList(res));
            dispatch(updateActionStatus({actionName: actionNames.loadMyTemplatesAction, value: false}))
        }
    }

    return { saveNFTTemplate, getNFTTemplates }
}