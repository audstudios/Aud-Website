import HorizontalProjectHero from "@/components/project/horizontal/projectpagehero/horizontalprojecthero";
import HorizontalProjectContent from "@/components/project/horizontal/projectpagecontent/horizontalprojectcontent";

export default function HorizontalProjectPage({ projectData = null }) {
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
      <HorizontalProjectHero project={projectData} />
      <HorizontalProjectContent project={projectData} />
    </>
  );
}