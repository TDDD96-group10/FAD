const NotFoundPage: React.FC = () => {

  return (
    <div className="container">
      {/* Header */}
      <header className="header">
        <h1>Not Foundpage</h1>
        <nav>
          <ul className="nav-links">
            <li><a href="#">Home</a></li>
            <li><a href="#">About</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </nav>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h2>Welcome to My Website</h2>
        <p>This is a simple homepage built with React and TypeScript.</p>
      </section>

      {/* Main Content */}
      <main className="content">
        <h3>User List</h3>
        
        <ul>
          
        </ul>
      </main>

      {/* Footer */}
      <footer className="footer">
        <p>© 2025 My Website. All rights reserved.</p>
      </footer>
    </div>
  );
};

export default NotFoundPage;
