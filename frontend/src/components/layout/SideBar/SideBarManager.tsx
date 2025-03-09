import { useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { Layout, Menu, Button } from 'antd'
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  HomeOutlined,
} from '@ant-design/icons'

const { Sider } = Layout

export const SideBar = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)

  // Get the current selected keys based on the pathname
  const getSelectedKeys = () => {
    const pathname = location.pathname
    if (pathname === '/manager') return ['manager']

    // Check if pathname includes any of these paths
    const paths = [
      'appointments',
      'patients',
      'inventory',
      'vaccinations',
      'reports',
      'documents',
      'settings',
    ]

    for (const path of paths) {
      if (pathname.includes(path)) {
        // If it's a sub-path, return both parent and child keys
        const segments = pathname.split('/').filter(Boolean)
        if (segments.length > 1) {
          return [path, pathname.substring(1)] // Remove leading slash
        }
        return [path]
      }
    }

    return []
  }

  // Define the menu items
  const items = [
    {
      key: 'admin/perfumes',
      icon: <HomeOutlined />,
      label: 'Manage perfumes',
      onClick: () => navigate('/admin/perfumes'),
    },
    {
      key: 'admin/brands',
      icon: <HomeOutlined />,
      label: 'Manage brands',
      onClick: () => navigate('/admin/brands'),
    },
  ]

  return (
    <Sider
      width={250}
      collapsible
      collapsed={collapsed}
      onCollapse={setCollapsed}
      trigger={null}
      theme='light'
      style={{
        boxShadow: '0 1px 3px rgba(0,0,0,0.1)',
        height: '100vh',
        position: 'sticky',
        top: 0,
        left: 0,
      }}
    >
      {/* Logo and Title */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          padding: '16px',
          justifyContent: collapsed ? 'center' : 'space-between',
          borderBottom: '1px solid #f0f0f0',
        }}
      >
        {!collapsed && (
          <Button
            type='text'
            icon={<MenuFoldOutlined />}
            onClick={() => setCollapsed(true)}
            size='small'
          />
        )}
        {collapsed && (
          <Button
            type='text'
            icon={<MenuUnfoldOutlined />}
            onClick={() => setCollapsed(false)}
            size='small'
            style={{ marginTop: 16 }}
          />
        )}
      </div>

      {/* Navigation Menu */}
      <Menu
        mode='inline'
        selectedKeys={getSelectedKeys()}
        defaultOpenKeys={
          getSelectedKeys().length > 0 ? [getSelectedKeys()[0]] : []
        }
        style={{ borderRight: 0 }}
        items={items}
      />
    </Sider>
  )
}
