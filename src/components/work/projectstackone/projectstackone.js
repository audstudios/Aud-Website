import './projectstackone.css';
import Link from 'next/link';

const projects = [
  {
    title: 'JEAN PAUL GAULTIER PRIDE',
    client: 'NORTH SIX // JEAN PAUL GAULTIER ',
    type: 'Experiential and Event Content Production ',
    year: '2025',
    href: '/prod/work/project-a',
    positionClass: 'stack-one-left',
  },
  {
    title: 'CARDI B x DOORDASH',
    client: 'GET ENGAGED MEDIA // DOORDASH ',
    type: 'Full-service video & film production',
    year: '2025',
    href: '/prod/work/project-b',
    positionClass: 'stack-one-center',
  },
  {
    title: 'Project Title 3',
    client: 'Client C',
    type: 'Project Type C',
    year: '2023',
    href: '/prod/work/project-c',
    positionClass: 'stack-one-right',
  },
];

export default function ProjectStackOne() {
  return (
    <div className="project-stack-one-container">
      <div className="project-stack-one-wrapper">
        {projects.map((project, index) => (
          <Link href={project.href} key={index}>
            <div className={`project-card-vert-container ${project.positionClass}`}>
              <div className="project-card-vert-wrapper">
                <div className="project-card-vert-content-left">
                  <p className="project-card-vert-content-left-top">
                    {project.title}
                  </p>
                  <p className="project-card-vert-content-left-bottom">
                    {project.client}
                  </p>
                </div>
                <div className="project-card-vert-content-right">
                  <p className="project-card-vert-content-right-top">
                    {project.type}
                  </p>
                  <p className="project-card-vert-content-right-top">
                    {project.year}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
