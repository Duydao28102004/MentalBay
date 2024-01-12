import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCheckAuth } from './checkauth';
import { useSession } from './IsLoggedIn';
import axios from 'axios';

const ArticleComponent = () => {
  const [articles, setArticles] = useState([]);
  const { userData } = useSession();
  const checkAuth = useCheckAuth();

  useEffect(() => {
    // Fetch articles from the server
    const fetchArticles = async () => {
      try {
        let response;
        if (userData.userType === 'doctor') {
          response = await axios.get('http://localhost:3001/api/article');
        } else {
          response = await axios.get(`http://localhost:3001/api/article/${userData.userTopic}`);
        }
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    checkAuth();
    fetchArticles();
  }, [checkAuth, userData]);

  // Display only the first four articles
  const displayedArticles = articles.slice(0, 4);

  return (
    <div className='p-4 text-center block justify-between items-center w-3/4 mx-auto mt-10 bg-white rounded-md shadow-md'>
        <h2 className="text-2xl font-bold mb-4">Recent aritcles</h2>
        <div className="flex flex-wrap gap-4">
        {displayedArticles.map((article) => (
          <div key={article._id} className="w-full md:w-1/2 lg:w-1/5 mx-auto mb-4 p-4 bg-gray-100 rounded-md">
            <Link to={`/articles/detail/${article._id}`} className="items-center">
              <img
                src={article.base64Image}
                alt={article.title}
                className="w-400 h-400 object-cover rounded-md mr-4"
              />
              <div>
                <strong className="text-lg">{article.title}</strong>
                <p className="text-gray-600">{article.topic}</p>
                <p className="text-gray-600">{article.createDate}</p>
              </div>
            </Link>
          </div>
        ))}
    </div>
    </div>
    
  );
};

export default ArticleComponent;
