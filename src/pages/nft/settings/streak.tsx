import { useUMI } from "@/hooks/useUMI";
import { Button } from "antd";

export default function StreakBasedNFTSettings() {
    const { createAsset, getAsset } = useUMI();
    const onFinish = () => {
        createAsset();
    }
    const fetchAssetHandler = () => {
        getAsset("GdzDjtcJW8FYx2Mt7DFh7wkcBCHWUeEs2mXQtdDnVqRx");
    };
    return (
        <>
            <Button onClick={() => onFinish()}>Create an asset</Button>
            <Button onClick={() => fetchAssetHandler()}>Fetch an asset</Button>
        </>
    )
}