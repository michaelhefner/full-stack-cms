import exp from "constants";

type Session = {
    data: {
      id: string;
      isAdmin: boolean;
    }
  }
  const isAdmin = ({ session }: { session?: Session }) => Boolean(session?.data.isAdmin);

  export { isAdmin}