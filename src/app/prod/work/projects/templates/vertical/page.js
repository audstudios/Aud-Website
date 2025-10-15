import NavigationGeneral from "@/components/nav/navgeneral/navgeneral";
import VerticalProjectHero from "@/components/project/vertical/projectpagehero/verticalprojecthero";
import VerticalProjectContent from "@/components/project/vertical/projectpagecontent/verticalprojectcontent";

import Link from 'next/link'; 

export default function HorizontalProjectPage() {
  return (
    <>
      <NavigationGeneral />
      <VerticalProjectHero />
      <VerticalProjectContent />
    </>
  );
}
