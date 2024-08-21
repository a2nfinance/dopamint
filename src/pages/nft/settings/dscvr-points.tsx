import { AllRules } from "@/components/dscvrpoints/AllRules";
import { PointRuleForm } from "@/components/dscvrpoints/PointRuleForm";
import { Tabs, TabsProps } from "antd";

export default function DSCVRPoints() {
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
            children: <PointRuleForm />,
        }
    ];
    return (
        <Tabs defaultActiveKey="1"  items={items} onChange={onChange} />
    )
}