import React, { useState } from 'react'

function AddPropertyForm({ onAdd }) {

  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    price: '',
    description: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault()

    if (!formData.name || !formData.type || !formData.price || !formData.location) {
      alert('Please fill all required fields');
      return
    }

    onAdd({
      ...formData,
      price: Number(formData.price)
    })

    setFormData({
      name: '',
      type: '',
      location: '',
      price: '',
      description: ''
    });
  }

  return (
    <form className="add-property-form" onSubmit={handleSubmit} >
      <h3>Add Property</h3>
      <input
        name="name"
        placeholder="Property Name"
        value={formData.name}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '300px' }}
      />
      <input
        name="type"
        placeholder="Type (Land, Commercial, etc.)"
        value={formData.type}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '300px' }}
      />
      <input
        name="location"
        placeholder="Location"
        value={formData.location}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '300px' }}
      />
      <input
        name="price"
        placeholder="Price"
        type="number"
        value={formData.price}
        onChange={handleChange}
        required
        style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '300px' }}
      />
      <textarea
        name="description"
        placeholder="Description"
        value={formData.description}
        onChange={handleChange}
        style={{ display: 'block', marginBottom: '10px', padding: '5px', width: '300px' }}
      />
      <button type="submit" style={{ padding: '8px 20px' }}>Submit</button>
    </form>
  )
}

export default AddPropertyForm