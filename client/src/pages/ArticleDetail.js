// ArticleDetail.js
import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const ArticleDetail = () => {
  const { articleId } = useParams();
  const [article, setArticle] = useState(null);

  useEffect(() => {
    // Fetch the selected article from the server
    const fetchArticle = async () => {
      try {
        const response = await axios.get(`http://localhost:3001/api/getarticles/${articleId}`);
        console.log(response);
        setArticle(response.data);
      } catch (error) {
        console.error('Error fetching article:', error);
      }
    };

    fetchArticle();
  }, [articleId]);

  if (!article) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <h2>{article.title}</h2>
      <img src={article.base64Image} alt={article.title} className="rounded-sm mr-4"/>
      <p>{article.description}</p>
      <p>{article.detail}</p>
      <p>{article.topic}</p>
    </div>
  );
};

export default ArticleDetail;
