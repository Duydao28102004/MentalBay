import Header from '../components/Header'
import ArticleForm from '../components/ArticleForm';
import React from 'react';

const CreateArticle = () => {
  return (  
    <div className="home">
      <h2>
        <Header></Header>
        <ArticleForm></ArticleForm>
      </h2>
    </div>
  )
}

export default CreateArticle