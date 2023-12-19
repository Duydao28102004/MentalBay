import Header from '../components/Header'
import ArticleForm from '../components/ArticleForm';
import React, { useEffect} from 'react';
import { useCheckAuth } from '../components/checkauth';



const CreateArticle = () => {
  const checkAuth = useCheckAuth();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  return (  
    <div className="home">
      <h2>
        <Header></Header>
        <ArticleForm></ArticleForm>
      </h2>
    </div>
  )
}

export default CreateArticle;