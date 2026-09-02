import { useEffect, useState } from 'react'
import Card from './components/Card';
import AddDestinationForm from './components/AddDestinationForm';

export default function App() {
  const [destination, setDest] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [editingUuid, setEditingUuid] = useState(null);

  useEffect(() => {
    fetchDestinations();
  },[]);

  async function fetchDestinations() {
    try {
      setLoading(true);
      setError(null);
      
      const response = await fetch('http://localhost:3000/data');
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      
      const data = await response.json();
      setDest(data);
    } catch (err) {
      setError("Failed to load destinations. Make sure the server is running.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  async function deleteDestination(uuid) {

    try {
      const response = await fetch(`http://localhost:3000/data/${uuid}`,{
        method:'DELETE'
      });

      if(response.ok){
        fetchDestinations();
      }
    } catch (error) {
      console.log(error);
    }
  }

  async function updateDestination(uuid, updateData) {
    try {
      const response = await fetch(`http://localhost:3000/data/${uuid}`,{
        method:'PUT',
        headers:{
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(updateData)
      })

      if(response.ok){
        fetchDestinations();
      }
    } catch (error) {
      console.log(error);
    }
  }

  return(
    <div>
      <h1>Destinations</h1>
      <AddDestinationForm onDestinationAdd = {fetchDestinations}/>
      {loading && <p style={{ color: 'gray', textAlign: 'center' }}>Loading destinations...</p>}
      {error && <p style={{ color: '#ef4444', textAlign: 'center' }}>{error}</p>}
      {!loading && !error && (
        <div className='card-section'>
          {destination.length === 0 ? (
            <p style={{ textAlign: 'center' }}>No destinations found.</p>
          ) : (
            destination.map((dest) => (
              <Card 
                data={dest} 
                key={dest.uuid} 
                onDelete={deleteDestination}
                onEdit={updateDestination}
                isEditing={editingUuid === dest.uuid}
                onEditToggle={() => setEditingUuid(dest.uuid)}
                onCancel={() => setEditingUuid(null)}
              />
            ))
          )}
        </div>
      )}
    </div>
  )
}