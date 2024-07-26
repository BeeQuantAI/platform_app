import Dashboard from '@/app/(protected)/dashboard/page.tsx';
import { WrappedRoutes } from '@/shared/Layout/Routes/WrappedRoutes';

function page() {
  return (
    <WrappedRoutes>
      <Dashboard />
    </WrappedRoutes>
  );
}

export default page;
