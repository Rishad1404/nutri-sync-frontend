import { UserProfile } from "@/features/user/components/user-profile";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Profile | NutriSync",
  description: "Manage your personal profile, nutritional goals, and account security.",
};

export default function ProfilePage() {
  return (
    <div className="p-4 md:p-8">
      <UserProfile />
    </div>
  );
}
