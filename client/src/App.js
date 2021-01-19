import axios from "axios";
import {useEffect} from "react";
import {useState} from "react";


function App() {

    const [cars, setCars] = useState([])

    useEffect(()=> {
        getCars()
    }, [])

    const getCars = () => {
        axios.get('/api/getcar').then(response => {
            console.log(response.data)
            setCars(response.data)
        })
    }

    const onRemove = () => {
        axios.post('/api/removeCar', {brand: 'Maserati'}).then(response => {
            getCars()
        })
    }

    const onSubmitCar = () => {
        axios.post('/api/addcar', {
            brand: 'Maserati',
            model: 'Quattroporte',
            year: '2019',
            available: true
        }).then(response => {
            console.log(response.data)
            getCars()
        })
    }

    const onGetFord = () => {
        axios.get('/api/getFord', {

        }).then(response => {
            getCars()
        })
    }

    const onUpdate = () => {
        axios.post('/api/updatecar', {
            id: '600695029128de1a3408838c',
            brand: 'kia'
        }).then(response => {
            getCars()
        })
    }


    return (
        <div className="App">
            <header className="App-header">
                <p>
                    hello
                </p>
                <button onClick={onSubmitCar}>Click me</button>
                <hr/>
                <button onClick={onGetFord}>Give me only ford</button>
                <hr/>
                <button onClick={onRemove}>remove car</button>
                <hr/>
                <button onClick={onUpdate}>Update car</button>
            </header>
            <ul>{cars.map(car=>  <li key={car._id}>brand - {car.brand}</li>)}</ul>

        </div>
    );
}

export default App;
