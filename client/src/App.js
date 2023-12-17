import { BrowserRouter, Routes, Route} from 'react-router-dom';
import Home from './pages/Home'
import Login from './pages/Login';
import Register from './pages/Register';
import CreateArticle from './pages/CreateArticle';
import ArticleMenu from './pages/ArticleMenu';
import ArticleDetail from './pages/ArticleDetail';
import CreatePodcast from './pages/CreatePodcast';
import PodcastMenu from './pages/PodcastMenu';
import PodcastDetail from './pages/PodcastDetail';

function App() {
  return (
      <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Routes>
            <Route
              path='/'
              element={<Home />}
            />
            <Route
              path='/login'
              element={<Login />}
            />
            <Route
              path='/register'
              element={<Register />}
            />
            <Route
              path='/createarticle'
              element={<CreateArticle />}
            />
            <Route 
            path="/articles" 
            element={<ArticleMenu />} 
            />
            <Route 
            path="/articles/detail/:articleId" 
            element={<ArticleDetail />} 
            />
            <Route
              path='/createpodcast'
              element={<CreatePodcast />}
            />
            <Route
              path='/podcasts'
              element={<PodcastMenu />}
            />
            <Route 
            path="/podcasts/detail/:podcastId" 
            element={<PodcastDetail />} 
            />
          </Routes>
        </div>
      </BrowserRouter>
      </div>
  );
}

export default App;
