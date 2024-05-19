import {
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { User } from "@prisma/client";
import Link from "next/link";
interface Props {
  users: User[];
}
const DataTable = ({ users }: Props) => {
  return (
    <div className="w-full mt-5">
      <div className="rounded-md sm:border">
        <table>
          <TableHeader>
            <TableRow className="bg-secondary hover:bg-secondary">
              <TableHead className="font-medioum">Name</TableHead>
              <TableHead className="font-medioum">Username</TableHead>
              <TableHead className="font-medioum">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users
              ? users.map((user) => (
                  <TableRow key={user.id} data-href="/">
                    <TableCell>
                      <Link href={`/users/${user.id}`}>{user.name}</Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/users/${user.id}`}>{user.username}</Link>
                    </TableCell>
                    <TableCell>
                      <Link href={`/users/${user.id}`}>{user.role}</Link>
                    </TableCell>
                  </TableRow>
                ))
              : null}
          </TableBody>
        </table>
      </div>
    </div>
    // <div>DataTable</div>
  );
};

export default DataTable;
