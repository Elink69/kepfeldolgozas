import '../styles/dicespage.css';
import {useEffect, useState} from 'react'
import {Button} from 'primereact/button'
import axios from 'axios';

const diceIndex = {one: 1, two: 2, three: 3, four: 4, five: 5, six: 6};
const diceIcons = {
    one: "/dice-icons/dice_1.png",
    two: "/dice-icons/dice_2.png",
    three: "/dice-icons/dice_3.png",
    four: "/dice-icons/dice_4.png",
    five: "/dice-icons/dice_5.png",
    six: "/dice-icons/dice_6.png"
};

const DicePage = () => {
    const [rawImage, setRawImage] = useState()
    const [fileUpload, setFileUpload] = useState()
    const [response, setResponse] = useState()
    const [finalImage, setFinalImage] = useState()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if (!file) {
            return
        }
        const reader = new FileReader()
        setFileUpload(file)
        reader.onloadend = () => {
            const imageDataUri = reader.result
            setRawImage(imageDataUri)
        }
        reader.readAsDataURL(file)
    }

    const getImage = async (id) => {
        try {
            if (id) {
                const response = await fetch(`http://127.0.0.1:8000/download_image/${id}`);
                const imageBlob = await response.blob();
                const imageObjectUrl = URL.createObjectURL(imageBlob);
                setFinalImage(imageObjectUrl);
                console.log("Sikeres kép lekérés")
            }
        } catch (err) {
            console.error("Error message: ", err);
        }

    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        const formData = new FormData();
        formData.append("file", fileUpload);

        try {
            // Replace with your actual API endpoint
            const response = await axios.post('http://127.0.0.1:8000/upload_image', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',  // Ensure the proper content type for file uploads
                },
            });

            await setResponse(response.data);  // Set the response from the API
            getImage(response.data.image_id);
        } catch (err) {
            console.error("Error message: ", err);
        }
    }

    const deleteResult = () => {
        setRawImage(null)
        setResponse(null)
        setFinalImage(null)
        setFileUpload(null)
    }

    return (
        <>
            <div className="dices-page">
                <section className="dice-upload-banner">
                    <p className="page-description">
                        Töltse fel a dobókockák képét az alábbi feltöltési lehetőség segítségével.
                        Az alkalmazás képfeldolgozással elemzi a képet, és automatikusan meghatározza a dobókockákon
                        található számokat.
                        Ez segít gyorsan és egyszerűen kiszámítani a kockák összesített értékét anélkül, hogy manuálisan
                        kellene leolvasnia a pontokat.
                    </p>
                </section>

                <div className="dice-sections-container">
                    <section className="dice-upload-section">
                        <h2>Feltöltés</h2>
                        <p>Az alábbiakban töltheti fel a dobókocka képét:</p>
                        <input
                            type="file"
                            id="raw_image"
                            onChange={(e) => handleImageChange(e)}
                            accept="image/*"
                        />
                        <div className="button-container">
                            <Button
                                label="Törlés"
                                hidden={!rawImage}
                                className="me-3"
                                onClick={deleteResult}
                            />
                            <Button
                                label="Beküldés"
                                hidden={!rawImage}
                                className="me-3"
                                onClick={handleSubmit}
                            />
                        </div>
                        {rawImage && (
                            <img
                                src={rawImage}
                                alt="Uploaded"
                                className="uploaded-image"
                            />
                        )}
                    </section>

                    <section className="dice-results-section">
                        <h2>Eredmények</h2>
                        {!response && <p>A kiértékelés eredményei itt fognak megjelenni.</p>}
                        {response && response.results && (
                            <div>
                                <p>Dobókocka pontértékek:</p>
                                <div className="dice-results-icons">
                                    {Object.entries(response.results).map(([key, value], index) => (
                                        <span key={index} className="dice-result-item">
                                            <span>{value} ×</span>
                                            <img 
                                                src={diceIcons[key]} 
                                                alt={key} 
                                                className="dice-icon" 
                                            />
                                        </span>
                                    )).reduce((acc, item, index, arr) => {
                                        return acc.concat(index < arr.length - 1 ? [item, " + "] : [item]);
                                    }, [])}
                                </div>
                                <p>Értékek összege: <span className="result-highlight">{
                                    Object.entries(response.results).reduce((total, [key, value]) => total + value * diceIndex[key], 0)
                                }</span></p>
                            </div>
                        )}
                        {response && response.image_id && finalImage && (
                            <img
                                src={finalImage}
                                alt={"Final image"}
                                className={"uploaded-image"}
                            />
                        )}
                    </section>
                </div>
            </div>
        </>
    )
}

export default DicePage;