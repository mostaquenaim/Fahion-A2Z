import { Link } from "react-router-dom";

const NotFoundPage = () => {
    return (
        <div className="flex items-center justify-center h-screen bg-primary text-base-100">
            <div className="text-center p-8 rounded-lg shadow-xl bg-base-100">
                <h1 className="text-4xl font-semibold text-secondary">404 - Page Not Found</h1>
                <p className="text-xl text-primary opacity-60 mt-4">Sorry, the page you're looking for doesn't exist.</p>
                <p className="text-primary opacity-60 mt-2">Please check the URL or go back to the homepage.</p>
                <Link to="/" className="btn btn-primary mt-6">Go to Homepage</Link>
            </div>
        </div>
    );
};

export default NotFoundPage;
