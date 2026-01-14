import './aboutcontent.css';

import Link from 'next/link'; 

export default function AboutContent() {
  return (
    <div className='about-content-container'>
        <div className='about-content-wrapper'>
            <h1 className='about-content-title page-title'>About</h1>
            <p className='about-content-paragraph thirty-spacer'>For the past decade we’ve partnered with some of the world’s most iconic brands, working side by side as collaborators and friends. Along the way, we reimagined how production and strategy could work, more agile, intentional, and dynamic.</p>
<p className='about-content-paragraph thirty-spacer'>So we created <span className='bolded'>aud studios</span>: a founder-led creative strategy and production agency built for those who want to work directly with the people doing the work.</p>
        </div>        
    </div>
  );
}
