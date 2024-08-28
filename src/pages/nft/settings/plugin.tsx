import { AllRules } from "@/components/pluginsetting/AllRules";
import { SettingForm } from "@/components/pluginsetting/SettingForm";
import { Tabs, TabsProps } from "antd";

export default function Plugin() {
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
            label: 'New Settings',
            children: <SettingForm />,
        }
    ];
    return (
        <Tabs centered defaultActiveKey="1" items={items} onChange={onChange} />
    )
}