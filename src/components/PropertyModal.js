import React from 'react'

function PropertyModal({property, onClose }) {

  if (!property) return null;


  return (
    <div className="modal-overlay">
      <div className="modal-content" >
         <button onClick={onClose} className="modal-close-btn">X</button>
        <h2>{property.name}</h2>
        <img src="https://via.placeholder.com/350x150" alt="Property" style={{ width: '100%', marginBottom: '10px' }} />
        <p><strong>Type:</strong> {property.type}</p>
        <p><strong>Location:</strong> {property.location}</p>
        <p><strong>Price:</strong> ₹{property.price}</p>
        <p><strong>Description:</strong> {property.description}</p>
      </div>

    </div>
  )
}

export default PropertyModal