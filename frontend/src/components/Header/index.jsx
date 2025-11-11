import "./Header.css";

const Header = () => {
    return (
        <header className="header">
            <img src="/icon.png" alt="Priority Flow Logo" className="header__logo" />
            <div className="text-container">
                <h1 className="header__titulo" >PriorityFlow</h1>
                <p className="header__texto">Ticket Triage System</p>
            </div>
        </header>
    );
};

export default Header;
