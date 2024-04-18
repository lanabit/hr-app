'use client';
import { Formik, Form, Field } from 'formik';
import { toast } from 'react-toastify';
import { loginSchema } from '../../supports/schema/loginSchema';
import { axiosInstance } from '../../config/axios';
import { useContext } from 'react';
import { UserContext } from '../../supports/context/userContext';
import { useRouter } from 'next/navigation';

export default function Login() {
  const { userData, setUserData } = useContext(UserContext);
  const router = useRouter();

  const loginHandle = async (values) => {
    try {
      const res = await axiosInstance.post('/login', values);

      console.log(res.data);
      setUserData({
        id: res.data.data.id,
        isHRAdmin: res.data.data.isHRAdmin,
        isClockedIn: false,
        isClockedOut: false,
      });

      localStorage.setItem(
        'user',
        JSON.stringify({
          id: res.data.data.id,
          isHRAdmin: res.data.data.isHRAdmin,
          isClockedIn: false,
          isClockedOut: false,
        }),
      );
      toast.success('Login Berhasil');

      router.push('/dashboard');
    } catch (error) {
      toast.error(
        error.message ? error.message : 'Login Failed Please Try Again!',
      );
    }
  };

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
      }}
      validationSchema={loginSchema}
      onSubmit={(values) => {
        loginHandle(values);
        // console.log(values);
      }}
    >
      <Form>
        <div className="flex h-screen flex-col items-center justify-center gap-2 px-[500px]">
          <label className="input input-bordered flex w-[300px] items-center gap-2">
            Email
            <Field
              type="text"
              className="grow"
              placeholder="Type your email address"
              name="email"
            />
          </label>
          <label className="input input-bordered flex w-[300px] items-center gap-2">
            Password
            <Field
              type="text"
              className="grow"
              placeholder="Type your password"
              name="password"
            />
          </label>
          <button
            type="submit"
            className="btn rounded-none bg-black text-white"
          >
            Log in
          </button>
        </div>
      </Form>
    </Formik>
  );
}
