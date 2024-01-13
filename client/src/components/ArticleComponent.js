import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCheckAuth } from './checkauth';
import { useSession } from './IsLoggedIn';
import axios from 'axios';

const ArticleComponent = () => {
  const [articles, setArticles] = useState([]);
  const { userData } = useSession();
  const checkAuth = useCheckAuth();
  const [loading, setLoading] = useState(true);

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
        setLoading(false); // Set loading to false after fetching articles
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false); // Set loading to false on error as well
      }
    };
    checkAuth();
    fetchArticles();
  }, [checkAuth, userData]);

  // Display only the first four articles if userType is 'doctor'
  const displayedArticles = userData.userType === 'doctor' ? articles.slice(0, 4) : articles.slice(0, 1);

  return (
    <div className="mb-10">
      <h1 className="text-4xl text-center font-bold">Articles</h1>

      {loading ? (
        <p className="text-center">Loading...</p>
      ) : (
        <div className="flex flex-col ">
          {displayedArticles.map((article) => (
            <React.Fragment key={article._id}>
              <div className='flex flex-row my-10'>
              <img src={article.base64Image} alt={article.title} className="w-full md:w-1/2 h-auto md:mr-8 mb-4 md:mb-0" />
              <div>
                <h2 className="text-3xl font-bold mb-4">{article.title}</h2>
                <p className="mb-4">{article.createDate}</p>
                <p className="mb-4">{article.detail.substring(0, 400)}{article.detail.length > 400 ? "..." : ""}</p>
                <Link to={`/articles/detail/${article._id}`} className="items-center">
                  <button className="px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-400">
                    Read More
                  </button>
                </Link>
              </div>
              </div>
            </React.Fragment>
          ))}
        </div>
      )}
    </div>
  );
};

export default ArticleComponent;
