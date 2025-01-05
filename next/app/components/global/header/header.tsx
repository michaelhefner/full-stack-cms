import styles from './header.module.scss';
interface Parent {
    id: string;
    title: string;
    url: string;
}
interface NavigationItem {
    id: string;
    url: string;
    title: string;
    parent: Parent;
    child: NavigationItem;
}

interface HeaderProps {
    navigationItems: any[];
    title: string;
}

const Header: React.FC<HeaderProps> = ({ navigationItems, title }) => {
    const navigationObj: { [key: string]: NavigationItem } = {};
    navigationItems.forEach(item => {
        navigationObj[item.title] = item;
        if (item.parent) {
            navigationObj[item.parent.title] = { ...navigationObj[item.parent.title], child: item };
            navigationObj[item.title] = { id: '', url: '', title: '', parent: item.parent, child: item };
        }
    });
    const mapNavSet = (navObj: { [key: string]: NavigationItem }) => {
        return Object.keys(navObj).map(key => {
            const item = navObj[key];
            if (item.url !== '') {
                return (
                    <li className={styles.topLevelNavItem} key={item.id}>
                        <a key={item.id} href={item.url}>{item.title}</a>
                        <ul className={styles.secondaryLevelNav}>
                            {item.child ? <li className={styles.secondaryLevelNavItem} key={item.child.id}>
                                <a key={item.child.id} href={item.child.url}>{item.child.title}</a>
                            </li> : null}
                        </ul>
                    </li>
                )
            } else {
                return null;
            }
        });
    }
    return (
        <header className={styles.header}>
            <div className={styles.headerContainer}>
                <a href="/" className={styles.headerLogo}>
                    <h1 className={styles.headerTitle}>{title}</h1>
                </a>
                <nav className={styles.headerNav}>
                    <ul className={styles.topLevelNav}>
                        {mapNavSet(navigationObj)}
                    </ul>
                </nav>
            </div>
        </header>
    );
}

export { Header }