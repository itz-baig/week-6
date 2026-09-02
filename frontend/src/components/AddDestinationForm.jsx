import { useState } from "react"

export default function AddDestinationForm({onDestinationAdd}) {
    const [name,setName] = useState('');
    const [location,setLocation] = useState('');
    const [country,setCountry] = useState('');
    const [continent,setContinent] = useState('');
    const [isOpenToPublic,setIsOpenToPublic] = useState(true);
    const [funFact,setFunFact] = useState('');
    const [description,setDescription] = useState('');

    async function handleSubmit(e) {
        e.preventDefault();
        const newItem = {
            name,
            location,
            country,
            continent,
            is_open_to_public:isOpenToPublic,
            details:{
                fun_fact:funFact,
                description
            },
            uuid:crypto.randomUUID()
        }
        try{
            const response = await fetch('http://localhost:3000/data',{
                method: "POST",
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(newItem)
            });

            if(response.ok){
				onDestinationAdd();
                setContinent("");
                setCountry("");
                setLocation("");
                setName("");
                setFunFact("");
                setDescription("");
                setIsOpenToPublic(true);
			}
        } catch(error){
            console.log(error);
        }
    }

    return (
        <form onSubmit={handleSubmit}>
            <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} required />
            <input type="text" placeholder="Country" value={country} onChange={(e) => setCountry(e.target.value)} required />
            <input type="text" placeholder="Continent" value={continent} onChange={(e) => setContinent(e.target.value)} required />
            
            <select value={isOpenToPublic} onChange={(e) => setIsOpenToPublic(e.target.value === 'true')}>
                <option value="true">Yes (Open to Public)</option>
                <option value="false">No (Restricted)</option>
            </select>
            <input type="text" placeholder="Fun Fact" value={funFact} onChange={(e) => setFunFact(e.target.value)} />
            <input type="text" placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />
            <button type="submit">Add Destination</button>
        </form>
    );
}