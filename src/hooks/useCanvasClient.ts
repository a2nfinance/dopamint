import { validateHostMessage } from "@/lib/dscvr";
import { CanvasClient, CanvasInterface } from "@dscvr-one/canvas-client-sdk";
import {
  registerCanvasWallet
} from "@dscvr-one/canvas-wallet-adapter";
import { useEffect, useRef, useState } from "react";
type CanvasState = {
  client: CanvasClient | undefined;
  user: CanvasInterface.Lifecycle.User | undefined;
  content: CanvasInterface.Lifecycle.Content | undefined;
  isReady: boolean;
};
let client: CanvasClient;
export function useCanvasClient() {
  const [state, setState] = useState<CanvasState>({
    client: undefined,
    user: undefined,
    content: undefined,
    isReady: false,
  });
  const initializationStartedRef = useRef(false);
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

  useEffect(() => {
    if (initializationStartedRef.current) return;
    initializationStartedRef.current = true;
    initializeCanvas(true);
    // return () => {
    //   // if (state.client) {
    //   //   state.client.destroy();
    //   // }
    // };
  }, []);

  return { state, initializeCanvas };
}