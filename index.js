import express from "express";
import bodyParser from "body-parser";

const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));

let posts = [
  { id: 1, title: 'Post 1', content: 'Lorem ipsum dolor sit amet...' },
  { id: 2, title: 'Post 2', content: 'Consectetur adipiscing elit...' }
];

// Render the home page with all posts
app.get('/', (req, res) => {
  res.render('index', { posts });
});

// Render the edit form for a specific post
app.get('/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const post = posts.find(post => post.id === postId);
  res.render('edit', { post });
});

// Handle new post submission
app.post('/new', (req, res) => {
  const { title, content } = req.body;
  const id = posts.length + 1; // Generate a new unique id
  const newPost = { id, title, content };
  posts.push(newPost);
  res.redirect('/');
});

// Handle post editing form submission
app.post('/edit/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  const { title, content } = req.body;
  const index = posts.findIndex(post => post.id === postId);
  if (index !== -1) {
    posts[index].title = title;
    posts[index].content = content;
    res.redirect('/');
  } else {
    res.status(404).send('Post not found');
  }
});

// Handle post deletion
app.post('/delete/:id', (req, res) => {
  const postId = parseInt(req.params.id);
  posts = posts.filter(post => post.id !== postId);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
