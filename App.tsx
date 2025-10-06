import React, { useState, useEffect, useCallback } from 'react';
import { User, Property, UserRole } from './types';
import AuthPage from './components/AuthPage';
import BuyerDashboard from './components/BuyerDashboard';
import OwnerDashboard from './components/OwnerDashboard';
import { supabase } from './supabaseClient';
import type { Session } from '@supabase/supabase-js';


const App: React.FC = () => {
    const [session, setSession] = useState<Session | null>(null);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const [properties, setProperties] = useState<Property[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const getSession = async () => {
            const { data: { session } } = await supabase.auth.getSession();
            setSession(session);

            if (session) {
                const { data: profile, error } = await supabase
                    .from('profiles')
                    .select('full_name, role')
                    .eq('id', session.user.id)
                    .single();
                
                if(profile) {
                    setCurrentUser({
                        id: session.user.id,
                        email: session.user.email || '',
                        fullName: profile.full_name,
                        role: profile.role as UserRole
                    });
                }
            }
            setLoading(false);
        };
        getSession();

        const { data: authListener } = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                 if (!session) {
                    setCurrentUser(null);
                 }
            }
        );

        return () => {
            authListener.subscription.unsubscribe();
        };
    }, []);

    const fetchProperties = useCallback(async () => {
        const { data, error } = await supabase
            .from('properties')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            console.error('Error fetching properties:', error);
        } else {
            setProperties(data as Property[]);
        }
    }, []);


    useEffect(() => {
        fetchProperties();
    }, [fetchProperties]);
    
    useEffect(() => {
        if (session && !currentUser) {
             const getProfile = async () => {
                 const { data: profile } = await supabase
                    .from('profiles')
                    .select('full_name, role')
                    .eq('id', session.user.id)
                    .single();
                
                if(profile) {
                    setCurrentUser({
                        id: session.user.id,
                        email: session.user.email || '',
                        fullName: profile.full_name,
                        role: profile.role as UserRole
                    });
                }
            };
            getProfile();
        }
    }, [session, currentUser])

    const handleLogout = useCallback(async () => {
        await supabase.auth.signOut();
        setCurrentUser(null);
    }, []);

    const addProperty = useCallback(async (propertyData: Omit<Property, 'id' | 'owner_id'>) => {
        if (!currentUser) return;

        const propertyWithOwner = {
            ...propertyData,
            owner_id: currentUser.id,
        };

        const { error } = await supabase.from('properties').insert([propertyWithOwner]);
        if (error) {
            console.error('Error adding property:', error);
        } else {
            // Refetch properties to show the new one
            fetchProperties();
        }
    }, [currentUser, fetchProperties]);

    const renderContent = () => {
        if (loading) {
            return <div className="min-h-screen flex items-center justify-center text-white text-xl">Loading...</div>;
        }
        if (!currentUser) {
            return <AuthPage />;
        }
        if (currentUser.role === UserRole.BUYER) {
            return <BuyerDashboard user={currentUser} onLogout={handleLogout} properties={properties} />;
        }
        if (currentUser.role === UserRole.OWNER) {
            return <OwnerDashboard user={currentUser} onLogout={handleLogout} properties={properties.filter(p => p.owner_id === currentUser.id)} onAddProperty={addProperty} />;
        }
    };

    return (
        <div className="main-background min-h-screen text-slate-800">
            {renderContent()}
        </div>
    );
};

export default App;
