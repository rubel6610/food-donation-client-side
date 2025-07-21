import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import UseAxiosSecure from "../../hooks/UseAxiosSecure";
import Swal from "sweetalert2";

const Users = () => {
  const axiosSecure = UseAxiosSecure();
const [search,setSearch]=useState('')
  const { data: users = [], refetch, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("/users");
      return res.data;
    },
  });
  const filteredUsers = users.filter(user=>user.name.includes(search) || user.email.includes(search))

  const handleUpdateRole = async (email, newRole) => {
    try {
      const res = await axiosSecure.patch(`/users?email=${email}`, {
        role: newRole,
      });
      if (res.data.modifiedCount > 0) {
        Swal.fire("Success", `${newRole} role assigned`, "success");
        refetch();
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", "Failed to update role", "error");
    }
  };

  const handleDeleteUser = async (email) => {
    const confirm = await Swal.fire({
      title: "Are you sure?",
      text: "User will be deleted permanently!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete",
    });

    if (confirm.isConfirmed) {
      try {
        const res = await axiosSecure.delete(`/users?email=${email}`);
        if (res.data.deletedCount > 0) {
          Swal.fire("Deleted!", "User has been removed.", "success");
          refetch();
        }
      } catch (error) {
        console.log(error);
        Swal.fire("Error", "Failed to delete user", "error");
      }
    }
  };

  return (
    <div className="overflow-x-auto p-4">
      <h2 className="text-2xl font-bold mb-4">All Users</h2>
      <input type="text" onChange={(e)=>setSearch(e.target.value)} className=" input input-bordered bg-white text-black my-2" placeholder="Search Users" />
      <table className="table w-full border rounded-lg">
        <thead className="bg-accent text-white">
          <tr>
            <th>#</th>
            <th>Name</th>
            <th>Email</th>
            <th>Role</th>
            <th>Make Admin</th>
            <th>Make Restaurant</th>
            <th>Make Charity</th>
            <th>Delete</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user, idx) => (
            <tr key={user._id} className="hover:bg-secondary">
              <td>{idx + 1}</td>
              <td>{user.name || "N/A"}</td>
              <td>{user.email}</td>
              <td className="capitalize">{user.role || "user"}</td>
        
                  <td>
                    <button
                  onClick={() => handleUpdateRole(user.email, "admin")}
                  disabled={user.role === "admin"}
                  className={`btn btn-sm bg-blue-500 text-white hover:bg-blue-600 disabled:bg-gray-400 ${user.role === "admin" && "hidden"   }`}
                >
                  Make Admin
                </button>
                </td>
              
          
              <td>
                <button
                  onClick={() => handleUpdateRole(user.email, "restaurant")}
                  disabled={user.role === "restaurant" }
                  className={`btn btn-sm bg-green-500 text-white hover:bg-green-600  disabled:bg-gray-400 ${user.role === "restaurant" && "hidden" }`}
                >
                  Make Restaurant
                </button>
              </td>
              <td>
                {user.role === "user" ? (
                <button
                  onClick={() => handleUpdateRole(user.email, "charity")}
                  disabled={user.role === "charity" }
                  className={`btn btn-sm bg-amber-500 text-white hover:bg-amber-600 disabled:bg-gray-400 ${user.role === "charity" && "hidden"}`}
                >
                  Make Charity
                </button>
                ): (
                   <button
                  onClick={() => handleUpdateRole(user.email, "user")}
                  disabled={user.role === "user" }
                  className={`btn btn-sm bg-amber-500 text-white hover:bg-amber-600 disabled:bg-gray-400 ${user.role === "user" && "hidden"}`}
                >
                  Make user
                </button>
                )}
              
              </td>
              <td>
                <button
                  onClick={() => handleDeleteUser(user.email)}
                  className="btn btn-sm bg-red-500 text-white hover:bg-red-600"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isLoading && <p className="text-center mt-4">Loading users...</p>}
    </div>
  );
};

export default Users;
