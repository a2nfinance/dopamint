import { SettingOutlined, UserAddOutlined } from '@ant-design/icons';
import { Button, Divider, Flex, Layout } from 'antd';
import { useRouter } from 'next/router';
import React from "react";
// import { ConnectWallet } from './common/ConnectWallet';
const { Header, Sider, Content, Footer } = Layout;

interface Props {
    children: React.ReactNode | React.ReactNode[];
}

export const MobileLayoutProvider = (props: Props) => {
    const router = useRouter();
    return (
        <Layout>
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
            <Footer style={{ textAlign: 'center' }}>

            <Flex gap={"middle"} align='center' justify='center'>
                   
                   <Button size='large' icon={<SettingOutlined />} type='primary' onClick={() => router.push("/")}>Follower settings</Button>
                   <Button size='large' icon={<UserAddOutlined />} type='primary'>NFT minting</Button>
               </Flex>

            </Footer>
        </Layout>
    )

}
