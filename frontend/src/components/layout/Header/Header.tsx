import { Layout } from 'antd'
import Logo from '../../../assets/Logo.jpg'

const { Header } = Layout

const CustomHeader = () => {
  return (
    <Header
      style={{
        background: '#000',
        padding: '20px 40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)',
        height: 'auto',
      }}
    >
      {/* Logo */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
        <img
          src={Logo}
          alt='Perfume Store Logo'
          style={{ width: '120px', borderRadius: '10px' }}
        />
        <div
          style={{
            color: 'white',
            fontSize: '24px',
            fontWeight: 'bold',
            fontFamily: '"Playfair Display", serif',
          }}
        >
          LUXE FRAGRANCE
        </div>
      </div>
      {/* Slogan */}
      <div
        style={{
          color: '#d4af37',
          fontSize: '16px',
          fontStyle: 'italic',
          fontFamily: '"Playfair Display", serif',
        }}
      >
        "Elegance in Every Scent"
      </div>
    </Header>
  )
}

export default CustomHeader
