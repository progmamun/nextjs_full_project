// app/sign-in/[[...sign-in]]/page.tsx
import { SignIn } from "@clerk/nextjs";

export default function SignInPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <SignIn fallbackRedirectUrl={'/dashboard'}/>
    </div>
  );
}