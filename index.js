import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const port = 3000;


var postsDatabase= [];


const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];
  
  


app.use(bodyParser.urlencoded({ extended: true }));

app.use(express.static('public'));  

app.get('/', (req,res) => {
    res.render("index.ejs",{
        postsDatabase:postsDatabase
     })

  });

//Navigate to create post section 
app.get('/create.ejs', (req,res) => {
    res.render("create.ejs");
  });
//Navigate to about section
app.get('/about.ejs', (req,res) => {
    res.render("about.ejs");
  });

//post info
app.get('/info/:i', (req,res) =>{
    const postID =req.params.i;
    const post = postsDatabase[postID];
    
    res.render("info.ejs",{
        post:post,
        id:postID
    });
});

//post method
app.post('/submit', (req,res)=>{
    //getting the date
    var currentDay= new Date();
    var date= dateString(currentDay);
    var title= req.body['title'];
    var content= req.body['content'];
    //creating an post object
    let posts={
        title: title,
        content:content,
        date:date
    };
    //push into database
    postsDatabase.push(posts),

    res.render("index.ejs",{
       postsDatabase:postsDatabase
    })
})


//update post
app.post('/updatePost/:i', (req,res) =>{
    const postID =req.params.i;
    //update the database
    var newTitle= req.body['newTitle'];
    var newContent= req.body['newContent'];
    postsDatabase[postID].title=newTitle;
    postsDatabase[postID].content=newContent;
    
    res.redirect("/");
});


//delete post
app.post('/deletePost/:i', (req,res) =>{
    const postID =req.params.i;
    postsDatabase.splice(postID,1);  //delete one item from position ID
    //update the database
    res.render("index.ejs",{
        postsDatabase:postsDatabase
    });
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
  


//Current date function
function dateString(currentDay){
    var currentDate= currentDay.getDate();
    var currentMonth=currentDay.getMonth();
    var currentYear=currentDay.getFullYear();
    var date=`${currentDate} ${monthNames[currentMonth]} ${currentYear}`;
    return date;
}