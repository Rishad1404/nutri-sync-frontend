import LoginForm from "@/features/auth/components/login-form";
import AuthLayout from "@/components/layout/auth-layout";

export default function Login({
  searchParams,
}: {
  searchParams?: { redirect?: string };
}) {
  return (
    <AuthLayout quote="Your body hears everything your mind says. Fuel it well.">
      <LoginForm searchParams={searchParams} />
    </AuthLayout>
  );
}
