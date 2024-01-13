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
import Chat from './pages/Chat';
import ChatDoctorList from './pages/DoctorChatList';
import PieChartPage from './pages/PieChartPage';
import Chatbot from './pages/Chatbot';
import Header from './components/Header';
import Footer from './components/Footer';

function App() {
  return (
      <div className="App">
      <BrowserRouter>
        <div className="pages">
          <Header></Header>
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
            <Route 
            path="/chat/:chatId/:user" 
            element={<Chat />} 
            />
            <Route 
            path="/chatlist" 
            element={<ChatDoctorList />} 
            />
            <Route 
            path="/charts" 
            element={<PieChartPage />} 
            />
            <Route 
            path="/chatbot" 
            element={<Chatbot />} 
            />
          </Routes>
          <Footer></Footer>
        </div>
      </BrowserRouter>
      </div>
  );
}

export default App;
