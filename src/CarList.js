import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CarList() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true); 

  useEffect(() => {
    
    axios.get('https://cars.sulla.hu/cars')
      .then(response => {
        setCars(response.data); 
        setLoading(false); 
      })
      .catch(error => {
        console.error("Hiba történt az adatok lekérésekor:", error);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return <p>Adatok betöltése...</p>;
  }

  return (
    <div>
      <h1>Autók listája</h1>
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
        {cars.map((car) => (
          <div key={car.id} style={{ border: '1px solid #ccc', margin: '10px', padding: '10px', width: '200px' }}>
            <h2>{car.car_name}</h2>
            <p>Szín: {car.car_color}</p>
            <img
              src={`data:image/jpeg;base64,${car.car_picture}`}
              alt={car.car_name}
              style={{ width: '100%', height: 'auto' }}
            />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CarList;
