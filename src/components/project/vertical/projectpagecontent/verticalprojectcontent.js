import '../../projecthero.css';
import './verticalprojectcontent.css';

import Link from 'next/link'; 

export default function VerticalProjectContent() {
  return (
    <div className='vertical-project-content-container'>
      <div className='vertical-project-content-wrapper'>
        <div className='vertical-project-left-content'>
          <div className='project-content-vertical-mainimages'>fart</div>
            <div className='project-content-lower-wrapper'>
              <div className='project-content-vertical-subimages'></div>   
              <div className='project-content-vertical-subimages'></div>                
              <div className='project-content-vertical-subimages'></div>  
            </div>                  
        </div>
        <div className='project-right-content'>
          <h3 className='project-content-mainline'>Here is where you might put a sizzle line or something that kindof hooks the reader in , idk put something here like “Horse in a straw hat” or something engaging to really hook a user to read. Sometimes just a quote could be enough.</h3>
          <p className='project-content-subcontent'>Here is where you can put some content giving background information, like what AUD did specifically, how you guys made the shoot happen. Tell or sell the story of what working with aud means in these sections.</p>
          <p className='project-content-subcontent'>Here is where you can put some content giving background information, like what AUD did specifically, how you guys made the shoot happen. Tell or sell the story of what working with aud means in these sections.</p>
          <p className='project-content-subcontent'>Here is where you can put some content giving background information, like what AUD did specifically, how you guys made the shoot happen. Tell or sell the story of what working with aud means in these sections.</p>
          <p className='project-content-subcontent'>Here is where you can put some content giving background information, like what AUD did specifically, how you guys made the shoot happen. Tell or sell the story of what working with aud means in these sections.</p>
          <div>
            <img className='project-brand-logo' src="/images/logos/CarouselLogo_png-15.png"></img>
          </div>
        </div>
      </div>
    </div>
  );
}
