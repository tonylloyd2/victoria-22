import "./bootstrap";
import "../css/app.css";

import { createInertiaApp } from "@inertiajs/inertia-react";
import { createRoot } from "react-dom/client";
import Layout from "./Layouts/Layout";

createInertiaApp({
    title: (title) =>
        title ? `${title} - Laravel Inertia React` : "Laravel Inertia React",
    resolve: (name) => {
        const pages = import.meta.glob("./Pages/**/*.jsx", { eager: true });
        let page = pages[`./Pages/${name}.jsx`];
        if (!page) {
            throw new Error(`Page not found: ./Pages/${name}.jsx`);
        }
        page = page.default || page;
        page.layout = page.layout || ((page) => <Layout>{page}</Layout>);
        return page;
    },
    setup({ el, App, props }) {
        createRoot(el).render(<App {...props} />);
    },
    progress: {
        color: "#fff",
        showSpinner: true,
    },
});
