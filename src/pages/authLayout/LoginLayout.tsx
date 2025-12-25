import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LoginForm } from "./LoginForm";
import { UserForm } from "./UserForm";

export default function LoginLayout() {
  return (
    <div className="flex w-full flex-col gap-12 h-[90vh]">
      <Tabs defaultValue="login_User">
        <TabsList>
          <TabsTrigger value="login_user">Login User</TabsTrigger>
          <TabsTrigger value="login_admin">Login Admin</TabsTrigger>
        </TabsList>
        <TabsContent value="login_user">
          <UserForm />
        </TabsContent>
        <TabsContent value="login_admin">
          <LoginForm />
        </TabsContent>
      </Tabs>
    </div>
  );
}
