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
            <div>
                <p>Az adott felületen kerülnek fel majd feltöltésre a dobókocka képek</p>
                <p>A kép feltöltése után megjelenik, majd az eredmény képek</p>
                <label htmlFor={`raw_image`} className={"custom-file-upload"}>Ide töltse fel a képet</label>
                <input
                    type="file"
                    id={"raw_image"}
                    onChange={(e)=> {
                        handleImageChange(e)
                    }}
                    accept={"image/*"}
                />
                <Button label={'Törlés'} severity={'danger'} hidden={!rawImage} className={'me-3'} onClick={e => deleteResult()}/>
                <Button label={'Beküldés'} severity={'info'} hidden={!rawImage} className={'me-3'} onClick={handleSubmit}/>
                <img src={rawImage} hidden={!rawImage} height={'250px'} width={'250px'} alt="kép"/>
            </div>
        </>
    )
}

export default DicePages;