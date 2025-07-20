import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import Lottie from 'lottie-react';

import UseAuth from '../../hooks/UseAuth';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const { login, loginWithGoogle } = UseAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    try {
      await login(data.email, data.password);
      Swal.fire('Success!', 'Logged in successfully', 'success');
      reset();
      navigate('/dashboard');
    } catch (error) {
        console.error(error);
      Swal.fire('Oops!', 'Invalid email or password', 'error');
    }
  };

  const handleGoogle = async () => {
    try {
      await loginWithGoogle();
      Swal.fire('Success!', 'Logged in with Google', 'success');
      navigate('/dashboard');
    } catch (error) {
        console.log(error);
      Swal.fire('Error!', 'Google sign-in failed', 'error');
    }
  };

  return (
  
      <div className="w-full md:w-1/2 max-w-md bg-base-300 rounded-xl p-8 shadow-xl border border-base-200">
        <h2 className="text-2xl font-bold mb-6 text-center">Login to FoodSave</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full input input-bordered bg-white"
          />
          {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full input input-bordered bg-white"
          />
          {errors.password && <p className="text-red-500 text-sm">{errors.password.message}</p>}

          <button type="submit" className="btn btn-primary w-full">Login</button>
        </form>

        <div className="divider text-secondary">OR</div>
        <button
          type="button"
          className="btn btn-outline btn-accent w-full flex items-center gap-2"
          onClick={handleGoogle}
        >
          <FcGoogle size={24} />
          Login with Google
        </button>

        <p className="mt-4 text-center text-sm text-base-content">
          Don’t have an account? <a href="/register" className="text-secondary">Register</a>
        </p>
      </div>
  
  );
};

export default Login;
