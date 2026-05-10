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

export const ADMIN: DashboardSidebarMenuGroup[] = [
  {
    label: "Admin Console",
    items: [
      {
        title: "Overview",
        url: "/dashboard/admin",
        icon: "LayoutDashboard" as IconMapKey,
      },
      {
        title: "User Management",
        url: "/dashboard/admin/users",
        icon: "Users" as IconMapKey,
      },
      {
        title: "Nutritional Content",
        url: "/dashboard/admin/content",
        icon: "Apple" as IconMapKey,
      },
      {
        title: "Plan Categories",
        url: "/dashboard/admin/categories",
        icon: "Tag" as IconMapKey,
      },
    ],
  },
  {
    label: "Media & Assets",
    items: [
      {
        title: "Image Library",
        url: "/dashboard/admin/media/images",
        icon: "Image" as IconMapKey,
      },
      {
        title: "Video Tutorials",
        url: "/dashboard/admin/media/videos",
        icon: "Clapperboard" as IconMapKey,
      },
    ],
  },
  {
    label: "System",
    items: [
      {
        title: "Roles & Security",
        url: "/dashboard/admin/roles",
        icon: "Shield" as IconMapKey,
      },
      {
        title: "Support Tickets",
        url: "/dashboard/admin/support",
        icon: "LifeBuoy" as IconMapKey,
      },
    ],
  },
  COMMON_SETTINGS,
];

export const USER: DashboardSidebarMenuGroup[] = [
  {
    label: "Personal",
    items: [
      {
        title: "Dashboard",
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
        url: "/dashboard/saved",
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
        url: "/dashboard/analyzer",
        icon: "Brain" as IconMapKey,
      },
    ],
  },
  COMMON_SETTINGS,
];

export const sidebar = {
  ADMIN,
  USER,
};
