import LoginRegisterLayout from '../components/layout/LoginRegisterLayout'
import MainLayout from '../components/layout/MainLayout'
import { ManagerLayout } from '../components/layout/ManagerLayout'
import Admin from '../Pages/Admin/Admin'
import Brands from '../Pages/Brands/Brands'
import BrandsManager from '../Pages/Brands/BrandsManager'
import Homepage from '../Pages/Home/Home'
import Login from '../Pages/Login/Login'
import ManagePerfumes from '../Pages/Perfumes/ManagePerfume'
import ManagePerfumeDetail from '../Pages/Perfumes/ManagePerfumeDetail'
import PerfumeDetail from '../Pages/Perfumes/PerfumeDetail'
import Perfumes from '../Pages/Perfumes/Perfumes'
import ChangePassword from '../Pages/Profile/ChangePassword'
import EditProfile from '../Pages/Profile/EditProfile'
import ProfilePage from '../Pages/Profile/ProfilePage'
import Register from '../Pages/Register/Register'
import { LayoutRoute } from '../types/routes'

const routes: LayoutRoute[] = [
  {
    layout: MainLayout,
    data: [
      {
        path: '/',
        component: Homepage,
        exact: true,
      },
      {
        path: '/profile',
        component: ProfilePage,
      },
      {
        path: '/profile/editProfile',
        component: EditProfile,
      },
      {
        path: '/profile/changePassword',
        component: ChangePassword,
      },
      {
        path: '/brands',
        component: Brands,
      }, 
      {
        path: '/perfumes/:perfumesId',
        component: PerfumeDetail,
      }, 
      {
        path: '/perfumes',
        component: Perfumes,
      }
    ],
  },
  {
    layout: LoginRegisterLayout,
    data: [
      {
        path: '/login',
        component: Login,
      },
      {
        path: '/register',
        component: Register,
      },
    ],
  },
  {
    layout: ManagerLayout,
    data: [
      {
        path: '/admin',
        component: Admin,
        role: ['true'],
      },
      {
        path: '/admin/brands',
        component: BrandsManager,
        role: ['true'],
      },
      {
        path: '/admin/perfumes',
        component: ManagePerfumes,
        role: ['true'],
      },
      {
        path: '/admin/perfumes/:perfumesId',
        component: ManagePerfumeDetail,
        role: ['true'],
      }
    ]
  }
]

export default routes
