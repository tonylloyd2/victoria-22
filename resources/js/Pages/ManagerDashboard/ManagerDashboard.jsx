import AddProductionCost from "./AddProduction.jsx";

export default function ManagerDashboard() {
    return (
        <>
            <div className="bg-white dark:bg-slate-800 rounded-lg px-6 py-8 ring-1 ring-slate-900/5 shadow-xl">
                <h3 className="text-slate-900 dark:text-white mt-5 text-base font-medium tracking-tight">
                    Welcome to Inertia with React!ioioioioi
                </h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2 text-sm">
                    Your React frontend is now seamlessly integrated with Laravel.
                </p>
            </div>
            <AddProductionCost />
        </>
    );
}
