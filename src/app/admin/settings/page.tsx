"use client";

import { useState } from "react";
import { toast } from "sonner";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/Tabs";
import Input from "@/components/ui/Input";
import Select, { SelectItem } from "@/components/ui/Select";
import Checkbox from "@/components/ui/Checkbox";
import Button from "@/components/ui/Button";

export default function SettingsPage() {
  const [loading, setLoading] = useState(false);
  const [currency, setCurrency] = useState("USD");
  const [timezone, setTimezone] = useState("UTC");
  const [color, setColor] = useState("#C9A227");
  const [notifications, setNotifications] = useState({ order: true, stock: true, review: false, digest: false });

  const saveSettings = () => {
    setLoading(true);

    setTimeout(() => {
      setLoading(false);
      toast.success("Settings saved successfully");
    }, 1200);
  };

  return (
    <div className="space-y-6 max-w-5xl">

      {/* Header with Single Save Button */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <h1 className="text-2xl font-bold font-serif">
          Store Settings
        </h1>
        <Button onClick={saveSettings} loading={loading}>
          Save Changes
        </Button>
      </div>

      <div className="bg-white rounded-xl shadow-sm border p-6">
        <Tabs defaultValue="general">

          {/* TAB NAV */}
          <TabsList className="mb-8 w-full overflow-x-auto">
            <TabsTrigger value="general">General</TabsTrigger>
            <TabsTrigger value="shipping">Shipping</TabsTrigger>
            <TabsTrigger value="payments">Payments</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="appearance">Appearance</TabsTrigger>
          </TabsList>

          {/* GENERAL TAB */}
          <TabsContent value="general" className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <Input
              label="Store Name"
              placeholder="My Awesome Store"
              defaultValue="Scentique"
            />

            <Input
              label="Store Email"
              placeholder="contact@example.com"
              defaultValue="hello@scentique.com"
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Select label="Currency" value={currency} onValueChange={setCurrency}>
                <SelectItem value="USD">USD ($)</SelectItem>
                <SelectItem value="EUR">EUR (€)</SelectItem>
                <SelectItem value="NGN">NGN (₦)</SelectItem>
              </Select>

              <Select label="Timezone" value={timezone} onValueChange={setTimezone}>
                <SelectItem value="UTC">UTC</SelectItem>
                <SelectItem value="GMT">GMT</SelectItem>
                <SelectItem value="Africa/Lagos">Africa/Lagos</SelectItem>
              </Select>
            </div>

            <div className="border-2 border-dashed border-gray-200 p-8 rounded-lg text-center text-sm text-gray-500 hover:bg-gray-50 transition-colors cursor-pointer">
              <p>Click to upload store logo</p>
              <p className="text-xs text-gray-400 mt-1">SVG, PNG, JPG (max. 800x400px)</p>
            </div>
          </TabsContent>

          {/* SHIPPING TAB */}
          <TabsContent value="shipping" className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="grid gap-6">
              <div className="border p-5 rounded-lg space-y-4 bg-gray-50/50">
                <h3 className="font-medium font-serif text-lg">United States</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Flat Rate ($)" placeholder="0.00" />
                  <Input label="Free Shipping Threshold ($)" placeholder="100.00" />
                </div>
              </div>

              <div className="border p-5 rounded-lg space-y-4 bg-gray-50/50">
                <h3 className="font-medium font-serif text-lg">Europe</h3>
                <div className="grid grid-cols-2 gap-4">
                  <Input label="Flat Rate (€)" placeholder="0.00" />
                  <Input label="Free Shipping Threshold (€)" placeholder="80.00" />
                </div>
              </div>
            </div>
          </TabsContent>

          {/* PAYMENTS TAB */}
          <TabsContent value="payments" className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-6">
              <div className="border p-5 rounded-lg space-y-4">
                <Checkbox label="Enable Stripe Payments" checked={true} />
                <Input label="Stripe API Key" placeholder="sk_test_..." type="password" />
              </div>

              <div className="border p-5 rounded-lg space-y-4">
                <Checkbox label="Enable PayPal" checked={false} />
                <Input label="PayPal Client ID" placeholder="Client ID" />
              </div>

              <div className="border p-5 rounded-lg">
                <Checkbox label="Enable Cash on Delivery" checked={false} />
              </div>
            </div>
          </TabsContent>

          {/* NOTIFICATIONS TAB */}
          <TabsContent value="notifications" className="space-y-6 max-w-md animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="space-y-4 border p-6 rounded-lg">
              <h3 className="font-serif text-lg mb-4">Email Alerts</h3>
              
              <Checkbox 
                label="New Order Confirmation" 
                checked={notifications.order}
                onCheckedChange={(c) => setNotifications(prev => ({ ...prev, order: c }))}
              />
              <Checkbox 
                label="Low Stock Alert" 
                checked={notifications.stock}
                onCheckedChange={(c) => setNotifications(prev => ({ ...prev, stock: c }))}
              />
              <Checkbox 
                label="New Customer Review" 
                checked={notifications.review}
                onCheckedChange={(c) => setNotifications(prev => ({ ...prev, review: c }))}
              />
              <Checkbox 
                label="Weekly Performance Digest" 
                checked={notifications.digest}
                onCheckedChange={(c) => setNotifications(prev => ({ ...prev, digest: c }))}
              />
            </div>
          </TabsContent>

          {/* APPEARANCE TAB */}
          <TabsContent value="appearance" className="space-y-6 max-w-2xl animate-in fade-in slide-in-from-bottom-2 duration-500">
            <div className="flex items-center gap-6 border p-6 rounded-lg">
              <div>
                <label className="text-sm font-medium text-gray-700 block mb-2">Primary Color</label>
                <div className="flex items-center gap-4">
                  <input
                    type="color"
                    value={color}
                    onChange={(e) => setColor(e.target.value)}
                    className="h-10 w-20 cursor-pointer rounded border p-1"
                  />
                  <span className="text-sm text-gray-500 uppercase">{color}</span>
                </div>
              </div>
              
              <div className="h-12 w-px bg-gray-200 mx-4"></div>

              <div>
                 <label className="text-sm font-medium text-gray-700 block mb-2">Preview Button</label>
                 <button 
                  className="px-4 py-2 text-white rounded shadow-sm text-sm font-medium"
                  style={{ backgroundColor: color }}
                 >
                    Sample Button
                 </button>
              </div>
            </div>

            <div className="border p-6 rounded-lg">
              <Checkbox label="Enable Storefront Dark Mode" checked={false} />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}