import http from 'node:http';
import fs from 'node:fs/promises';

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

const server = http.createServer(async (req,res) => {
    const data = await loadData();
    const jsonData = JSON.stringify(data);

    if (req.method === 'GET' && req.url === '/') {
        res.setHeader('Content-Type','text/plain');
        res.statusCode = 200;
        res.end(`This is the home page`);
    } else if (req.method === 'GET' && req.url === '/data') {
        res.setHeader('Content-Type','application/json');
        res.statusCode = 200;
        res.end(jsonData);
    } else if (req.method === 'POST' && req.url === '/data') {
        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async() => {
            const newItem = JSON.parse(body);
            data.push(newItem);

            await fs.writeFile('./data.json', JSON.stringify(data,null,2));
            
            res.setHeader('Content-Type','application/json');
            res.statusCode = 201;
            res.end(JSON.stringify({message: 'Data saved successfully',item:newItem}));
        })
    } else if (req.method === 'PUT' && req.url.startsWith('/data/')) {

        const id = req.url.split('/').pop();
        const itemIndex = data.findIndex(item => item.uuid === id);

        let body = '';

        req.on('data', chunk => {
            body += chunk.toString();
        });

        req.on('end', async() => {
            if(itemIndex !== -1){
            
                const newItem = JSON.parse(body);
                data[itemIndex] = {...data[itemIndex], ...newItem};
    
                await fs.writeFile('./data.json', JSON.stringify(data,null,2));
                
                res.setHeader('Content-Type','application/json');
                res.statusCode = 201;
                res.end(JSON.stringify({message: 'Data updated successfully', updatedItem: data[itemIndex]}));
            } else {
                res.setHeader('Content-Type','application/json');
                res.statusCode = 404;
                res.end(JSON.stringify({message: 'Item not found'}));
            }
        })
    } else if (req.method === 'DELETE' && req.url.startsWith('/data/')) {
        const id = req.url.split('/').pop();
        const newData = data.filter(item => item.uuid !== id);
        
        if(newData.length !== data.length){
            await fs.writeData('./data.json', JSON.stringify(newData,null,2));

            res.setHeader('Content-Type', 'application/json');
            res.statusCode = 200;
            res.end(JSON.stringify({message: 'Item deleted successfully'}));
        } else {
            res.setHeader('Content-Type','application/json');
            res.statusCode = 404;
            res.end(JSON.stringify({message: 'Item not found'}));
        }
    }
    else {
        res.setHeader('Content-Type','text/plain');
        res.statusCode = 404;
        res.end(`Page not found`);
    }
});

server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});