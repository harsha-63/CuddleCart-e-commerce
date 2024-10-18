import { useContext } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import { NavLink } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";

const Users = () => {
  const { users } = useContext(UserContext);

  return (
    <>
      <div className="container mx-auto px-4 py-6">
        <h2 className="text-4xl font-semibold mb-6 text-gray-800 text-center">Customer List</h2>
        <div className="overflow-x-auto shadow-md sm:rounded-lg">
          <table className="min-w-full text-left text-sm text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-gray-100">
              <tr>
                <th className="py-3 px-6">ID</th>
                <th className="py-3 px-6">Profile</th>
                <th className="py-3 px-6">Name</th>
                <th className="py-3 px-6">Role</th>
                <th className="py-3 px-6">Action</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user?.id} className="bg-white border-b hover:bg-gray-50">
                  <td className="py-4 px-6 font-medium text-gray-900">{user?.id}</td>
                  <td className="py-4 px-6">
                  <FontAwesomeIcon icon={faUser} size="lg" />
                  </td>
                  <td className="py-4 px-6">{user?.name}</td>
                  <td className="py-4 px-6">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        user?.isAdmin ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                      }`}
                    >
                      {user?.isAdmin ? 'Admin' : 'User'}
                    </span>
                  </td>
                  <td className="py-4 px-6">
                    <NavLink to={`/action/${user?.id}`}>
                      <button className="bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded">
                        Edit
                      </button>
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default Users;
