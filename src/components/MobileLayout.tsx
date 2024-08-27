import { useAppSelector } from '@/controller/hooks';
import { useCanvasClient } from '@/hooks/useCanvasClient';
import { AppstoreOutlined } from '@ant-design/icons';
import { Image, Layout, Menu, theme } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from "react";
import { CiCircleList } from "react-icons/ci";
import { GoGift } from "react-icons/go";
import { LuActivity, LuBrain, LuLayoutTemplate } from "react-icons/lu";
import { RiNftLine } from "react-icons/ri";
const { Sider, Content} = Layout;

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const MobileLayoutProvider = (props: Props) => {
    const router = useRouter();
    const { isContentCreator } = useAppSelector(state => state.user);
    const {resizeObserver} = useCanvasClient();
    useEffect(() => {
        resizeObserver();
    }, []);
    const {
        token: { colorBgContainer },
    } = theme.useToken();
    return (
        <Layout>
            {isContentCreator && <Sider width={150} collapsed={true} style={{ background: colorBgContainer }}>
                <div style={{ height: 50, margin: 16 }}>
                    {
                        <Image src={"/icon.png"} alt="DeTrain" preview={false} width={50} height={50} />
                    }
                </div>

                <Menu
                    style={{ fontWeight: 600, border: 0 }}
                    inlineIndent={10}
                    mode="inline"
                    defaultSelectedKeys={['2']}
                    items={[
                        {
                            key: '2',
                            icon: <AppstoreOutlined />,
                            label: "Home",
                            onClick: () => router.push("/")
                        },
                        {
                            key: '3',
                            icon: <LuLayoutTemplate />,
                            label: "NFT templates",
                            onClick: () => router.push("/nft/templates")
                        },
                        {
                            key: '4',
                            icon: <GoGift />,
                            label: "Points-based rule",
                            onClick: () => router.push("/nft/settings/dscvr-points")
                        },
                        {
                            key: '5',
                            icon: <LuActivity />,
                            label: "Streak-based rule",
                            onClick: () => router.push("/nft/settings/streak")
                        },
                        {
                            key: '6',
                            icon: <RiNftLine />,
                            label: "Existing assets-based rule",
                            onClick: () => router.push("/nft/settings/existing-assets-based")
                        },
                        {
                            key: '7',
                            icon: <CiCircleList />,
                            label: "Plugin Settings",
                            onClick: () => router.push("/nft/settings/plugin")
                        },
                        {
                            key: '8',
                            icon: <LuBrain />,
                            label: "AI tools",
                            onClick: () => router.push("/nft/ai-tools")
                        },
                    ]}
                />
            </Sider>}

            <Content
                style={{
                    margin: '0px 16px 0 0',
                    padding: 16,
                    boxSizing: "border-box",
                    marginRight: "auto",
                    marginLeft: "auto",
                    width: "100%"
                }}
            >
                {props.children}

            </Content>
        </Layout>
    )

}
