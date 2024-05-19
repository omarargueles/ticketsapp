import UserForm from "@/components/UserForm";
import prisma from "@/prisma/db";

interface Props {
  params: { id: string };
}

const EditUser = async ({ params }: Props) => {
  const user = await prisma?.user.findUnique({
    where: {
      id: parseInt(params.id),
    },
  });

  user.password = "";

  if (!user) {
    return <p className="text-destructive">User not found!</p>;
  }

  return <UserForm user={user} />;
};

export default EditUser;
