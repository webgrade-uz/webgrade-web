import React from 'react'
import { useLanguage } from '../i18n/LanguageContext'

const Blog = () => {
  const { t } = useLanguage();

  return (
    <section id="blog" className="py-24 bg-[#f1f1f1]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <span className="text-[#989898] font-medium tracking-widest text-sm">{t.blog.badge}</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-4 text-[#000000]">{t.blog.title}</h2>
          <p className="text-[#989898] mt-4">{t.blog.description}</p>
        </div>
      </div>
    </section>
  )
}

export default Blog
