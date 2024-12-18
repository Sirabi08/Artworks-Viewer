import React from 'react';
import HomePage from './pages/HomePage';
import ThemeToggle from './components/ThemeToggle';

const App: React.FC = () => {
    return (
        <div className="app">
            <header className="app-header">
                <h1>Enhanced Artworks Viewer</h1>
                <ThemeToggle />
            </header>
            <main>
                <HomePage />
            </main>
        </div>
    );
};

export default App;
