import { Suspense } from "react";
import SignInForm from "./SignInForm";
// import SignUpForm from "./SignUpForm";

export default function SignUpPage() {
    return (
        <Suspense fallback={null}>
            <SignInForm />
        </Suspense>
    );
}