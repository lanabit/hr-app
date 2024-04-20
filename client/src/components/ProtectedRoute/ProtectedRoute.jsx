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
    const protectedPathAdmin = ['/attendance', '/employee'];
    const protectedPathClockedIn = ['/clock-in'];
    const protectedPathClockedOut = ['/clock-out'];

    if (!userData) {
      navigate.push('/login');
    }

    if (userData?.isHRAdmin == false) {
      navigate.push('/dashboard');
    }

    // if (
    //   userData?.isClockedIn == true &&
    //   protectedPathClockedIn.includes(path)
    // ) {
    //   navigate.push('/dashboard');
    // }
    // if (
    //   userData?.isClockedOut == true &&
    //   protectedPathClockedOut.includes(path)
    // ) {
    //   navigate.push('/dashboard');
    // }
  };

  useEffect(() => {
    authorizeUser();
  }, []);

  return <>{children}</>;
}
