import express  from  'express';

const app = express();

const db= {
    users: []
};

app.use(express.json());

app.get('/users', (req, res) =>{
    res.status(200).json({
        status: 'success',
        data:{
            users: db.users,
        },
    });
});


app.post('/user', (req, res) => {
    const { id, name, age, city } = req.body;

    const user = {
        id: db.users.length + 1,
        name,
        age,
        city,
    };
    db.users.push(user)

    res.status(201).json({
        data: {
            message:'user deatail created',
            user,
        }
    })
});

app.get("/singleUser/:id", (req, res) => {
    const { id } = req.params;
    const  user = db.users.find((user) => user.id == id);
    if(user){
        res.status(202).json(user);
    } else{
        res.status(404).json({
            data: {
                message:  "user not found",
            },
        });
    }
});
// Update user 
app.put('/user/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const { name, age, city } = req.body;
  
    const userToUpdate = db.users.find(user => user.id === id);
  
    if (!userToUpdate) {
      return res.status(404).json({ message: 'User not found' });
    }
  
    userToUpdate.name = name || userToUpdate.name;
    userToUpdate.age = age || userToUpdate.age;
    userToUpdate.city = city|| userToUpdate.city;
  
  
    return res.json({ message: 'User updated successfully', user: userToUpdate });
  });
  

app.delete('/user/:id', (req, res) => {
    const { id } = req.params;

    const user = db.users.find((user) => user.id == Number(id))
        
    if (!user) {
        res.status(404).json({
            data: {
                message:'user not found',
            },
        });
    }

    const index = db.users.indexOf(user);

    db.users.splice(index, 1);
    res.status(200).json({
        data: {
            message: 'user deleted Successfully',
        },
    });
});

app.listen(3005, () => {
    console.log('Server is running on port 3005');
});