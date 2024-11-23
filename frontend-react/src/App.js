import './styles/common.css';
import './styles/header.css';
import './styles/footer.css';
import React from 'react'
import {Link, Route, Routes} from 'react-router-dom';
import HomePage from './components/HomePage';
import DicesPage from './components/DicesPage';

function App() {
  return (
    <div className="App">
			<header>
				<nav className="nav">
					<Link to={'/'} className={'nav-item'}>Kezdőlap</Link>
					<Link to={'/dices'} className={'nav-item'}>Dobókocka</Link>
				</nav>
				<div className={'nav-cim'}>
					<h3 className={'nav-cim-header'}>Dobókocka Kalkulátor</h3>
				</div>
			</header>
			<main>
				<Routes>
					<Route path={'/'} element={<HomePage/>}/>
					<Route path={'/dices'} element={<DicesPage/>}/>
				</Routes>
			</main>
			<footer>
				<div className={'copyright'}>
					<p>SZTE TTIK 2024</p>
				</div>
			</footer>
		</div>
  );
}

export default App;
