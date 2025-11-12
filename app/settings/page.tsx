 import {Label} from "@/components/ui/label";
import { Input } from "@/components/ui/input";  
import { Button } from "@/components/ui/button";
 
 export default function SettingsPage() {
  
    return (
        <div className="h-screen items-center flex justify-center ">
            <div className="w-full max-w-md p-8  border rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Settings</h1>
                <div className="space-y-8">
                    <div className="grid gap-4">
                        <Label htmlFor="api-key">API Key</Label>
                        <Input id="api-key" placeholder="Enter your API key" />
                    </div>
                    <div className="flex gap-4">
                        <Button type="submit">Save Changes</Button>
                        <Button variant="outline">Cancel</Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
