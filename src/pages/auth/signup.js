import Form from "@/components/auth/form";
import { getSession } from "next-auth/react";
export default function SignUp () {
    const onSubmit = async (email, password) => {
        try {
            const response = await fetch("../api/auth/signUp", {
                method: "POST",
                body: JSON.stringify({email, password}),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                alert("Sign up Succesful");
            }
        } catch (err) {
            console.error(err);
        }
        
    };
    return <Form signin={false} onFormSubmit={onSubmit} />
};

export const getServerSideProps = async ({ req }) => {
    const session = await getSession({ req });
    if (session) {
      return {
        redirect: {
          destination: "./login",
          parmanent: false,
        },
      };
    }
  
    return {
      props: {
        session,
      },
    };
  };