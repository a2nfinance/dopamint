import { MyTemplates } from "@/components/templates/MyTemplates";
import { TemplateForm } from "@/components/templates/TemplateForm";
import type { TabsProps } from 'antd';
import { Tabs } from "antd";
export default function Templates() {

    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'My NFT templates',
            children: <MyTemplates />,
        },
        {
            key: '2',
            label: 'New Template',
            children: <TemplateForm />,
        }
    ];
    return (
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
    )
}