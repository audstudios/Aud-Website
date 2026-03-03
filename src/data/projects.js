// src/data/projects.js
// Project data - paths are transformed to Cloudinary URLs via getMediaUrl()
// Import getMediaUrl in components that use this data

export const projects = {
  rizzlerHardees: {
    title: 'The Rizzwich: Hardees x The Rizzler',
    client: 'Hardees // Get Engaged Media',
    type: 'Commercial Production',
    year: '2025',
    // Store raw paths - transform with getMediaUrl() when rendering
    heroVideo: '/images/RizzlerHardees/RizzlerHardeesBase_1.mp4',
    fullVideo: '/images/RizzlerHardees/RizzlerHardeesBase_1.mp4',
    watchLink: '#',
    mainline: 'The production team behind your next viral moment.',
    content: [
      "Introducing The Rizzwich: the official Hardee's x The Rizzler meal. Get Engaged Media partnered with us to lead full-scale production for the launch of this <span class='font-bold'>now-viral collaboration.</span>",
      "Our role: <span class='font-bold'>end-to-end production</span> overseeing every detail, from casting local talent and securing crew to location management and on-set coordination. We mobilized a full local team and built a custom set under a tight timeline.",
      "The result: a viral campaign capturing over 4.5 million views and 150K engagements.",
    ],
    mainImages: [
      '/images/RizzlerHardees/RizzlerHardees_01.jpg',
      '/images/RizzlerHardees/RizzlerHardees_03.jpg',
      '/images/RizzlerHardees/RizzlerHardees_02.jpg',
    ],
    subImages: [],
    brandLogo: '/images/logos/CarouselLogo_png-19.png',
  },
  
  jeanPaulGaultier: {
    title: 'JEAN PAUL GAULTIER PRIDE EVENT',
    client: 'NORTH SIX // JEAN PAUL GAULTIER',
    type: 'Experiential and Event Content Production',
    year: '2025',
    heroVideo: '/images/JPG/JPGHeroFinal_Land.mp4',
    fullVideo: '/images/JPG/JPG_Audio.mp4',
    watchLink: '#',
    mainline: 'A cinematic approach to event coverage.',
    content: [
      "North Six tapped us to produce multiple <span class='font-bold'>high-end sizzle reels</span> capturing the atmosphere and curated details of their 2025 Jean Paul Gaultier Pride Event.",
      "Our role: Leveraging our <span class='font-bold'>expertise in luxury event coverage</span>, our lean, agile team handled shooting, editing, and delivering all assets with precision and perspective.",
      "The result: A <span class='font-bold'>rapid turnaround</span> ensured seamless stakeholder approval, and the final video achieved 50% higher reach than the average sizzle reel.",
    ],
    mainImages: [],
    subImages: [],
    brandLogo: '/images/logos/CarouselLogo_png-16.png',
  },
  
  cardidoordash: {
    title: 'CARDI B x DOORDASH',
    client: 'GET ENGAGED MEDIA // DOORDASH',
    type: 'Full-service video & film production',
    year: '2025',
    layout: 'vertical',
    heroVideos: [
      '/images/CardiBDoorDash/cardibvideo.mp4',
      '/images/CardiBDoorDash/cardixamayavideo.mp4'
    ],
    fullVideo: '/images/CardiBDoorDash/cardibvideo.mp4',
    watchLink: 'https://www.youtube.com/watch?v=iy1Bz_bHVac',
    mainline: 'A trusted extension of your in-house creative team, wherever the work takes you.',
    content: [
      "Get Engaged Media brought us on to <span class='font-bold'>produce all assets</span> for the Cardi B x DoorDash campaign tied to her new album.",
      "Our role: We served as their <span class='font-bold'>NYC-based production partner</span>, managing pre-production, on-site talent coordination, direction, and execution of campaign-ready assets.",
      "The result: Instant virality: <span class='font-bold'>23M views on Instagram</span> and notable coverage in <span class='font-bold'>USA Today</span> and <span class='font-bold'>Ad Age</span>.",
    ],
    mainImages: ['/images/CardiBDoorDash/CardiBDoorDashImages.jpg'],
    subImages: [],
    brandLogo: '/images/logos/CarouselLogo_png-15.png',
  },
  
  flav: {
    title: 'Flav',
    client: 'Flav',
    type: 'Campaign Development, Creative Direction, Production',
    year: '2025',
    heroVideo: '/images/flav/FlavEditWeb.mp4',
    fullVideo: '/images/flav/FlavEditWeb.mp4',
    watchLink: '#',
    mainline: 'With Flav expanding into NYC, they needed a team to craft a campaign that felt authentically New York.',
    content: [
      "We led creative direction and end-to-end production, ensuring every element reflected their market expansion goals.",
      "The result: a comprehensive suite of assets—including OTT, digital and social content, and OOH placements across dispensaries nationwide.",
    ],
    mainImages: [
      '/images/flav/Flav_03.jpg',
      '/images/flav/Flav_04.jpg',
    ],
    subImages: [],
    brandLogo: '/images/logos/Flav_Logo.png',
  },
};

