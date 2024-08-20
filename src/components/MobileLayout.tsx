import { SettingOutlined } from '@ant-design/icons';
import { Button, Flex, Layout } from 'antd';
import { useRouter } from 'next/router';
import React from "react";
import { ConnectWalletButton } from './ConnectWalletButton';
const { Header, Sider, Content, Footer } = Layout;

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const MobileLayoutProvider = (props: Props) => {
    const router = useRouter();
    return (
        <Layout>
            <Header>
                <Flex gap={"middle"} align='center' justify='space-between' style={{padding: "10px 0 0"}}>

                    <Button size='large' icon={<SettingOutlined />} type='primary' onClick={() => router.push("/")}>Follower NFT settings</Button>
                    <ConnectWalletButton />
                </Flex>
            </Header>
            <Content
                style={{
                    margin: '20px 16px 20px 16px',
                    padding: 16,
                    boxSizing: "border-box",
                    marginRight: "auto",
                    marginLeft: "auto",
                    width: "100%"
                }}
            >
                {props.children}

            </Content>
            {/* <Footer style={{ textAlign: 'center' }}>

                <Flex gap={"middle"} align='center' justify='center'>

                    <Button size='large' icon={<SettingOutlined />} type='primary' onClick={() => router.push("/")}>Follower NFT settings</Button>
                    <ConnectWalletButton />
                </Flex>

            </Footer> */}
        </Layout>
    )

}
