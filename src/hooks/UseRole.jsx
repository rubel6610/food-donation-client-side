import React from 'react';
import UseAxiosSecure from './UseAxiosSecure';
import { useQuery } from '@tanstack/react-query';
import UseAuth from './UseAuth';

const UseRole = () => {
    const axiosSecure = UseAxiosSecure();
    const { user, loading } = UseAuth();
    const { data: role = {}, refetch , isLoading: isRoleLoading } = useQuery({
        queryKey: ['role', user?.email],
        enabled: !loading && !!user?.email,
        queryFn: async () => {
            const response = await axiosSecure.get('/users/role', {
                params: { email: user?.email },
            });
            return response.data.role;
        },
    });

    return {
        role,
        refetch,
        isRoleLoading
    };
};

export default UseRole;