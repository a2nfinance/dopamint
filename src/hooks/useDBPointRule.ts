import { useAppDispatch } from "@/controller/hooks";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { useCanvasClient } from "./useCanvasClient";
import { updatePointRuleState } from "@/controller/pointRule/pointRuleSlice";

export const useDBPointRule = () => {
    const { initializeCanvas } = useCanvasClient();
    const dispatch = useAppDispatch();
    const savePointRule = async (values: FormData) => {
        let state = await initializeCanvas(false);
        if (!state.user) return;
        if (state.user.id) {
            let req = await fetch("/api/point-rules/create", {
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
    const getAllRules = async () => {
        let state = await initializeCanvas(false);
        if (!state.user) return;
        if (state.user.id) {
            dispatch(updateActionStatus({ actionName: actionNames.loadAllRulesAction, value: true }))
            let req = await fetch("/api/point-rules/getList", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ owner: state.user.id })
            })
            let res = await req.json();
            dispatch(updatePointRuleState({key: "rules", value: res}));
            dispatch(updateActionStatus({ actionName: actionNames.loadAllRulesAction, value: false }))
        }
    }

    return { savePointRule, getAllRules }
}