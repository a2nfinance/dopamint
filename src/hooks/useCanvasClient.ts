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
  async function initializeCanvas() {
    if (client) return;
    client = new CanvasClient();
    try {
      const response = await client.ready();
      const isValidResponse = await validateHostMessage(response);
      if (isValidResponse) {
        setState({
          client,
          user: response.untrusted.user,
          content: response.untrusted.content,
          isReady: true,
        });
        console.log("Register here")
        registerCanvasWallet(client);
      }
    } catch (error) {
      console.log("ERROR:", error);
      setState((prev) => ({ ...prev, isReady: true }));
    }
  }

  useEffect(() => {
    if (initializationStartedRef.current) return;
    initializationStartedRef.current = true;
    initializeCanvas();
    return () => {
      // if (state.client) {
      //   state.client.destroy();
      // }
    };
  }, []);

  return state;
}