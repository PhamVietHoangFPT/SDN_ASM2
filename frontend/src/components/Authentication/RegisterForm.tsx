import { useRegisterMutation } from '../../features/auth/authApi'
import { Formik, Field } from 'formik'
import * as Yup from 'yup'
import {
  Input,
  Button,
  Form as AntdForm,
  Select,
  InputNumber,
  notification,
} from 'antd'
import { useNavigate } from 'react-router-dom'

export function RegisterForm() {
  const [register, { isLoading }] = useRegisterMutation()
  const navigate = useNavigate()

  interface FieldType {
    email: string
    name: string
    password: string
    retypePassword: string
    YOB: number
    gender: boolean
  }

  const initialValues: FieldType = {
    email: '',
    name: '',
    password: '',
    retypePassword: '',
    YOB: 0,
    gender: true,
  }

  const validationSchema = Yup.object({
    email: Yup.string()
      .email('Invalid email')
      .required('Please enter your email!'),
    name: Yup.string().required('Please enter your username!'),
    password: Yup.string()
      .min(6, 'Password must be at least 6 characters')
      .required('Please enter your password!'),
    retypePassword: Yup.string()
      .oneOf([Yup.ref('password'), undefined], 'Passwords do not match')
      .required('Please re-enter your password!'),
    YOB: Yup.number()
      .typeError('Year of birth must be a number')
      // .min(1900, 'Year of birth must be greater than 1900')
      .max(
        new Date().getFullYear(),
        `Year of birth cannot be greater than ${new Date().getFullYear()}`
      )
      .required('Please enter your year of birth!'),
    gender: Yup.boolean().required('Please select your gender'),
  })

  const onFinish = async (
    values: FieldType,
    { resetForm }: { resetForm: () => void }
  ) => {
    try {
      await register({
        email: values.email,
        password: values.password,
        name: values.name,
        YOB: values.YOB,
        gender: values.gender,
      }).unwrap()
      notification.success({
        message: 'Registration successful',
        description: 'Please log in to continue',
      })
      resetForm()
    } catch (error: any) {
      notification.error({
        message: 'Registration failed',
        description:
          error.data?.message || 'An error occurred, please try again later',
      })
    }
  }

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onFinish}
    >
      {({ handleSubmit, errors, touched }) => (
        <AntdForm
          style={{
            width: 'auto',
            padding: 24,
            background: '#fff',
            borderRadius: 8,
            boxShadow: '0px 4px 10px rgba(0,0,0,0.1)',
          }}
          onFinish={handleSubmit}
        >
          {/* Email */}
          <AntdForm.Item
            validateStatus={errors.email && touched.email ? 'error' : ''}
            help={touched.email && errors.email}
            required
          >
            <Field as={Input} name='email' placeholder='Enter email' />
          </AntdForm.Item>

          {/* Username */}
          <AntdForm.Item
            validateStatus={errors.name && touched.name ? 'error' : ''}
            help={touched.name && errors.name}
            required
          >
            <Field as={Input} name='name' placeholder='Enter username' />
          </AntdForm.Item>

          {/* Password */}
          <AntdForm.Item
            validateStatus={errors.password && touched.password ? 'error' : ''}
            help={touched.password && errors.password}
            required
          >
            <Field
              as={Input.Password}
              name='password'
              placeholder='Enter password'
            />
          </AntdForm.Item>

          {/* Retype Password */}
          <AntdForm.Item
            validateStatus={
              errors.retypePassword && touched.retypePassword ? 'error' : ''
            }
            help={touched.retypePassword && errors.retypePassword}
            required
          >
            <Field
              as={Input.Password}
              name='retypePassword'
              placeholder='Re-enter password'
            />
          </AntdForm.Item>

          {/* Year of Birth */}
          <AntdForm.Item
            validateStatus={errors.YOB && touched.YOB ? 'error' : ''}
            help={touched.YOB && errors.YOB}
            required
          >
            <Field name='YOB'>
              {({ field, form }: any) => (
                <InputNumber
                  {...field}
                  placeholder='Enter year of birth'
                  style={{ width: '100%' }}
                  min={1900} // Giới hạn nhỏ nhất
                  max={new Date().getFullYear()} // Giới hạn lớn nhất
                  onChange={(value) => form.setFieldValue('YOB', value)} // Cập nhật Formik
                />
              )}
            </Field>
          </AntdForm.Item>

          {/* Gender */}
          <AntdForm.Item required>
            <Field as={Select} name='gender' placeholder='Select gender'>
              <Select.Option value={true}>Male</Select.Option>
              <Select.Option value={false}>Female</Select.Option>
            </Field>
          </AntdForm.Item>

          {/* Submit Button */}
          <AntdForm.Item>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <Button type='link' onClick={() => navigate('/login')}>
                Already have an account? Log in now
              </Button>
              <Button type='primary' htmlType='submit' loading={isLoading}>
                Register
              </Button>
            </div>
          </AntdForm.Item>
        </AntdForm>
      )}
    </Formik>
  )
}
