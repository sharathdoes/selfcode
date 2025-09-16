import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"


import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"


export default function SheetDemo() {

  const models = [
  { id: 'gemma2-9b-it', name: 'Gemma 2 9B', provider: 'Google' },
  { id: 'llama-3.3-70b-versatile', name: 'Llama 3.3 70B Versatile', provider: 'Meta' },
  { id: 'llama-3.1-8b-instant', name: 'Llama 3.1 8B Instant', provider: 'Meta' },
  { id: 'llama-guard-3-8b', name: 'Llama Guard 3 8B', provider: 'Meta' },
  { id: 'llama3-70b-8192', name: 'Llama 3 70B', provider: 'Meta' },
  { id: 'llama3-8b-8192', name: 'Llama 3 8B', provider: 'Meta' },
  { id: 'mixtral-8x7b-32768', name: 'Mixtral 8x7B', provider: 'Mistral' },
];
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Settings</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Edit profile</SheetTitle>
          <SheetDescription>
            Make changes to your profile here. 
          </SheetDescription>
        </SheetHeader>
        <div className="grid flex-1 auto-rows-min gap-6 px-4">
         
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-name">API Key</Label>
            <Input id="sheet-demo-name" />
          </div>
          <div className="grid gap-3">
            <Label htmlFor="sheet-demo-username">Select Model</Label>
             <Select>
      <SelectTrigger className="w-[360px]">
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
        </div>
        <SheetFooter>
          <Button type="submit">Save changes</Button>
          <SheetClose asChild>
            <Button variant="outline">Close</Button>
          </SheetClose>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}
