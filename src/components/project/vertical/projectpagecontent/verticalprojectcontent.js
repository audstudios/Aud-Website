import '../../projecthero.css';
import './verticalprojectcontent.css';

export default function VerticalProjectContent({ project }) {
  if (!project) {
    return (
      <div className='vertical-project-content-container'>
        <div className='vertical-project-content-wrapper'>
          <div className='vertical-project-left-content'>
            <div className='project-content-vertical-mainimages'>Placeholder</div>
          </div>
          <div className='project-right-content'>
            <h3 className='project-content-mainline'>Loading...</h3>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className='vertical-project-content-container'>
      <div className='vertical-project-content-wrapper'>
        <div className='vertical-project-left-content'>
          {project.mainImages && project.mainImages[0] && (
            <div className='project-content-vertical-mainimages'>
              <img 
                src={project.mainImages[0]} 
                alt={`${project.title} main vertical project image`}
                style={{width: '100%', height: '100%', objectFit: 'cover'}}
              />
            </div>
          )}
          <div className='project-content-lower-wrapper'>
            {project.subImages?.map((image, index) => (
              <div key={index} className='project-content-vertical-subimages'>
                <img 
                  src={image} 
                  alt={`${project.title} vertical detail ${index + 1}`}
                  style={{width: '100%', height: '100%', objectFit: 'cover'}}
                />
              </div>
            ))}
          </div>
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
            <div>
              <img 
                className='project-brand-logo' 
                src={project.brandLogo}
                alt={`${project.client} brand logo`}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
