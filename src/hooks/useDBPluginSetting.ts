import { useCanvasClient } from "./useCanvasClient";

export const useDBPluginSetting = () => {
    const { initializeCanvas } = useCanvasClient();
    const savePluginSetting = async (values: FormData) => {
        let state = await initializeCanvas(false);
        if (!state.user) return;
        if (state.user.id) {
            let req = await fetch("/api/plugin-settings/create", {
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
    const getPluginsByTemplateId = async (_id: string) => {

        if (_id) {
            // dispatch(updateActionStatus({ actionName: actionNames.loadMyTemplatesAction, value: true }))
            let req = await fetch("/api/plugin-settings/getAppliedPluginByTemplateId", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ _id: _id })
            })
            let res = await req.json();
            console.log("res", res);
            return res;
            // dispatch(setTemplateList(res));
            // dispatch(updateActionStatus({ actionName: actionNames.loadMyTemplatesAction, value: false }))
        }
    }

    return { savePluginSetting, getPluginsByTemplateId }
}