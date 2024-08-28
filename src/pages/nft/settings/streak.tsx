import { AllRules } from "@/components/dscvrstreak/AllRules";
import { StreakRuleForm } from "@/components/dscvrstreak/StreakRuleForm";
import { useUMI } from "@/hooks/useUMI";
import { Button, Tabs, TabsProps } from "antd";

export default function StreakBasedNFTSettings() {
    // const { createAsset, getAsset } = useUMI();
    // const onFinish = () => {
    //     createAsset();
    // }
    // const fetchAssetHandler = () => {
    //     getAsset("GdzDjtcJW8FYx2Mt7DFh7wkcBCHWUeEs2mXQtdDnVqRx");
    // };
    // return (
    //     <>
    //         <Button onClick={() => onFinish()}>Create an asset</Button>
    //         <Button onClick={() => fetchAssetHandler()}>Fetch an asset</Button>
    //     </>
    // )

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Rules',
            children: <AllRules />,
        },
        {
            key: '2',
            label: 'New Rule',
            children: <StreakRuleForm />,
        }
    ];
    return (
        <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
    )
}