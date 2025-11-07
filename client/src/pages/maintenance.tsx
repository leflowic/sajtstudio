import { Construction, Lock, User } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { useAuth } from "@/hooks/use-auth";
import { useToast } from "@/hooks/use-toast";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const loginSchema = z.object({
  username: z.string().min(3, "Korisničko ime mora imati najmanje 3 karaktera"),
  password: z.string().min(8, "Lozinka mora imati najmanje 8 karaktera"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export default function MaintenancePage() {
  const [showLoginDialog, setShowLoginDialog] = useState(false);
  const { loginMutation } = useAuth();
  const { toast } = useToast();

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  const onLoginSubmit = async (data: LoginFormData) => {
    try {
      await loginMutation.mutateAsync(data);
      setShowLoginDialog(false);
      loginForm.reset();
      toast({
        title: "Uspešno!",
        description: "Prijavili ste se kao admin.",
      });
    } catch (error: any) {
      toast({
        variant: "destructive",
        title: "Greška pri prijavljivanju",
        description: error.message || "Neispravno korisničko ime ili lozinka.",
      });
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="max-w-2xl w-full text-center space-y-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex justify-center mb-8">
            <img
              src="/attached_assets/logo/studioleflow-transparent.png"
              alt="Studio LeFlow"
              className="h-32 w-auto filter invert"
            />
          </div>

          <Construction className="w-24 h-24 text-primary mx-auto mb-6" />
          
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-[Montserrat]">
            Sajt je u pripremi
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8">
            Trenutno radimo na unapređenju naših servisa. Uskoro se vraćamo!
          </p>

          <div className="bg-muted rounded-lg p-6 max-w-md mx-auto">
            <p className="text-sm text-muted-foreground">
              Možete nas kontaktirati putem:
            </p>
            <div className="mt-4 space-y-2">
              <p className="font-medium">
                Email: <a href="mailto:info@studioleflow.com" className="text-primary hover:underline">info@studioleflow.com</a>
              </p>
              <p className="font-medium">
                Telefon: <a href="tel:+381637347023" className="text-primary hover:underline">+381 63 734 7023</a>
              </p>
              <p className="font-medium">
                Instagram: <a href="https://instagram.com/studioleflow" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@studioleflow</a>
              </p>
            </div>
          </div>

          <div className="mt-12">
            <button
              onClick={() => setShowLoginDialog(true)}
              className="text-sm text-muted-foreground hover:text-primary transition-colors"
            >
              Admin Prijava
            </button>
          </div>
        </motion.div>
      </div>

      <Dialog open={showLoginDialog} onOpenChange={setShowLoginDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <Lock className="w-5 h-5" />
              Admin Prijava
            </DialogTitle>
            <DialogDescription>
              Prijavite se sa vašim admin nalogom kako biste pristupili sajtu.
            </DialogDescription>
          </DialogHeader>
          
          <Form {...loginForm}>
            <form onSubmit={loginForm.handleSubmit(onLoginSubmit)} className="space-y-4">
              <FormField
                control={loginForm.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Korisničko ime</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          placeholder="Unesite korisničko ime"
                          {...field}
                          className="pl-10"
                          autoComplete="username"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={loginForm.control}
                name="password"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Lozinka</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                        <Input
                          type="password"
                          placeholder="Unesite lozinku"
                          {...field}
                          className="pl-10"
                          autoComplete="current-password"
                        />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button
                type="submit"
                className="w-full"
                disabled={loginMutation.isPending}
              >
                {loginMutation.isPending ? "Prijavljivanje..." : "Prijavi se"}
              </Button>
            </form>
          </Form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
