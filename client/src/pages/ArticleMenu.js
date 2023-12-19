import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useCheckAuth } from '../components/checkauth';
import Header from '../components/Header';
import axios from 'axios';

const ArticleMenu = () => {
  const [articles, setArticles] = useState([]);
  const checkAuth = useCheckAuth();

  useEffect(() => {
    // Fetch articles from the server
    const fetchArticles = async () => {
      try {
        const response = await axios.get('http://localhost:3001/api/article');
        setArticles(response.data);
      } catch (error) {
        console.error('Error fetching articles:', error);
      }
    };
    checkAuth();
    fetchArticles();
  }, [checkAuth]);

  return (
    <>
    <Header></Header>
    <div className="max-w-xl mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Article Menu</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id} className="mb-4 p-4 bg-gray-100 rounded-md">
            <Link to={`/articles/detail/${article._id}`} className="flex items-center">
              <img
                src={article.base64Image}
                alt={article.title}
                className="w-12 h-12 object-cover rounded-md mr-4"
              />
              <div>
                <strong className="text-lg">{article.title}</strong>
                <p className="text-gray-600">{article.description}</p>
                <p className="text-gray-600">{article.createDate}</p>
              </div>
            </Link>
          </li>
        ))}
      </ul>
    </div>
    </>
  );
};

export default ArticleMenu;