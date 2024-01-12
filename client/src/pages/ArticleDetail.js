
import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import { useCheckAuth } from '../components/checkauth';
import Header from '../components/Header';
import { Link } from 'react-router-dom';
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
    return (
      <>
      <Header />
      <p>Loading...</p>
      </>
    );
  }

  return (
    <>
    <Header />
    <div className="w-3/4 lg:w-full mx-auto mt-8 p-4 bg-white rounded shadow-lg">
      <div className="flex items-center mb-4">
        <img
          src={article.base64Image}
          alt={article.title}
          className="w-16 h-16 object-cover rounded-md mr-4"
        />
        <div>
          <strong className="text-lg">{article.title}</strong>
          <p className="text-gray-500">Topic: {article.topic}</p>
          <p className="text-gray-500">Created on: {article.createDate}</p>
        </div>
      </div>
      <div className="flex justify-between mt-8">
        <p className="text-gray-700"> <strong>Details:</strong> {article.detail}</p>
      </div>
      <div className="mt-12 text-right">
        <Link to="/articles" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
          ← Back to Articles menu
        </Link>
      </div>
    </div>
    </>
  );
};

export default ArticleDetail;
