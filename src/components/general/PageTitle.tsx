import { Link } from 'react-router-dom';

interface buttonElement {
    link: string;
    icon: string;
    title: string;
}

export default function PageTitle({ title, buttonElement = null }: { title: string, buttonElement?: buttonElement | null }) {
    return (
        <>
            {buttonElement && (
                <div className="d-flex justify-content-between align-items-center pb-3">
                    <h1 className="fs-4 fw-bold">{title}</h1>
                    <Link to={buttonElement.link} className="btn btn-primary">
                        <i className={`${buttonElement.icon} me-3`}></i>
                        <span>{buttonElement.title}</span>
                    </Link>
                </div>
            )}

            {!buttonElement && (
                <h1 className="fs-4 fw-bold">{title}</h1>
            )}
        </>
    )

}