// Client logos for carousel - raw paths
export const clientLogos = [
  { src: '/images/logos/CarouselLogo_png-09.png', alt: 'Tom Ford Beauty Logo' },
  { src: '/images/logos/CarouselLogo_png-10.png', alt: 'Estee Lauder Logo' },
  { src: '/images/logos/CarouselLogo_png-11.png', alt: 'David Yurman Logo' },
  { src: '/images/logos/CarouselLogo_png-12.png', alt: 'Don Julio Logo' },
  { src: '/images/logos/CarouselLogo_png-13.png', alt: 'Evian Logo' },
  { src: '/images/logos/CarouselLogo_png-14.png', alt: 'Johnnie Walker Logo' },
  { src: '/images/logos/CarouselLogo_png-15.png', alt: 'DoorDash logo' },
  { src: '/images/logos/CarouselLogo_png-16.png', alt: 'Jean Paul Gaultier logo' },
  { src: '/images/logos/CarouselLogo_png-17.png', alt: 'Aerie Logo' },
  { src: '/images/logos/CarouselLogo_png-18.png', alt: 'America Eagle Logo' },
  { src: '/images/logos/CarouselLogo_png-19.png', alt: "Hardee's logo" },
  { src: '/images/logos/CarouselLogo_png-20.png', alt: 'Paris Hilton Fragrances Logo' },
  { src: '/images/logos/CarouselLogo_png-21.png', alt: 'DKNY Logo' },
];

// Home slider data - raw paths
export const homeSliderData = [
  {
    title: "Hardee's",
    video: '/images/RizzlerHardees/RizzlerHardees.mp4',
    background: '/images/homeblur/rizzlerhomebg.jpg',
    className: 'slide-flippedfrog',
    link: '/work/projects/pages/rizzlerHardees',
  },
  {
    title: 'Jean Paul Gaultier',
    video: '/videos/Aud_Land_Video.mp4',
    background: '/images/homeblur/jpghomebg.jpg',
    className: 'slide-jeanpaul',
    link: '/work/projects/pages/jeanpaulgautier',
  },
  {
    title: 'Doordash',
    video: '/images/CardiBDoorDash/CardiBHomeSlider.mp4',
    background: '/images/homeblur/cardibhomebg.jpg',
    className: 'slide-frogeating',
    link: '/work/projects/pages/cardibdoordash',
  },
  {
    title: 'Flav',
    video: '/images/flav/FlavEditWeb.mp4',
    background: '/images/homeblur/FlavBG.jpg',
    className: 'slide-frogeating',
    link: '/work/projects/pages/flav',
  },
];

// About page images - raw paths
export const aboutImages = {
  main: '/images/about/AUD_About02.jpg',
  madeline: '/images/about/AUD_AboutMaddie01.jpg',
  syd: '/images/about/AUD_AboutSyd01.jpg',
  intro: [
    '/images/about/AUD_About02.jpg',
    '/images/about/AUD_About05.jpg',
    '/images/about/AUD_About06.jpg',
  ],
  gallery: [
    '/images/about/AUD_About03.jpg',
    '/images/about/AUD_About04.jpg',
    '/images/about/AUD_About07.jpg',
  ],
};

/**
 * Helper to transform a project's media URLs to Cloudinary
 * Use this in page components when loading from projects data
 */
export function transformProjectForCloudinary(project, getMediaUrl) {
  if (!project) return null;
  
  return {
    ...project,
    heroVideo: project.heroVideo ? getMediaUrl(project.heroVideo, 'heroVideo') : null,
    fullVideo: project.fullVideo ? getMediaUrl(project.fullVideo, 'heroVideo') : null,
    heroVideos: project.heroVideos 
      ? project.heroVideos.map(v => getMediaUrl(v, 'heroVideo')) 
      : null,
    mainImages: project.mainImages 
      ? project.mainImages.map(img => getMediaUrl(img, 'cardImage')) 
      : [],
    subImages: project.subImages 
      ? project.subImages.map(img => getMediaUrl(img, 'cardImage')) 
      : [],
    brandLogo: project.brandLogo ? getMediaUrl(project.brandLogo, 'logo') : null,
  };
}