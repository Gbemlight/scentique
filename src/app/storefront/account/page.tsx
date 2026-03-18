"use client";

import { Root, List, Trigger, Content } from "@radix-ui/react-tabs";
import ProfileTab from "@/components/ProfileTab";
import OrdersTab from "@/components/OrdersTab";
import AddressesTab from "@/components/AddressesTab";
import SettingsTab from "@/components/SettingsTab";

export default function AccountPage() {
  return (
    <div className="max-w-7xl mx-auto px-6 py-12">

      <Root defaultValue="profile" className="flex flex-col lg:flex-row gap-10">

        {/* Sidebar Desktop / Scroll Tabs Mobile */}
        <List className="flex lg:flex-col overflow-x-auto lg:overflow-visible border-b lg:border-b-0 lg:border-r min-w-55">
          {[
            { value: "profile", label: "Profile" },
            { value: "orders", label: "My Orders" },
            { value: "addresses", label: "Saved Addresses" },
            { value: "settings", label: "Settings" }
          ].map((tab) => (
            <Trigger
              key={tab.value}
              value={tab.value}
              className="px-4 py-3 text-sm font-medium whitespace-nowrap data-[state=active]:bg-black data-[state=active]:text-white transition"
            >
              {tab.label}
            </Trigger>
          ))}
        </List>

        <div className="flex-1">
          <Content value="profile"><ProfileTab /></Content>
          <Content value="orders"><OrdersTab /></Content>
          <Content value="addresses"><AddressesTab /></Content>
          <Content value="settings"><SettingsTab /></Content>
        </div>

      </Root>
    </div>
  );
}