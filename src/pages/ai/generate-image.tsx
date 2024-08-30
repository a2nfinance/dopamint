import { AllImages } from "@/components/image/AllImages";
import { GenerateImageForm } from "@/components/image/GenerateImageForm";
import { Tabs, TabsProps } from "antd";

export default function GenerateImage() {
    const onChange = (key: string) => {
        console.log(key);
    };

    const items: TabsProps['items'] = [
        {
            key: '1',
            label: 'Generated Image',
            children: <AllImages />,
        },
        {
            key: '2',
            label: 'New Image',
            children: <GenerateImageForm />,
        }
    ];
    return (
        <Tabs centered defaultActiveKey="1"  items={items} onChange={onChange} />
    )
}