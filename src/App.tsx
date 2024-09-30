import { Routes, Route } from 'react-router-dom';
import './globals.css';
import AuthLayout from './_auth/AuthLayout';
import SignupForm from './_auth/forms/SignupForm';
import SigninForm from './_auth/forms/SigninForm';
import RootLayout from './_root/RootLayout';
import SearchLayout from './_search/SearchLayout';
import Settings from './_root/pages/core/Settings';
import Home from './_search/pages/Home';
import Search from './_search/pages/Search';
import Mission from './_static/pages/Mission';
import Privacy from './_static/pages/Privacy';
import Terms from './_static/pages/Terms';
import StaticLayout from './_static/StaticLayout';
import NotFound from './_static/pages/NotFound'; // Import a NotFound component

import { AuthProvider } from './api/authContext';

const App = () => {
    return (
        <main className='flex h-screen'>
            <AuthProvider>
                <Routes>
                    <Route element={<StaticLayout />}>
                        <Route path="mission" element={<Mission />} />
                        <Route path="privacy-policy" element={<Privacy />} />
                        <Route path="terms-of-service" element={<Terms />} />
                        {/* Catch-All for 404 */}
                        <Route path="*" element={<NotFound />} />
                    </Route>
                    {/* Public Routes */}
                    <Route element={<AuthLayout />}>
                        <Route path="sign-up" element={<SignupForm />} />
                        <Route path="sign-in" element={<SigninForm />} />
                    </Route>
                    {/* Private Routes */}
                    <Route element={<SearchLayout />}>
                        <Route path="/" element={<Home />} />
                        <Route path="search" element={<Search />} />
                    </Route>
                    <Route element={<RootLayout />}>
                        <Route path="settings" element={<Settings />} />
                    </Route>
                </Routes>
            </AuthProvider>
        </main>
    );
}

export default App;
