import { checkCredentials, getByEmail } from "@/services/users";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
        session: {
            jwt: true
        },
        async authorize({email, password}) {
            const user = getByEmail(email);
            if (!user) {
                throw new Error('No User Found!');
            }
            const isValid = await checkCredentials(user, password);

            if (!isValid) {
                throw new Error('Incorrect Password.');
            }

            return {email: user.email};
        }
    })
  ],
};
export default NextAuth(authOptions);