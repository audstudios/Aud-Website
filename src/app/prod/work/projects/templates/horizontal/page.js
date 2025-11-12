// src/app/prod/work/projects/templates/horizontal/page.js
import HorizontalProjectHero from "@/components/project/horizontal/projectpagehero/horizontalprojecthero";
import HorizontalProjectContent from "@/components/project/horizontal/projectpagecontent/horizontalprojectcontent";

export default function HorizontalProjectPage({ projectData }) {
  return (
    <>
      <HorizontalProjectHero project={projectData} />
      <HorizontalProjectContent project={projectData} />
    </>
  );
}
