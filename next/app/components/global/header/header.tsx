import styles from './header.module.scss';
interface NavigationItem {
    id: string;
    url: string;
    title: string;
}

interface HeaderProps {
    navigationItems: NavigationItem[];
    title: string;
}

const Header: React.FC<HeaderProps> = ({ navigationItems, title }) => {
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
            <a href="/" className={styles.headerLogo}>
                <h1 className={styles.headerTitle}>{title}</h1>
            </a>
            <nav className={styles.headerNav}>
                <ul>
                    {navigationItems && navigationItems.map(item => (
                        item.url === '/' && item ? null :
                        <li key={item.id}>
                        <a key={item.id} href={item.url}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            </nav>
            </div>
        </header>
    );
}

export { Header }