import LoginForm from "@/features/auth/components/login-form";
import AuthLayout from "@/components/layout/auth-layout";

export default async function Login(props: {
  searchParams: Promise<{ redirect?: string }>;
}) {
  const searchParams = await props.searchParams;
  return (
    <AuthLayout quote="Your body hears everything your mind says. Fuel it well.">
      <LoginForm searchParams={searchParams} />
    </AuthLayout>
  );
}
