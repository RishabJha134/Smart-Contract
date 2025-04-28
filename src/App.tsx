import { Switch, Route, Redirect } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/dashboard";
import Login from "@/pages/login";
import Register from "@/pages/register";
import Contracts from "@/pages/contracts";
import NewContract from "@/pages/contracts/new";
import Payments from "@/pages/payments";
import Templates from "@/pages/templates";
import Home from "@/pages/home";
import AIInsights from "@/pages/ai-insights";
import TrustScore from "@/pages/trust-score";
import SmartContracts from "@/pages/smart-contracts";
import { AuthProvider, useAuth } from "@/lib/auth";

// Protected route component
function ProtectedRoute({ component: Component, ...rest }) {
  const { user } = useAuth();
  
  if (!user) {
    return <Redirect to="/login" />;
  }
  
  return <Component {...rest} />;
}

function Router() {
  const { user, isLoading } = useAuth();

  // If auth is loading, don't render routes yet
  if (isLoading) {
    return (
      <div className="h-screen w-full flex items-center justify-center">
        Loading...
      </div>
    );
  }

  return (
    <Switch>
      <Route path="/" component={Home} />
      <Route path="/login" component={Login} />
      <Route path="/register" component={Register} />
      
      {/* Protected routes */}
      <Route path="/dashboard">
        {() => <ProtectedRoute component={Dashboard} />}
      </Route>
      <Route path="/contracts">
        {() => <ProtectedRoute component={Contracts} />}
      </Route>
      <Route path="/contracts/new">
        {() => <ProtectedRoute component={NewContract} />}
      </Route>
      <Route path="/payments">
        {() => <ProtectedRoute component={Payments} />}
      </Route>
      <Route path="/templates">
        {() => <ProtectedRoute component={Templates} />}
      </Route>
      <Route path="/ai-insights">
        {() => <ProtectedRoute component={AIInsights} />}
      </Route>
      <Route path="/trust-score">
        {() => <ProtectedRoute component={TrustScore} />}
      </Route>
      <Route path="/smart-contracts">
        {() => <ProtectedRoute component={SmartContracts} />}
      </Route>
      
      {/* Fallback to 404 */}
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Router />
        </TooltipProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default App;