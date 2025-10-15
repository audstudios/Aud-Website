import NavigationGeneral from "@/components/nav/navgeneral/navgeneral";
import HorizontalProjectHero from "@/components/project/horizontal/projectpagehero/horizontalprojecthero";
import HorizontalProjectContent from "@/components/project/horizontal/projectpagecontent/horizontalprojectcontent";

export default function HorizontalProjectPage() {
  return (
    <>
      <NavigationGeneral />
      <HorizontalProjectHero />
      <HorizontalProjectContent />
    </>
  );
}
