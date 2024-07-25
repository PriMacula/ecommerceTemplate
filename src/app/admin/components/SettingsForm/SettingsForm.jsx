
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"

export default function SettingsForm() {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle>Account Settings</CardTitle>
          <CardDescription>Manage your account information and security settings.</CardDescription>
        </CardHeader>
        <CardContent className="grid gap-8">
          <div className="grid grid-cols-2 gap-6">
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Name</Label>
                <Input id="name" type="text" defaultValue="John Doe" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email">Email</Label>
                <Input id="email" type="email" defaultValue="john@example.com" required />
              </div>
            </div>
            <div className="grid gap-4">
              <div className="grid gap-2">
                <Label htmlFor="password">Password</Label>
                <Input id="password" type="password" required />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="confirm-password">Confirm Password</Label>
                <Input
                  id="confirm-password"
                  type="password"
                  required
                  pattern="^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]{8,}$"
                  title="Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, and one number."
                />
              </div>
            </div>
          </div>
          <div className="grid gap-6">
            <div className="grid gap-2">
              <Label htmlFor="two-factor">Two-Factor Authentication</Label>
              <div className="flex items-center gap-2">
                <Switch id="two-factor" />
                <span>Enable two-factor authentication</span>
              </div>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="download-data">Download Data</Label>
              <Button id="download-data" variant="outline">
                Download Data
              </Button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit">Save Changes</Button>
        </CardFooter>
      </Card>
    </div>
  )
}