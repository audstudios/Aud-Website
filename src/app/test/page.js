import Navigation from "@/components/nav/nav";
import Homehero from "@/components/Home/homehero/homehero";
import Services from "@/components/Home/Services/services";
import HomeSlider from "@/components/Home/homeslider/homeslider";
import HomeCarousel from "@/components/Home/homecarousel/homecarousel";
import HomeContact from "@/components/Home/homecontact/homecontact";

export default function Test() {
  return (
    <div>
        <Navigation />
        <Homehero />
        <Services />
        <HomeSlider />
        <HomeCarousel />
        <HomeContact />
    </div>
  );
}