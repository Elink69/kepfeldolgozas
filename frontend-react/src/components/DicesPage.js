import {useEffect, useState} from 'react'
import {Button} from 'primereact/button'

const DicePages = () => {
    const [rawImage, setRawImage] = useState()

    const handleImageChange = (e) => {
        const file = e.target.files[0]
        if(!file){
            return
        }
        const reader = new FileReader()
		reader.onloadend = () => {
			const imageDataUri = reader.result
			setRawImage(imageDataUri)
		}
		reader.readAsDataURL(file)
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
                <img src={rawImage} hidden={!rawImage} height={'250px'} width={'250px'} alt="kép"/>
            </div>
        </>
    )
}

export default DicePages;