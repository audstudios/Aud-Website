import Navigation from "@/components/nav/nav";
import Homehero from "@/components/home/homehero/homehero";
import Services from "@/components/home/services/services";
import HomeSlider from "@/components/home/homeslider/homeslider";
import HomeCarousel from "@/components/home/homecarousel/homecarousel";
import HomeContact from "@/components/home/homecontact/homecontact";

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