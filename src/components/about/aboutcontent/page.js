import './aboutcontent.css';

import Link from 'next/link'; 

export default function AboutContent() {
  return (
    <div className='about-content-container'>
        <div className='about-content-wrapper'>
            <h1 className='about-content-title page-title'>About</h1>
            <p className='about-content-paragraph thirty-spacer'>For the past decade we’ve partnered with some of the world’s most iconic brands, working side by side as collaborators and friends. Along the way, we reimagined how production and strategy could work, more agile, intentional, and dynamic.</p>
<p className='about-content-paragraph thirty-spacer'>So we created <span className='bolded'>aud studios</span>: a founder-led creative strategy and production agency built for those who want to work directly with the people doing the work.</p>
<p className='about-content-paragraph thirty-spacer'>Whether you’re at an agency, in-house at a brand, or looking for work, we’d love to connect. We’re always looking to grow our network of talented creatives. </p>
<p className='about-content-paragraph thirty-spacer'>web@audstudios.com</p>
<p className='about-content-paragraph thirty-spacer'>Follow along on Instagram: <span className='bolded'><a className='audlinks' href="https://www.instagram.com/the.audstudios/?igsh=NW9ycnc1YzJkaG5w#">@the.audstudios</a></span></p>
        </div>        
    </div>
  );
}
