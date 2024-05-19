import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";
import DataTable from "./data-table";

const Users = async () => {
  const users = await prisma?.user.findMany();
  return (
    <div>
      <UserForm />
      <DataTable users={users} />
    </div>
  );
};

export default Users;
