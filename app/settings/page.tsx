 import {Label} from "@/components/ui/label";
import { Input } from "@/components/ui/input";  
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
 
 export default function SettingsPage() {
    const models = [
        { id: "gemma2-9b-it", name: "Gemma 2 9B", provider: "Google" },
        {
            id: "llama-3.3-70b-versatile",
            name: "Llama 3.3 70B Versatile",
            provider: "Meta",
        },
        {
            id: "llama-3.1-8b-instant",
            name: "Llama 3.1 8B Instant",
            provider: "Meta",
        },
        { id: "llama-guard-3-8b", name: "Llama Guard 3 8B", provider: "Meta" },
        { id: "llama3-70b-8192", name: "Llama 3 70B", provider: "Meta" },
        { id: "llama3-8b-8192", name: "Llama 3 8B", provider: "Meta" },
        { id: "mixtral-8x7b-32768", name: "Mixtral 8x7B", provider: "Mistral" },
    ];

    return (
        <div className="h-screen items-center flex justify-center ">
            <div className="w-full max-w-md p-8  border rounded-lg shadow">
                <h1 className="text-2xl font-bold mb-6">Settings</h1>
                <div className="space-y-8">
                    <div className="grid gap-4">
                        <Label htmlFor="api-key">API Key</Label>
                        <Input id="api-key" placeholder="Enter your API key" />
                    </div>

                    <div className="grid gap-4">
                        <Label htmlFor="model-select">Select Model</Label>
                        <Select>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select a model" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectGroup>
                                    <SelectLabel>Models</SelectLabel>
                                    {models.map((model) => (
                                        <SelectItem key={model.id} value={model.id}>
                                            {model.name} ({model.provider})
                                        </SelectItem>
                                    ))}
                                </SelectGroup>
                            </SelectContent>
                        </Select>
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
