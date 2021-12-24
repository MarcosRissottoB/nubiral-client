import { Form, Button} from 'semantic-ui-react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { registerApi } from '../../../pages/api/user';
import { useState, useEffect } from 'react';

interface Props {
  showLoginForm: React.MouseEventHandler<HTMLButtonElement>;
  onCloseModal: React.MouseEventHandler<HTMLButtonElement>;
}

type User = {
  username: string;
  email: string;
}
export default function RegisterForm({showLoginForm}: Props) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setloading] = useState(false);

  const makeRegister = async (formData: object) => {
    setloading(true);
    const userData = await registerApi(formData);
    localStorage.setItem('userData', userData);
    setUser(userData);
    setloading(false);
  }
  
  useEffect(() => {
    if(user) showLoginForm;
  }, [user]);

  const formik = useFormik({
    initialValues: initialValues(),
    validationSchema:Yup.object({
      username: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required(),
    }),
    onSubmit: async (formData) => makeRegister(formData)
  })

  return (
    <div>
      {user ?
        <div>
          <h3>Usuario guardado</h3>
          <span>Username: {user.username}</span>
          <br />
          <span>Email: {user.email}</span>
        </div>
        : <div>
            <h2>Registro</h2>
          <Form className="login-form" onSubmit={formik.handleSubmit}>
            <Form.Input 
              name="username"
              type="text"
              placeholder="Username"
              onChange={formik.handleChange}
              error={formik.errors.username}
            />
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
              <Button onClick={showLoginForm}>Iniciar sesión</Button>
              <Button type="submit" loading={loading}>Registrar</Button>
            </div>
          </Form>
        </div>
      }
    </div>
  )
}

function initialValues(){
  return {
    username: '',
    email: '',
    password: ''
  }
}
