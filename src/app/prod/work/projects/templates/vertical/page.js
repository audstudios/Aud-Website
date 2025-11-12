import NavigationGeneral from "@/components/nav/navgeneral/navgeneral";
import VerticalProjectHero from "@/components/project/vertical/projectpagehero/verticalprojecthero";
import VerticalProjectContent from "@/components/project/vertical/projectpagecontent/verticalprojectcontent";

import Link from 'next/link'; 

export default function VerticalProjectPage({ projectData = null }) {
  // If no project data, show placeholder or redirect
  if (!projectData) {
    return (
      <div style={{ padding: '100px', textAlign: 'center' }}>
        <h1>Project Template</h1>
        <p>This is a template page. Please access a specific project.</p>
      </div>
    );
  }

  return (
    <>
      <NavigationGeneral />
      <VerticalProjectHero project={projectData} />
      <VerticalProjectContent project={projectData} />
    </>
  );
}