import React from 'react'

import EditorJSHTML from 'editorjs-html';

// const editorJSHTML = EditorJSHTML();

// TODO: need to add proper props and validate data before rendering.
const SingleBlogCard = ({blog}) => {

   const formatDate = (isoDate) => {
    const date = new Date(isoDate);
    return date.toLocaleDateString('en-Us',{
        year:'numeric',
        month:'long',
        day:'numeric'
    })
}

    const {title,description,content,coverImg,category,rating,author,createdAt} = blog || {};
    // const htmlContent = editorJSHTML.parse(content).join('');

    const edjsParser = EditorJSHTML();
    let htmlCONTENT = edjsParser.parse(content)  
    // console.log(html);

    // const formatDate = (isoDate) => {
    //     const date = new Date(isoDate);
    //     return date.toLocaleDateString('en-Us',{
    //         year:'numeric',
    //         month:'long',
    //         day:'numeric'
    //     })
    // }
  return (
    <>
    <div className='bg-white p-8'>
        {/* blog header */}
        <div>
            <h1 className='md:text-4xl text-3xl font-medium mb-4'>{title}</h1>

            {/* TODO: Need to change author */}
            <p className='mb-6'>{formatDate(createdAt)} by 
              <span className='text-blue-400 cursor-pointer'>Admin 1</span></p>
        </div>

        <div>
            <img src={coverImg} alt='cover Image' className='w-full md:h-[520px] bg-cover'/>
        </div>

        {/* blog details */}
        <div className='mt-8 space-y-4'>
           {/* <div dangerouslySetInnerHTML={{__html: htmlContent}} className='space-y-3 editorjsdiv' />
            */}
            <div dangerouslySetInnerHTML={{__html: htmlCONTENT}} className='space-y-3 editorjsdiv' />

            <div>
              <span className='text-lg font-medium'>Rating: </span>
              <span>{rating} (based on 2,730 reviews)</span>
            </div>

            <h3 className='text-lg font-medium'>Key features</h3>
            <div>

              
            </div>
        </div>
    </div>
    </>
  )
}

export default SingleBlogCard