import React, { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Footer from '../../components/Footer';
import Navbar from '../../components/Navbar';
import ArticleDecor from '../../assets/article-decor.png';

const Article = () => {
  const location = useLocation();
  const [article, setArticle] = useState(location.state.article);

  return (
    <div>
      {/* Navbar */}
      <Navbar />

      {/* Top Panel */}
      <div className='w-full h-[436px] bg-[#145412] overflow-visible flex items-center justify-between'>
        <div className='flex flex-row items-center'>
          <img src={ ArticleDecor } alt='/' />
          <h1 className='text-[#F6FAFF] text-4xl font-bold absolute ml-24'>DETAIL ARTIKEL</h1>
        </div>
        <img src={ article.image } alt='/' className='lg:w-[520px] mt-[15%]' />
      </div>

      <div className='flex flex-col items-start lg:px-16 md:px-12 pt-4 pb-14'>
        <h1 className='lg:w-[640px] w-full font-semibold text-3xl text-[#333333] pb-12'>{ article.title }</h1>
        <p className='lg:w-[640px] w-full font-normal text-sm text-[#333333]' children={ article.desc } />
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default Article;