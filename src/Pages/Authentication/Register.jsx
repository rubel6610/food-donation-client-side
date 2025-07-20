import React from 'react';
import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';


import UseAuth from '../../hooks/UseAuth';
import { FcGoogle } from 'react-icons/fc';

const Register = () => {
  const { createUser, loginWithGoogle, loading } = UseAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();

  const onSubmit = async (data) => {
    const password = data.password;
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < 6 || !hasCapital || !hasSpecialChar) {
      Swal.fire('Error', 'Password must be 6+ chars, include a capital letter and a special character', 'error');
      return;
    }

    try {
      await createUser(data.email, data.password);
      Swal.fire('Registered!', 'Your account has been created', 'success');
      reset();
      navigate('/dashboard');
    } catch (error) {
        console.error(error);
      Swal.fire('Error', 'Registration failed', 'error');
    }
  };

  // Google registration/login handler
  const handleGoogleRegister = async () => {
    try {
      await loginWithGoogle();
      Swal.fire('Success!', 'Logged in with Google', 'success');
      navigate('/dashboard');
    } catch (error) {
        console.error(error);
      Swal.fire('Error', 'Google sign-in failed', 'error');
    }
  };

  return (
  
     
      <div className="w-full md:w-1/2 max-w-md bg-base-300 rounded-xl p-8 shadow-xl border border-base-200">
        <h2 className="text-2xl font-bold mb-6 text-center text-primary">Register to FoodSave</h2>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            type="text"
            placeholder="Name"
            {...register("name", { required: "Name is required" })}
            className="w-full input input-bordered bg-base-300 text-base-content"
          />
          {errors.name && <p className="text-error text-sm">{errors.name.message}</p>}

          <input
            type="email"
            placeholder="Email"
            {...register("email", { required: "Email is required" })}
            className="w-full input input-bordered bg-base-300 text-base-content"
          />
          {errors.email && <p className="text-error text-sm">{errors.email.message}</p>}

          <input
            type="file"
            accept="image/*"
            {...register("image", { required: "Image is required" })}
            className="w-full file-input file-input-bordered bg-base-300 text-base-content"
          />
          {errors.image && <p className="text-error text-sm">{errors.image.message}</p>}

          <input
            type="tel"
            placeholder="Mobile Number"
            {...register("mobile", {
              required: "Mobile number is required",
              pattern: {
                value: /^[0-9]{10,15}$/,
                message: "Enter a valid mobile number",
              },
            })}
            className="w-full input input-bordered bg-base-300 text-base-content"
          />
          {errors.mobile && <p className="text-error text-sm">{errors.mobile.message}</p>}

          <input
            type="password"
            placeholder="Password"
            {...register("password", { required: "Password is required" })}
            className="w-full input input-bordered bg-base-300 text-base-content"
          />
          {errors.password && <p className="text-error text-sm">{errors.password.message}</p>}

          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <span className="loading loading-spinner loading-sm"></span> : 'Register'}
          </button>
        </form>

        <div className="divider text-secondary">OR</div>
        <button
          type="button"
          className="btn btn-outline btn-accent w-full flex items-center gap-2"
          onClick={handleGoogleRegister}
          disabled={loading}
        >
          <FcGoogle size={24} />
          Register with Google
        </button>

        <p className="mt-4 text-center text-sm text-base-content">
          Already have an account? <a href="/login" className="text-secondary">Login</a>
        </p>
      </div>

  );
};

export default Register;
