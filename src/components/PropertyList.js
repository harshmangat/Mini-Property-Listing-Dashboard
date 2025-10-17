import React, { useEffect, useState } from 'react';
import PropertyModal from './PropertyModal';
import AddPropertyForm from './AddPropertyForm';


function PropertyList() {

  const [properties, setProperties] = useState([]);
  const [searchText, setSearchText] = useState('');
  const [filterType, setFilterType] = useState('');
  const [selectedProperty, setSelectedProperty] = useState(null)
  const [showAddForm, setShowAddForm] = useState(false);


  useEffect(() => {
    fetchProperties();
  }, [])

  const fetchProperties = () => {
    fetch('http://localhost:5000/properties')
      .then(Response => Response.json())
      .then(data => setProperties(data))
      .catch(err => console.error('fetch error: ', err))
  };

  const addProperty = (property) => {
    fetch('http://localhost:5000/properties', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(property)
    })
      .then(response => {
        if (!response.ok) throw new Error('Failed to add');
        return response.json();
      })
      .then(() => {
        fetchProperties();
      })
      .catch(err => alert(err.message));

  }

  const filteredProperties = properties.filter((property) => {
    const matchesType = filterType ? property.type.toLowerCase() === filterType.toLowerCase() : true;

    const matchesSearch = property.name.toLowerCase().includes(searchText.toLowerCase()) || property.location.toLowerCase().includes(searchText.toLowerCase());

    return matchesType && matchesSearch;
  });

  return (
    <div>
      <h2>Property Listing</h2>

      <div className="property-controls">
        <input
          type="text"
          placeholder="Search by name or location"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
        <select
          value={filterType}
          onChange={(e) => setFilterType(e.target.value)}
        >
          <option value="">Filter by Type</option>
          <option value="Land">Land</option>
          <option value="Commercial">Commercial</option>
          {/* more types... */}
        </select>
        <div>
          <button
            className="add-property-btn"
            onClick={() => setShowAddForm(true)}
          >
            Add Property
          </button>

          {showAddForm && (
            <div className="add-property-modal-overlay">
              <div className="add-property-modal-content">
                <button
                  className="modal-close-btn"
                  onClick={() => setShowAddForm(false)}
                  aria-label="Close Add Property Form"
                >
                  &times;
                </button>
                <AddPropertyForm
                  onAdd={(property) => {
                    addProperty(property);
                    setShowAddForm(false);
                  }}
                />
              </div>
            </div>
          )}
        </div>
      </div>

      <div className="property-list">
        {filteredProperties.map((property) => (
          <div key={property.id} className="property-card">
            <h3>{property.name}</h3>
            <p>Type: {property.type}</p>
            <p>Location: {property.location}</p>
            <p>Price: ₹{property.price}</p>
            <p>{property.description}</p>
            <button onClick={() => setSelectedProperty(property)} >View</button>
          </div>
        ))}
      </div>

      {selectedProperty && (
        <PropertyModal property={selectedProperty} onClose={() => setSelectedProperty(null)} />
      )}

      {/* <AddPropertyForm onAdd={addProperty} /> */}

    </div>
  )
}

export default PropertyList;