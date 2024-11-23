import '../styles/dicespage.css';
import {useEffect, useState} from 'react'
import {Button} from 'primereact/button'
import axios from 'axios';

const DicePages = () => {
    const [rawImage, setRawImage] = useState()
    const [fileUpload, setFileUpload] = useState()
    const [response, setResponse] = useState()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(!file){
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

            setResponse(response.data);  // Set the response from the API
          } catch (err) {
            console.error("Error message: ", err);
          }
    }

    const deleteResult = () => {
        setRawImage(null)
    }

    return (
        <>
            <div className="dices-page">
                <section className="dice-upload-banner">
                    <p className="page-description">
                    Töltse fel a dobókockák képét az alábbi feltöltési lehetőség segítségével. 
                    Az alkalmazás képfeldolgozással elemzi a képet, és automatikusan meghatározza a dobókockákon található számokat. 
                    Ez segít gyorsan és egyszerűen kiszámítani a kockák összesített értékét anélkül, hogy manuálisan kellene leolvasnia a pontokat.
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
                        <p>A kiértékelés eredményei itt jelennek meg:</p>
                        {response && (
                            <div>
                                <p>Dobókocka pontértékek: {response.dice_values.join(', ')}</p>
                            </div>
                        )}
                    </section>
                </div>
            </div>
        </>
    )
}

export default DicePages;