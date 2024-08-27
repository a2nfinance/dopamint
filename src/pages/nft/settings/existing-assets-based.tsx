import { AllRules } from "@/components/assetrule/AllRules";
import { AssetRuleForm } from "@/components/assetrule/AssetRuleForm";
import { Tabs, TabsProps } from "antd";

export default function ExistingAssetRules() {
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
            children: <AssetRuleForm />,
        }
    ];
    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    )
}