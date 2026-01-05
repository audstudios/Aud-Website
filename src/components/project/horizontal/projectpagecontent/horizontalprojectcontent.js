// src/components/project/horizontal/projectpagecontent/horizontalprojectcontent.js
import '../../projecthero.css';
import './horizontalprojectcontent.css';

export default function HorizontalProjectContent({ project }) {
  // Fallback if no project data
  if (!project) {
    return (
      <div className='horizontal-project-content-container'>
        <div className='horizontal-project-content-wrapper'>
          <div className='horizontal-project-left-content'>
            <div className='horizontal-project-content-img-main'></div>
            <div className='horizontal-project-content-img-main'></div>
            <div className='horizontal-project-content-img-main'></div>
          </div>
          <div className='project-right-content'>
            <h3 className='project-content-mainline'>Placeholder content...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='horizontal-project-content-container'>
      <div className='horizontal-project-content-wrapper'>
        <div className='horizontal-project-left-content'>
          {project.mainImages?.map((image, index) => (
            <div key={index} className='horizontal-project-content-img-main'>
              <img 
                src={image} 
                alt={`${project.title} project image ${index + 1}`} 
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>
          ))}
        </div>
        <div className='project-right-content'>
          <h3 className='project-content-mainline'>{project.mainline}</h3>
          
          {project.content?.map((paragraph, index) => (
            <p 
              key={index} 
              className='project-content-subcontent'
              dangerouslySetInnerHTML={{ __html: paragraph }}
            />
          ))}
          
          {project.brandLogo && (
            <div className='project-brand-logo'>
              <img 
                className='project-brand-logo-img' 
                src={project.brandLogo}
                alt={`${project.client} brand logo`}
              />
            </div>
          )}
          
          <div className='project-content-subimages-wrapper'>
            {project.subImages?.map((image, index) => (
              <div key={index} className='project-content-horizontal-subimages'>
                <img 
                  src={image} 
                  alt={`${project.title} additional detail ${index + 1}`} 
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
