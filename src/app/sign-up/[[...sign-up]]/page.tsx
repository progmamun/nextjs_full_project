
// app/sign-up/[[...sign-up]]/page.tsx
import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div style={{ display: "flex", justifyContent: "center", padding: "50px" }}>
      <SignUp fallbackRedirectUrl={'/sign-in'}/>
    </div>
  );
}