import '../App.css'
export default function PageContainer({ title, children }) {
    return (
        <div className="page">
            <h1>{title}</h1>
            {children}
        </div>
    );
}
