// ArticleMenu.js
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/Header';
import axios from 'axios';

const ArticleMenu = () => {
  const [articles, setArticles] = useState([]);

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

    fetchArticles();
  }, []);

  return (
    <>
    <Header></Header>
    <div className="mt-8 p-4 w-3/4 mx-auto bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">Article Menu</h2>
      <ul>
        {articles.map((article) => (
          <li key={article._id} className="mb-4">
            <Link to={`/articles/detail/${article._id}`} className="flex items-center">
              <img
                src={article.base64Image}
                alt={article.title}
                className="w-10 h-10 rounded-sm mr-4"
              />
              <div>
                <strong className="text-lg">{article.title}</strong>
                <p className="text-gray-600">{article.description}</p>
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
