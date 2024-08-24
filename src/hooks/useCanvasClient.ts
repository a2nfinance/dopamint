import { useAppDispatch } from "@/controller/hooks";
import { actionNames, updateActionStatus } from "@/controller/process/processSlice";
import { updateUserState } from "@/controller/user/userSlice";
import { validateHostMessage } from "@/lib/dscvr";
import { CanvasClient, CanvasInterface } from "@dscvr-one/canvas-client-sdk";
import {
  registerCanvasWallet,
} from "@dscvr-one/canvas-wallet-adapter";
import { useState } from "react";
type CanvasState = {
  client: CanvasClient | undefined;
  user: CanvasInterface.Lifecycle.User | undefined;
  content: CanvasInterface.Lifecycle.Content | undefined;
  isReady: boolean;
};
var client: CanvasClient;
export function useCanvasClient() {
  const dispatch = useAppDispatch();
  const [state, setState] = useState<CanvasState>({
    client: undefined,
    user: undefined,
    content: undefined,
    isReady: false,
  });
  async function initializeCanvas(initCanvasWallet: boolean) {
    if (!client) {
      client = new CanvasClient();
    };

    try {
      const response = await client.ready();
      const isValidResponse = await validateHostMessage(response);

      if (isValidResponse) {
        let newState = {
          client,
          user: response.untrusted.user,
          content: response.untrusted.content,
          isReady: true,
        }
        setState(state);
        if (initCanvasWallet) {
          registerCanvasWallet(client);
        }

        return newState;
      }
    } catch (error) {
      console.log("ERROR:", error);
      setState((prev) => ({ ...prev, isReady: true }));
    }
    return state;
  }
  const destroyClient = {
    if(client) {
      client.destroy();
    }
  }
  const checIsContentCreator = async () => {
    dispatch(updateActionStatus({ actionName: actionNames.checkingUserFeaturesAction, value: true }))
    if (!client) {
      client = new CanvasClient();
    };

    try {
      const response = await client.ready();
      const isValidResponse = await validateHostMessage(response);

      if (isValidResponse) {

        let user = response.untrusted.user;
        let content = response.untrusted.content;
        let contentQuery = `{
              content(id: "${content?.id}") {
                id,
                creator {
                  id
                }
              }
        }`;
        let getContentRequest = await fetch(process.env.NEXT_PUBLIC_DSCVR_GRAPHQL!, {
          method: "POST",
          headers: {
            "Accept": "application/json, multipart/mixed",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            query: contentQuery,
            variables: {},
            operationName: null
          })
        });

        let contentRes = await getContentRequest.json();

        let creatorId = contentRes.data.content.creator.id;
        if (creatorId === user?.id) {
          dispatch(updateUserState([{ key: "isContentCreator", value: true }]));
        } else {
          let userQuery = `{
            user(id: "${user?.id}") {
              id,
              followerCount
              followingCount,
              postCount,
              iconUrl,
              createdAt,
              dscvrPoints,
              streak {
                dayCount,
                multiplierCount
              },
              isFollowing(userId: "${creatorId}")
            } 
        }`;

          let getUserInfoRequest = await fetch(process.env.NEXT_PUBLIC_DSCVR_GRAPHQL!, {
            method: "POST",
            headers: {
              "Accept": "application/json, multipart/mixed",
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              query: userQuery,
              variables: {},
              operationName: null
            })
          });
  
          let userRes = await getUserInfoRequest.json();
          let userData = userRes.data.user;
          let getAppliedRulesReq =  await fetch("/api/getAppliedNFTTemplates", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              ownerId: creatorId,
              userInfo: userData
            })
          });

          let appliedRules = await getAppliedRulesReq.json();
          console.log(appliedRules);

          dispatch(updateUserState([{ key: "user", value: userData }, {key: "appliedRules", value: appliedRules}]));

        }

      }


    } catch (error) {
      console.log("ERROR:", error);
    }
    dispatch(updateActionStatus({ actionName: actionNames.checkingUserFeaturesAction, value: false }))
  }

  const resizeObserver = async () => {
    if (!client) {
      client = new CanvasClient();
      setState({...state, client: client})
    };

    const observer = new ResizeObserver(() => client.resize());
    observer.observe(document.body);
    document.body.style.height = "auto";
  }

  return { state, initializeCanvas, checIsContentCreator, destroyClient, resizeObserver };
}