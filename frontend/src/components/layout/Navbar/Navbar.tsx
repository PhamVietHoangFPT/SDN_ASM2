import React, { useState, useMemo, useEffect } from 'react'
import {
  HomeOutlined,
  LoginOutlined,
  UserOutlined,
  LogoutOutlined,
  UnorderedListOutlined,
} from '@ant-design/icons'
import type { MenuProps } from 'antd'
import { Menu } from 'antd'
import { useNavigate, useLocation } from 'react-router-dom'
import Cookies from 'js-cookie'

const Navbar: React.FC = () => {
  const location = useLocation()
  const [current, setCurrent] = useState(() => {
    const path = location.pathname.split('/')[1] || 'home'
    return path
  })

  useEffect(() => {
    setCurrent(location.pathname.split('/')[1] || 'home')
  }, [location.pathname])

  const userData = Cookies.get('userData')
    ? JSON.parse(Cookies.get('userData') as string)
    : null
  const navigate = useNavigate()

  // ✅ Thêm menu con trong `items`
  const items = useMemo(() => {
    return [
      {
        key: 'home',
        icon: <HomeOutlined />, // Replace with your custom icon
        label: 'Homepage',
        url: '/',
      },
      {
        key: 'brands',
        icon: <UnorderedListOutlined />, // Replace with your custom icon
        label: 'Brands',
        url: '/brands',
      },
      {
        key: 'perfumes',
        icon: <UnorderedListOutlined />, // Replace with your custom icon
        label: 'Perfumes',
        url: '/perfumes',
      },
      {
        key: userData ? 'profile' : 'login',
        icon: userData ? <UserOutlined /> : <LoginOutlined />, // Replace with your custom icon
        label: userData ? 'Profile' : 'Login / Register',
        url: userData ? '/profile' : '/login',
      },
    ]
  }, [userData])

  const onClick: MenuProps['onClick'] = (e) => {
    setCurrent(e.key)
    const findItem = (items: any[], key: string) => {
      for (const item of items) {
        if (item.key === key) return item
        if (item.children) {
          const found: any = findItem(item.children, key)
          if (found) return found
        }
      }
      return null
    }

    const item = findItem(items, e.key)
    if (item?.url) {
      navigate(item.url)
    }
  }

  return (
    <>
      <Menu
        onClick={onClick}
        selectedKeys={[current]}
        mode='horizontal'
        style={{
          display: 'flex',
          justifyContent: 'center',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        {items.map((item) => (
          <Menu.Item key={item.key} icon={item.icon}>
            {item.label}
          </Menu.Item>
        ))}
        {userData && userData.isAdmin && (
          <Menu.Item
            key='admin'
            icon={<UserOutlined />}
            onClick={() => navigate('/admin')}
          >
            Admin
          </Menu.Item>
        )}
        {userData && (
          <Menu.Item
            key='logout'
            icon={<LogoutOutlined />} // Replace with your custom icon
            onClick={() => {
              Cookies.remove('userData')
              Cookies.remove('userToken')
              navigate('/login')
            }}
          >
            Logout
          </Menu.Item>
        )}
      </Menu>
    </>
  )
}

export default Navbar
