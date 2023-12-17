
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { useCheckAuth } from '../components/checkauth';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);
  const checkAuth = useCheckAuth();

  useEffect(() => {
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getarticles/${articleId}`);
        console.log(response);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };
    checkAuth()
    fetchArticle();
  }, [articleId, checkAuth]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div className="max-w-2xl mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <h2 className="text-2xl font-semibold mb-4">{article.title}</h2>
      <div className="flex items-center mb-4">
        <img
          src={article.base64Image}
          alt={article.title}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div>
          <strong className="text-lg">{article.title}</strong>
          <p className="text-gray-600">{article.description}</p>
        </div>
      </div>
      <p className="text-gray-700">{article.detail}</p>
      <p className="mt-4 text-gray-500">Topic: {article.topic}</p>
      <p className="text-gray-500">Created on: {article.createDate}</p>
    </div>
  );
};

export default ArticleDetail;
