import '../styles/homepage.css';
import {Link } from 'react-router-dom';

const HomePage = () => {
    return (
        <>
        <div className="homepage">
            <section className="homepage-banner">
                <h1 className="homepage-title">Üdvözlünk a Dobókocka Kalkulátor oldalon!</h1>
                <p className="homepage-description">
                    Ez az alkalmazás a <strong>Képfeldolgozás haladóknak</strong> MSc gyakorlat keretében jött létre, 
                    azzal a céllal, hogy automatizálja a dobókockákról készült képek feldolgozását. Az applikáció segítségével 
                    könnyedén meghatározhatóak a feltöltött képen levő kockák felső lapjain található pontértékeket, illetve az aktuális kockadobás összértéke.
                </p>
				<Link to={'/dices'} className={"homepage-button"}>Kezdés</Link>
            </section>

            <section className="homepage-features">
                <div className="feature-item">
                    <h2 className="feature-title">Kép feltöltése</h2>
                    <p className="feature-description">
                        Az első lépés a fénykép feltöltése, amelyen az alkalmazásunk elvégzi az elemzéseket. 
                    </p>
                </div>
                <div className="feature-item">
                    <h2 className="feature-title">Gyors eredmények</h2>
                    <p className="feature-description">
                        Az applikáció pillanatok alatt meghatározza a dobókockákon található pontszámokat, 
                        így gyorsan és hatékonyan megjelenik az eredmény.
                    </p>
                </div>
                <div className="feature-item">
                    <h2 className="feature-title">Felhasználóbarát kialakítás</h2>
                    <p className="feature-description">
                        Az intuitív és letisztult kezelőfelület mindenki számára elérhetővé teszi az alkalmazás használatát – legyen 
                        szó akár szakértőről, akár kezdőről.
                    </p>
                </div>
            </section>

            <section className="homepage-creators">
                <h2 className="creators-title">A projekt készítői:</h2>
                <ul className="creators-list">
                    <li className="creator-name">Dinnyés Dávid – Frontend fejlesztés</li>
                    <li className="creator-name">Kis-Horváth Katalin Anna – Backend fejlesztés, képfeldolgozás algoritmus</li>
                    <li className="creator-name">Varga Dominik – Backend fejlesztés, képfeldolgozás algoritmus</li>
                    <li className="creator-name">Varga Klaudia – Frontend fejlesztés</li>
                </ul>
            </section>
        </div>
        </>
    );
}

export default HomePage;