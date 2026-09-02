import { useState } from "react"

export default function Card({data, onDelete, onEdit, isEditing, onEditToggle, onCancel}) {

	const [name, setName] = useState(data.name);
	const [location, setLocation] = useState(data.location);
	const [country, setCountry] = useState(data.country);
	const [continent, setContinent] = useState(data.continent);
	const [isOpenToPublic, setIsOpenToPublic] = useState(data.is_open_to_public);
	const [funFact, setFunFact] = useState(data.details?.fun_fact || '');
	const [description, setDescription] = useState(data.details?.description || '');

	const handleSave = () => {
		const updateItem ={
			name,
			location,
			country,
			continent,
			is_open_to_public:isOpenToPublic,
			details:{
				fun_fact:funFact,
				description
			}
		}

		onEdit(data.uuid, updateItem);
		onCancel();
	}

if (isEditing) {
  return (
    <div className="card">
      <div className="card-content">
        <input value={name} onChange={(e) => setName(e.target.value)} placeholder="Name" />
        <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
        <input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Country" />
        <input value={continent} onChange={(e) => setContinent(e.target.value)} placeholder="Continent" />
        
        <select value={isOpenToPublic} onChange={(e) => setIsOpenToPublic(e.target.value === 'true')}>
          <option value="true">Yes (Open to Public)</option>
          <option value="false">No (Restricted)</option>
        </select>

        <input value={funFact} onChange={(e) => setFunFact(e.target.value)} placeholder="Fun Fact" />
        <input value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />

        <button onClick={handleSave}>Save</button>
        <button onClick={onCancel}>Cancel</button>
      </div>
    </div>
  );
}

return (
  <div className="card">
    <div className="card-content">
      <h3>{data.name}</h3>
      <p>Location: {data.location}</p>
      <p>Country: {data.country}</p>
      <p>Continent: {data.continent}</p>
      <p>Is Open to Public: {data.is_open_to_public ? 'Yes' : 'No'}</p>
      <p>Fun Fact: {data.details?.fun_fact}</p>
      <p>Description: {data.details?.description}</p>
      
      <button onClick={onEditToggle}>EDIT</button>
      <button onClick={() => onDelete(data.uuid)}>DELETE</button>
    </div>
  </div>
);

}