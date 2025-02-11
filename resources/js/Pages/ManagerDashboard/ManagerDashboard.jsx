import React from 'react';
import { Inertia } from '@inertiajs/inertia'; // Import Inertia for navigation
import AddWeeklyPlan from "./AddWeeklyPlan";
import WeeklyPlanList from "./WeeklyPlanList";

export default function ManagerDashboard() {
    // Function to handle logout
    const handleLogout = async () => {
        try {
            // Perform a POST request to logout the user
            await Inertia.post('/logout');
            // Redirect to the login page after successful logout
            Inertia.visit('/login');
        } catch (error) {
            console.error('Error logging out:', error);
            alert('Logout failed. Please try again.');
        }
    };

    return (
        <>
            <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
                <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                    Welcome to Inertia with React!ioioioioi
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                    Your React frontend is now seamlessly integrated with Laravel.
                </p>

                {/* Logout Button */}
                <button
                    onClick={handleLogout}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-700 transition duration-300"
                >
                    Logout
                </button>
            </div>

            <AddWeeklyPlan />
            <WeeklyPlanList />
        </>
    );
}
