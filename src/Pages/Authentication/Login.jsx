import { useForm } from 'react-hook-form';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router';
import UseAuth from '../../hooks/UseAuth';
import { FcGoogle } from 'react-icons/fc';

const Login = () => {
  const { login, loginWithGoogle } = UseAuth();
  const navigate = useNavigate();
  const { register, handleSubmit, formState: { errors } } = useForm();

 const onSubmit = async (data) => {
  try {
    await login(data.email, data.password);
    Swal.fire('Success!', 'Logged in successfully', 'success');
    navigate('/dashboard');
  } catch (error) {
    console.error(error);
    if (error.code === 'auth/wrong-password') {
      Swal.fire('Error!', 'Wrong password.', 'error');
    } else if (error.code === 'auth/user-not-found') {
      Swal.fire('Error!', 'No account found. Try Google Login if you signed up that way.', 'error');
    } else {
      Swal.fire('Error!', 'Login failed. Try again.', 'error');
    }
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
    <div className="min-h-screen bg-base-100 flex flex-col lg:flex-row items-center justify-center p-4">
      
  
   
      {/* Login form section */}
      <div className="w-full max-w-md bg-base-300 rounded-2xl p-8 shadow-lg border border-base-200">
        <h2 className="text-3xl font-bold mb-6 text-center text-primary">Login to FoodSave</h2>

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
          className="btn btn-outline btn-accent w-full flex items-center gap-2 justify-center"
          onClick={handleGoogle}
        >
          <FcGoogle size={24} />
          Login with Google
        </button>

        <p className="mt-4 text-center text-sm text-base-content">
          Don’t have an account? <a href="/register" className="text-secondary font-semibold">Register</a>
        </p>
      </div>
    </div>
  );
};

export default Login;
