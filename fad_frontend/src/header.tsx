const FADheader: React.FC = () => {
    return (
        <header className="header">
            <h1>FAD</h1>
            <nav>
                <ul className="nav-links">
                    <li><a href="/home">Home</a></li>
                    <li><a href="/test">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </header>
    );
}

export default FADheader;