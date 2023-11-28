import UsersList from "../../../components/ADMIN/UsersManagement/UsersList";

const UsersManagement = () => {
  return (
    <div className=" px-4 py-8 sm:px-8">
      <div>
        <h2 className="font-semibold text-gray-700">User Accounts</h2>
        <span className="text-xs text-gray-500">
          View accounts of registered users
        </span>
      </div>
      <div className="mt-10">
        <UsersList />
      </div>
    </div>
  );
};

export default UsersManagement;
