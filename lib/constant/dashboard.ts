import type {
  DashboardSidebarMenuGroup,
  IconMapKey,
} from "@/components/dashboard/dashboard-sidebar";

const COMMON_SETTINGS: DashboardSidebarMenuGroup = {
  label: "Settings",
  items: [
    {
      title: "My Profile",
      url: "/dashboard/my-profile",
      icon: "User" as IconMapKey,
    },
    {
      title: "Change Password",
      url: "/dashboard/change-password",
      icon: "Lock" as IconMapKey,
    },
  ],
};

const SITE_NAVIGATION: DashboardSidebarMenuGroup = {
  label: "Site Navigation",
  items: [
    {
      title: "Back to Home",
      url: "/",
      icon: "Home" as IconMapKey,
    },
  ],
};

export const ADMIN: DashboardSidebarMenuGroup[] = [
  {
    label: "Admin Console",
    items: [
      {
        title: "Admin Dashboard",
        url: "/dashboard/admin",
        icon: "LayoutDashboard" as IconMapKey,
      },
      {
        title: "User Management",
        url: "/dashboard/admin/users",
        icon: "Users" as IconMapKey,
      },
    ],
  },
  {
    label: "Self Care",
    items: [
      {
        title: "My Activity",
        url: "/dashboard/activity",
        icon: "Activity" as IconMapKey,
      },
      {
        title: "AI Analyzer",
        url: "/dashboard/ai",
        icon: "Brain" as IconMapKey,
      },
    ],
  },
  {
    label: "Content Moderation",
    items: [
      {
        title: "My Recipes",
        url: "/dashboard/my-recipes",
        icon: "Utensils" as IconMapKey,
      },
      {
        title: "Recipe Management",
        url: "/dashboard/admin/recipes",
        icon: "Shield" as IconMapKey,
      },
    ],
  },
  {
    label: "Nutrition",
    items: [
      {
        title: "Meal Plans",
        url: "/dashboard/meal-plans",
        icon: "Apple" as IconMapKey,
      },
    ],
  },
  COMMON_SETTINGS,
  SITE_NAVIGATION,
];

export const USER: DashboardSidebarMenuGroup[] = [
  {
    label: "Personal",
    items: [
      {
        title: "My Dashboard",
        url: "/dashboard",
        icon: "LayoutDashboard" as IconMapKey,
      },
      {
        title: "My Activity",
        url: "/dashboard/activity",
        icon: "Activity" as IconMapKey,
      },
      {
        title: "Saved Items",
        url: "/dashboard/favorites",
        icon: "Heart" as IconMapKey,
      },
    ],
  },
  {
    label: "Nutrition",
    items: [
      {
        title: "Meal Plans",
        url: "/dashboard/meal-plans",
        icon: "Apple" as IconMapKey,
      },
      {
        title: "Recipes",
        url: "/dashboard/my-recipes",
        icon: "Utensils" as IconMapKey,
      },
      {
        title: "AI Analyzer",
        url: "/dashboard/ai",
        icon: "Brain" as IconMapKey,
      },
    ],
  },
  COMMON_SETTINGS,
  SITE_NAVIGATION,
];

export const sidebar = {
  ADMIN,
  USER,
};
