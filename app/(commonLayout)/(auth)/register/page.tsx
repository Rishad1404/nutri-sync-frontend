import RegisterForm from "@/features/auth/components/register-form";
import AuthLayout from "@/components/layout/auth-layout";

export default function Register() {
  return (
    <AuthLayout quote="A healthy outside starts from the inside. Join us today.">
      <RegisterForm />
    </AuthLayout>
  );
}
