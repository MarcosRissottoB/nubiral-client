import { Form, Button,} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { loginApi } from '../../../pages/api/user';
import { useState, useEffect } from 'react';
import useAuth from '../../../hooks/useAuth';
import MessageAlert from '../../MessageAlert/MessageAlert';

interface Props {
  showLoginForm: React.MouseEventHandler<HTMLButtonElement>;
  onCloseModal: React.MouseEventHandler<HTMLButtonElement>;
}

type User = {
  username: string;
  email: string;
}

export default function LoginForm({showLoginForm}: Props) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');
  const { login } = useAuth();

  const makeLogin = async (formData: object) => {
    setLoading(true);
    // const {user, token} = await loginApi(formData);
    const response: any = await loginApi(formData);
    console.log('login response', response.message);
    setMessage(response.message);
    // login(token)
    setUser(user);
    setLoading(false);
  }
  
  useEffect(() => {}, [user]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema:Yup.object({
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (formData) => {
      setLoading(true);
      const response = await makeLogin(formData);
      console.log('login onSubmit response', response);
      setLoading(false);
    }
  })

  return (
    <div>
      {user ?
        <div>
          <h3>Usuario Logueado</h3>
          <span>Username: {user.username}</span>
          <br />
          <span>Email: {user.email}</span>
        </div>
        : <div>
            <h2>Login</h2>
          <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
              name="email"
              type="text"
              placeholder="Email"
              onChange={formik.handleChange}
              error={formik.errors.email}
            />
            <Form.Input 
              name="password"
              type="password"
              placeholder="Password"
              onChange={formik.handleChange}
              error={formik.errors.password}
            />
            <div className="actions">
              <Button onClick={showLoginForm}>Registrar</Button>
              <Button type="submit" loading={loading}>Iniciar sesión</Button>
            </div>
            {message && <MessageAlert message={message}/>}
          </Form>
        </div>
      }
    </div>
  )
}

function initialValues(){
  return {
    email: '',
    password: ''
  }
}