import { useEffect } from 'react'
import { Outlet } from 'react-router-dom'
import { Layout, Typography } from 'antd'
import Navbar from './Navbar/Navbar'
import { SideBar } from './SideBar/SideBarManager'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
const { Header, Content, Footer } = Layout
const { Text } = Typography

export const ManagerLayout = () => {
  const navigate = useNavigate()
  const userData = Cookies.get('userData')
  useEffect(() => {
    const parsedUserData = userData ? JSON.parse(userData) : null
    if (userData && !parsedUserData.isAdmin) {
      navigate('/')
    }
  }, [userData, navigate])
  return (
    <Layout style={{ minHeight: '100vh' }}>
      <SideBar />

      <Layout>
        {/* Đặt Navbar vào Header */}
        <Header style={{ background: '#fff', padding: 0 }}>
          <Navbar />
        </Header>

        <Content style={{ margin: '24px' }}>
          <div
            style={{
              padding: 24,
              background: '#fff',
              borderRadius: 6,
              minHeight: 280,
            }}
          >
            <Outlet />
          </div>
        </Content>

        <Footer style={{ textAlign: 'center', padding: '12px 50px' }}>
          <Text type='secondary'>
            © 2025 VacciTrack Admin Portal. All rights reserved.
          </Text>
        </Footer>
      </Layout>
    </Layout>
  )
}
