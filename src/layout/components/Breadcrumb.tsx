import { Link } from 'react-router-dom';

interface crumbsType {
    label: string;
    path: string;
    active: boolean;
}

export default function Breadcrumb({ crumbs }: { crumbs: crumbsType[] }) {
    return (
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb fs-12">
                {crumbs.map((crumb, index) => (
                    <li key={index}
                        className={`breadcrumb-item ${crumb.active ? 'active' : 'fw-bold'}`}>
                        {crumb.active
                            ? crumb.label
                            : <Link className={`text-decoration-none text-black`}
                                to={crumb.path}>{crumb.label}
                            </Link>
                        }
                    </li>
                ))}
            </ol>
        </nav>
    );
}
