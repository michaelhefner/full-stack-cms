interface NavigationItem {
    id: string;
    url: string;
    title: string;
}

interface HeaderProps {
    navigationItems: NavigationItem[];
}

const Header: React.FC<HeaderProps> = ({ navigationItems }) => {
    return (
        <header>
            <nav>
                <ul>
                    {navigationItems && navigationItems.map(item => (
                        <li key={item.id}>
                        <a key={item.id} href={item.url}>{item.title}</a>
                        </li>
                    ))}
                </ul>
            </nav>
        </header>
    );
}

export { Header }