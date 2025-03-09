import { useSelector } from 'react-redux'
import NoPermission from './NoPermission'
import { selectAuthUser } from '../../features/auth/authSlice'
import { ReactNode } from 'react'

interface PermissionCheckProps {
  children: ReactNode
  protectedRole?: string[]
}

const PermissionCheck = ({ children, protectedRole }: PermissionCheckProps) => {
  const user = useSelector(selectAuthUser)
  if (!protectedRole) return children
  const roleAccess = user.userData?.isAdmin ? 'true' : 'false'
  if (user.userData && protectedRole.some((role) => roleAccess === role)) {
    return children
  }
  return <NoPermission />
}

export default PermissionCheck
