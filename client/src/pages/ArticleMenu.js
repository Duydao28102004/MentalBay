import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCheckAuth } from '../components/checkauth';
import { useSession } from '../components/IsLoggedIn';
import axios from 'axios';
import Gray from '../assets/gray.png';

const ArticleMenu = () => {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const { userData } = useSession();
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        let response;
        if (userData.userType === 'doctor') {
          response = await axios.get('http://localhost:3001/api/article');
        } else {
          response = await axios.get(`http://localhost:3001/api/article/${userData.userTopic}`);
        }
        setArticles(response.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching articles:', error);
        setLoading(false);
      }
    };

    checkAuth();
    fetchArticles();
  }, [checkAuth, userData]);

  return (
    <div className="md:w-3/5 w-5/6 mx-auto mt-8 p-4">
      <h2 className="text-2xl font-semibold mb-4">Article Menu</h2>
      <ul>
        {loading ? (
          <div className='flex mb-10'>
            <div className="flex flex-col bg-gray-100 px-4 py-4 rounded w-full">
              <img
                src={Gray}
                alt="Gray"
                className="w-auto"
              />
              {/* Loading state content */}
              <div className='text-3xl font-serif mt-10 w-full bg-gray-500'></div>
              <div>
                <p className="text-gray-500">
                  Topic: <div className='w-full bg-gray-500'></div>
                </p>
                <p className='text-gray-500'>Created date: <div className='w-full bg-gray-500'></div></p>
                <p className="my-4"><div className='w-full bg-gray-500'></div></p>
              </div>
              <Link to="/">
                <button className="px-4 py-2 text-white rounded-md bg-gray-500">
                  {/* Your button content */}
                </button>
              </Link>
            </div>
          </div>
        ) : (
          articles.map((article) => (
            <div key={article._id} className='flex mb-10'>
              <div className="flex flex-col bg-gray-100 px-4 py-4 rounded">
                <img
                  src={article.base64Image}
                  alt={article.title}
                  className="w-full"
                />
                {/* Article content */}
                <h1 className='text-3xl font-serif mt-10'>{article.title}</h1>
                <div>
                  <p className="text-gray-500">
                    Topic: {article.topic === 'anxietydisorders' ? 'Anxiety Disorders' :
                      article.topic === 'bipolardisorders' ? 'Bipolar Disorders' :
                        article.topic === 'ocd' ? 'Obsessive-Compulsive Disorder' :
                          article.topic === 'depression' ? 'Depression' :
                            article.topic}
                  </p>
                  <p className='text-gray-500'>Created date: {article.createDate}</p>
                  <p className="my-4">{article.detail.substring(0, 400)}{article.detail.length > 400 ? "..." : ""}</p>
                </div>
                <Link to={`/articles/detail/${article._id}`}>
                  <button className="px-4 py-2 bg-blue-300 text-white rounded-md hover:bg-blue-400">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))
        )}
      </ul>
    </div>
  );
};

export default ArticleMenu;
