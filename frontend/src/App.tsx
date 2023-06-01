import React from 'react';
import styles from './App.module.sass';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Header } from './components/Header/Header';
import { Footer } from './components/Footer/Footer';
import { HomePage } from './pages/HomePage/HomePage';
import { CardPage } from './pages/CardPage/CardPage';
import { ProfilePage } from './pages/ProfilePage/ProfilePage';
import { SettingsPage } from './pages/SettingsPage/SettingsPage';
import {ListPage} from "./pages/ListPage/ListPage";

import {AuthProvider} from "./context/AuthContext";
import {CardsPage} from "./pages/CardsPage/CardsPage";
import PrivateRoute from "./utils/PrivateRoute";


function App() {
    return (
        <div className={styles.App}>
            <Router>
                    <AuthProvider>
                        <Header />
                        <div className={styles.Main}>
                            <Routes>
                                <Route path="/" element={<HomePage />} />

                                <Route path="/films/:page" element={<CardsPage />} />
                                <Route path="/animes/:page" element={<CardsPage />} />
                                <Route path="/serials/:page" element={<CardsPage />} />

                                <Route path="/user/:nickname" element={<ProfilePage />} />
                                <Route path="/user/:nickname/:type/:list" element={<ListPage />} />
                                <Route path="/user/settings" element={<SettingsPage />} />

                                <Route path="/film/:id" element={<CardPage />} />
                                <Route path="/anime/:id" element={<CardPage />} />
                                <Route path="/serial/:id" element={<CardPage />} />
                            </Routes>
                        </div>
                    </AuthProvider>
            </Router>
        </div>
    );
}

export default App;
