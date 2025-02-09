import { Link, usePage } from "@inertiajs/inertia-react";

export default function Layout({ children }) {
    const { component } = usePage();

    return (
        <>
            <header>
                <nav>
                    {component === 'Home' && (
                        <>
                            <Link className="nav-link" href="/">
                                Home
                            </Link>
                            <Link className="nav-link" href="/login">
                                Login
                            </Link>
                            <Link className="nav-link" href="/register"> register
                            </Link>
                        </>
                    )}
                </nav>
            </header>

            <main>{children}</main>
        </>
    );
}
