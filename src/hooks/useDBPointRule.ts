import { useAppDispatch } from "@/controller/hooks";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { useCanvasClient } from "./useCanvasClient";
import { updatePointRuleState } from "@/controller/pointRule/pointRuleSlice";
import { MESSAGE_TYPE, openNotification } from "@/utils/noti";
import { deleteRuleFailMessage, deleteRuleSuccessMessage, newRuleFailMessage, newRuleSuccessMessage } from "@/config/message";

export const useDBPointRule = () => {
    const { initializeCanvas } = useCanvasClient();
    const dispatch = useAppDispatch();
    const savePointRule = async (values: FormData) => {
        try {
            dispatch(updateActionStatus({ actionName: actionNames.newRuleAction, value: true }))
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
                openNotification("New rule", newRuleSuccessMessage, MESSAGE_TYPE.SUCCESS);
                getAllRules();
            }
        } catch (e) {
            openNotification("New rule", newRuleFailMessage, MESSAGE_TYPE.ERROR);
            console.log(e);
        }
        dispatch(updateActionStatus({ actionName: actionNames.newRuleAction, value: false }))
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
            dispatch(updatePointRuleState({ key: "rules", value: res }));
            dispatch(updateActionStatus({ actionName: actionNames.loadAllRulesAction, value: false }))
        }
    }

    const deleteRule = async (_id: string) => {
        try {
            let state = await initializeCanvas(false);
            if (!state.user) return;
            if (state.user.id) {
                dispatch(updateActionStatus({ actionName: actionNames.deleteRuleAction, value: true }))
                await fetch("/api/point-rules/delete", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ owner: state.user.id, _id: _id })
                })
                dispatch(updateActionStatus({ actionName: actionNames.deleteRuleAction, value: false }));
                openNotification("Delete rule", deleteRuleSuccessMessage, MESSAGE_TYPE.SUCCESS);
                getAllRules();
            }
        } catch (e) {
            console.log(e);
            openNotification("Delete rule", deleteRuleFailMessage, MESSAGE_TYPE.SUCCESS);
        }

    }

    return { savePointRule, getAllRules, deleteRule }
}