
import React, { useState, useEffect } from 'react';
import {  useParams } from 'react-router-dom';
import axios from 'axios';
import { useCheckAuth } from '../components/checkauth';
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
      <p>Loading...</p>
      </>
    );
  }

  return (
    <><div className="w-3/5 mx-auto mt-8 p-4 bg-gray-100 rounded shadow-lg">
      <div className='flex mb-10'>
        <div className="flex flex-col ">
          <img
            src={article.base64Image}
            alt={article.title}
            className="w-full" />
          <h1 className='text-3xl font-serif mt-10'>{article.title}</h1>
          <div>
            <p className="text-gray-500">
              Topic: {article.topic === 'anxietydisorders' ? 'Anxiety Disorders' :
                article.topic === 'bipolardisorders' ? 'Bipolar Disorders' :
                  article.topic === 'ocd' ? 'Obsessive-Compulsive Disorder' :
                    article.topic === 'depression' ? 'Depression' :
                      article.topic}
              <span className='ml-12'>Created date: {article.createDate}</span>
            </p>
            <p className="my-4">{article.detail}</p>
          </div>
        </div>
        
      </div>
      <div className="mt-12 text-right">
          <Link to="/articles" className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 focus:outline-none">
            ← Back to Articles menu
          </Link>
        </div>
    </div></>
    );
  };

export default ArticleDetail;
    
