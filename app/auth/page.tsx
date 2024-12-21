import { LoginForm } from "@/components/login-form"

export default async function AuthPage() {
    return (
        <div className="flex items-center justify-center">
            <div className="w-1/4 my-36">
                <LoginForm />
            </div>
        </div>
    )
}

