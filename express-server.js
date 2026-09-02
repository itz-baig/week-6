import express from 'express';
import cors from 'cors';
import fs from 'node:fs/promises';


const app = express();
app.use(cors());
app.use(express.json());
const PORT = 3000;

async function loadData() {

  try {
    const fileData = await fs.readFile('./data.json','utf8');
    return JSON.parse(fileData);
  } catch (error) {
    console.log(error);
    return [];
  }
}

app.get('/', (req,res) => {
  res.send('This is the home page');
});

app.get('/data', async (req, res) => {
  const data = await loadData();
  res.json(data);
});

app.post('/data', async (req,res) => {
  const newData = req.body;
  const data = await loadData();
  data.push(newData);
  await fs.writeFile('./data.json',JSON.stringify(data,null,2));

  res.status(201).json({message:"Data saved successfully", item:newData});
});

app.put('/data/:uuid', async (req, res) => {
  const id = req.params.uuid;
  const updatedItem = req.body;
  const data = await loadData();
  const itemIndex = data.findIndex(item => item.uuid === id);
  
  if (itemIndex !== -1){
    data[itemIndex] = {...data[itemIndex], ...updatedItem};
    
    await fs.writeFile('./data.json', JSON.stringify(data, null, 2));

    res.status(200).json({message:'Data updated successfully', updatedItem:data[itemIndex]});
  } else {
    res.status(404).json({message:'Item not found'});
  }
})

app.delete('/data/:uuid', async (req, res) => {
  const id = req.params.uuid;
  const data = await loadData();
  const newData = data.filter(d => d.uuid !== id);

  if (newData.length !== data.length){
    await fs.writeFile('./data.json', JSON.stringify(newData, null, 2));
    res.status(200).json({message: 'Item deleted successfully'});
  } else {
    res.status(404).json({message: 'Item not found'});
  }
})

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

export default app;