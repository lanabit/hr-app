import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function ProtectedRoute({ children }) {
  const navigate = useRouter();
  const path = usePathname();

  const authorizeUser = () => {
    let userData = localStorage.getItem('user');
    userData = JSON.parse(userData);

    // Testing route path
    const protectedPath = ['/admin-dashboard', '/dashboard'];
    const protectedPathAdmin = ['/admin-dashboard'];

    if (userData?.position != 1 && protectedPathAdmin.includes(path)) {
      navigate.push('/login');
    }
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  return <>{children}</>;
}
