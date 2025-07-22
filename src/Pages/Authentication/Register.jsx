import { useForm } from "react-hook-form";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";
import UseAuth from "../../hooks/UseAuth";
import { FcGoogle } from "react-icons/fc";
import axios from "axios";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";

const Register = () => {
  const axiosSecure = UseAxiosSecure();
  const { userUpdateProfile, createUser, loginWithGoogle, loading } = UseAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    const password = data.password;
    const hasCapital = /[A-Z]/.test(password);
    const hasSpecialChar = /[!@#$%^&*]/.test(password);

    if (password.length < 6 || !hasCapital || !hasSpecialChar) {
      Swal.fire(
        "Error",
        "Password must be 6+ chars, include a capital letter and a special character",
        "error"
      );
      return;
    }
    const formData = new FormData();
    formData.append("image", data.image[0]);

    const imageRes = await axios.post(
      `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_KEY}`,
      formData
    );

    const imageUrl = imageRes.data.data.display_url;

    try {
      const response = await createUser(data.email, data.password);
      userUpdateProfile({
        displayName: data.name,
        photoURL: imageUrl,
      });
      const userData = {
        name: data.name,
        email: data.email,
        mobile: data.mobile,
        photoURL: imageUrl,
        createdAt: new Date().toISOString(),
        role: "user",
        userId: response.user.uid,
      };

      await axiosSecure.post("/users", userData);
      Swal.fire("Success", "Your account has been created", "success");

      navigate("/dashboard/profile");
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message || "Registration failed", "error");
    }
  };

  const handleGoogleRegister = async () => {
    loginWithGoogle().then(async (res) => {
      const user = res.user;
      const userData = {
        name: user.displayName,
        email: user.email,
        mobile: "",
        photoURL: user.photoURL,
        createdAt: new Date().toISOString(),
        role: "user",
        userId: user.uid,
      };

      try {
        await axiosSecure.post("/users", userData);
        Swal.fire("Success", "You have registered with Google", "success");
        navigate("/dashboard/profile");
      } catch (error) {
        console.error(error);
        Swal.fire("Error", error.message || "Registration failed", "error");
      }
    });
  };

  return (
    <div className="w-full md:w-1/2 max-w-md bg-base-300 rounded-xl p-8 shadow-xl border border-base-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-primary">
        Register to FoodSave
      </h2>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Name */}
        <input
          type="text"
          placeholder="Name"
          {...register("name", {
            required: "Name is required",
            minLength: {
              value: 2,
              message: "Name must be at least 2 characters",
            },
          })}
          className="w-full input input-bordered bg-base-300 text-base-content"
        />
        {errors.name && (
          <p className="text-error text-sm">{errors.name.message}</p>
        )}

        {/* Email */}
        <input
          type="email"
          placeholder="Email"
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^\S+@\S+\.\S+$/,
              message: "Enter a valid email",
            },
          })}
          className="w-full input input-bordered bg-base-300 text-base-content"
        />
        {errors.email && (
          <p className="text-error text-sm">{errors.email.message}</p>
        )}

        {/* Image */}
        <input
          type="file"
          accept="image/*"
          {...register("image", {
            required: "Image is required",
          })}
          className="w-full file-input file-input-bordered bg-base-300 text-base-content"
        />
        {errors.image && (
          <p className="text-error text-sm">{errors.image.message}</p>
        )}

        {/* Mobile */}
        <input
          type="tel"
          placeholder="Mobile Number"
          {...register("mobile", {
            required: "Mobile number is required",
            pattern: {
              value: /^[0-9]{10,15}$/,
              message: "Enter a valid mobile number (10-15 digits)",
            },
          })}
          className="w-full input input-bordered bg-base-300 text-base-content"
        />
        {errors.mobile && (
          <p className="text-error text-sm">{errors.mobile.message}</p>
        )}

        {/* Password */}
        <input
          type="password"
          placeholder="Password"
          {...register("password", {
            required: "Password is required",
            validate: {
              minLength: (value) =>
                value.length >= 6 || "Password must be at least 6 characters",
              hasCapital: (value) =>
                /[A-Z]/.test(value) || "Must include a capital letter",
              hasSpecialChar: (value) =>
                /[!@#$%^&*]/.test(value) || "Must include a special character",
            },
          })}
          className="w-full input input-bordered bg-base-300 text-base-content"
        />
        {errors.password && (
          <p className="text-error text-sm">{errors.password.message}</p>
        )}

        <button
          type="submit"
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? (
            <span className="loading loading-spinner loading-sm"></span>
          ) : (
            "Register"
          )}
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
        Already have an account?{" "}
        <a href="/login" className="text-secondary">
          Login
        </a>
      </p>
    </div>
  );
};

export default Register;
