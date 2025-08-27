import { NextAuthOptions, User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import GithubProvider  from "next-auth/providers/github"
export const authOptions: NextAuthOptions = {
  pages: {
    signIn: "/auth/login",
  },


  session: {
    strategy: "jwt", // أفضل مع App Router
  },


  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

     async authorize(credentials): Promise<User | null> {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API}/auth/signin`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        email: credentials?.email,
        password: credentials?.password,
      }),
    });

    const payload = await res.json();
    console.log("payload from API:", payload);

    if (payload.message === "success" && payload.token) {
      const decode = JSON.parse(
        Buffer.from(payload.token.split(".")[1], "base64").toString()
      );

      return {
        id: String(decode.id),
        name: payload.user?.name ?? "",
        email: payload.user?.email ?? "",
        token: payload.token, // هيتسجل في jwt callback
      } as User;
    }

    // لو login فشل
    return null;
  } catch (error) {
    console.error("Authorize error:", error);
    return null; // مهم: عشان TypeScript ما يشتكيش
  }
}





    }),

   GithubProvider({
    clientId :  process.env.GITHUB_ID    as string  , 
    clientSecret  :process.env.GITHUB_SECRET   as  string 

  
  
  })

  ],
  secret: process.env.NEXTAUTH_SECRET,

  
  callbacks: {
async jwt({ token, user , account }) {
  if ( account?.provider==="github") {
    // تسجيل بيانات المستخدم عند أول لوجين
    token.id = user.id;
    token.name = user.name;
    token.email = user.email;
    token.role = user.role;
    token.image = user.image;
    token.token = user.token;
  }

  
  if (account?.provider === "credentials" && user) {
    token.id = user.id;
    token.name = user.name;
    token.email = user.email;
    token.role = user.role;
    token.image = user.image;
    token.token = user.token; // ده من API بتاعك
  }

  return token;
},


    async session({ session, token }) {
 if (token) {
    session.user = {
      id: token.id as string,
      name: token.name as string,
      email: token.email as string,
      role: token.role as string | "",   // ممكن undefined في حالة GitHub
      image: token.image as string | undefined,
      token: token.token as string | undefined, // مش هيكون موجود مع GitHub
    };
  }
  return session;
}

  
  },
};


