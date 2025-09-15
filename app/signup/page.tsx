// app/signup/page.tsx
import SignupForm from "./SignupForm";

import { signup } from "@/app/actions/signup"; // Server Action

export default function SignupPage() {
  return <SignupForm signupAction={signup} />;
}
