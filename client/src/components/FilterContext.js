import { createContext, useEffect, useState } from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { useMediaQuery } from "react-responsive";

// Creates the state/state loading variables as well as runs several useEffects to prepare the data that will be needed throughout the application.

export const FilterContext = createContext(null);

export const FilterProvider = ({ children }) => {
  const isDesktopOrLaptop = useMediaQuery({
    query: "(min-width: 768px)",
  });

    // Arcade province and park code

    // if (Left($feature["URL_f"],3) == 'BAN'){
    //   return 'Banff';
    // } else if (Left($feature["URL_f"],3) == 'BNP'){
    //   return 'Banff';
    // } else if (Left($feature["URL_f"],3) == 'BPF'){
    //   return 'Bruce Peninsula';
    // } else if (Left($feature["URL_f"],3) == 'CBH'){
    //   return 'Cape Breton Highlands';
    // } else if (Left($feature["URL_f"],2) == 'EI'){
    //   return 'Elk Island';
    // } else if (Left($feature["URL_f"],3) == 'FBE'){
    //   return 'Fort Beauséjour - Fort Cumberland';
    // } else if (Left($feature["URL_f"],2) == 'FF'){
    //   return 'Fathom Five';
    // } else if (Left($feature["URL_f"],3) == 'FNP'){
    //   return 'Fundy';
    // } else if (Left($feature["URL_f"],3) == 'FOR'){
    //   return 'Forillon';
    // } else if (Left($feature["URL_f"],3) == 'FRH'){
    //   return 'Fort Rodd Hill';
    // } else if (Left($feature["URL_f"],3) == 'FTL'){
    //   return 'Fort Langley';
    // } else if (Left($feature["URL_f"],3) == 'GBI'){
    //   return 'Georgian Bay Islands';
    // } else if (Left($feature["URL_f"],5) == 'GINPR'){
    //   return 'Gulf Islands';
    // } else if (Left($feature["URL_f"],3) == 'GLA'){
    //   return 'Glacier';
    // } else if (Left($feature["URL_f"],3) == 'GMP'){
    //   return 'Gros Morne';
    // } else if (Left($feature["URL_f"],2) == 'GP'){
    //   return 'Grand Pré';
    // } else if (Left($feature["URL_f"],3) == 'GRA'){
    //   return 'Grasslands';
    // } else if (Left($feature["URL_f"],3) == 'JNP'){
    //   return 'Jasper';
    // } else if (Left($feature["URL_f"],3) == 'KLU'){
    //   return 'Kluane';
    // } else if (Left($feature["URL_f"],5) == 'KOONP'){
    //   return 'Banff, Kootenay & Yoho';
    // } else if (Left($feature["URL_f"],3) == 'KOU'){
    //   return 'Kouchibouguac';
    // } else if (Left($feature["URL_f"],3) == 'MAU'){
    //   return 'La Mauricie';
    // } else if (Left($feature["URL_f"],3) == 'MIN'){
    //   return 'Mingan Archipelago';
    // } else if (Left($feature["URL_f"],3) == 'MRG'){
    //   return 'Mount Revelstoke';
    // } else if (Left($feature["URL_f"],2) == 'PA'){
    //   return 'Prince Albert';
    // } else if (Left($feature["URL_f"],3) == 'PEI'){
    //   return 'Prince Edward Island';
    // } else if (Left($feature["URL_f"],3) == 'PRN'){
    //   return 'Pacific Rim';
    // } else if (Left($feature["URL_f"],3) == 'PUK'){
    //   return 'Pukaskwa';
    // } else if (Left($feature["URL_f"],3) == 'RIC'){
    //   return 'Rideau Canal';
    // } else if (Left($feature["URL_f"],3) == 'RMH'){
    //   return 'Rocky Mountain House';
    // } else if (Left($feature["URL_f"],4) == 'RMNP'){
    //   return 'Riding Mountain';
    // } else if (Left($feature["URL_f"],4) == 'SOCW'){
    //   return 'St-Ours Canal';
    // } else if (Left($feature["URL_f"],2) == 'TI'){
    //   return 'Thousand Islands';
    // } else if (Left($feature["URL_f"],3) == 'TNP'){
    //   return 'Terra Nova';
    // } else if (Left($feature["URL_f"],3) == 'TSW'){
    //   return 'Trent-Severn Waterway';
    // } else if (Left($feature["URL_f"],2) == 'WL'){
    //   return 'Waterton Lakes';
    // } else if (Left($feature["URL_f"],3) == 'YNP'){
    //   return 'Yoho';
    // } else {
    //   return 'Other';
    // }

    // if (Left($feature["URL_f"],3) == 'BAN'){
    //   return 'Alberta';
    // } else if (Left($feature["URL_f"],3) == 'BNP'){
    //   return 'Alberta';
    // } else if (Left($feature["URL_f"],3) == 'BPF'){
    //   return 'Ontario';
    // } else if (Left($feature["URL_f"],3) == 'CBH'){
    //   return 'Nova Scotia';
    // } else if (Left($feature["URL_f"],2) == 'EI'){
    //   return 'Alberta';
    // } else if (Left($feature["URL_f"],3) == 'FBE'){
    //   return 'New Brunswick';
    // } else if (Left($feature["URL_f"],2) == 'FF'){
    //   return 'Ontario';
    // } else if (Left($feature["URL_f"],3) == 'FNP'){
    //   return 'New Brunswick';
    // } else if (Left($feature["URL_f"],3) == 'FOR'){
    //   return 'Quebec';
    // } else if (Left($feature["URL_f"],3) == 'FRH'){
    //   return 'British Columbia';
    // } else if (Left($feature["URL_f"],3) == 'FTL'){
    //   return 'British Columbia';
    // } else if (Left($feature["URL_f"],3) == 'GBI'){
    //   return 'Ontario';
    // } else if (Left($feature["URL_f"],5) == 'GINPR'){
    //   return 'British Columbia';
    // } else if (Left($feature["URL_f"],3) == 'GLA'){
    //   return 'British Columbia';
    // } else if (Left($feature["URL_f"],3) == 'GMP'){
    //   return 'Newfoundland and Labrador';
    // } else if (Left($feature["URL_f"],2) == 'GP'){
    //   return 'Nova Scotia';
    // } else if (Left($feature["URL_f"],3) == 'GRA'){
    //   return 'Saskatchewan';
    // } else if (Left($feature["URL_f"],3) == 'JNP'){
    //   return 'Alberta';
    // } else if (Left($feature["URL_f"],3) == 'KLU'){
    //   return 'Yukon';
    // } else if (Left($feature["URL_f"],5) == 'KOONP'){
    //   return 'British Columbia';
    // } else if (Left($feature["URL_f"],3) == 'KOU'){
    //   return 'New Brunswick';
    // } else if (Left($feature["URL_f"],3) == 'MAU'){
    //   return 'Quebec';
    // } else if (Left($feature["URL_f"],3) == 'MIN'){
    //   return 'Quebec';
    // } else if (Left($feature["URL_f"],3) == 'MRG'){
    //   return 'British Columbia';
    // } else if (Left($feature["URL_f"],2) == 'PA'){
    //   return 'Saskatchewan';
    // } else if (Left($feature["URL_f"],3) == 'PEI'){
    //   return 'Prince Edward Island';
    // } else if (Left($feature["URL_f"],3) == 'PRN'){
    //   return 'British Columbia';
    // } else if (Left($feature["URL_f"],3) == 'PUK'){
    //   return 'Ontario';
    // } else if (Left($feature["URL_f"],3) == 'RIC'){
    //   return 'Ontario';
    // } else if (Left($feature["URL_f"],3) == 'RMH'){
    //   return 'Alberta';
    // } else if (Left($feature["URL_f"],4) == 'RMNP'){
    //   return 'Manitoba';
    // } else if (Left($feature["URL_f"],4) == 'SOCW'){
    //   return 'Quebec';
    // } else if (Left($feature["URL_f"],2) == 'TI'){
    //   return 'Ontario';
    // } else if (Left($feature["URL_f"],3) == 'TNP'){
    //   return 'Newfoundland and Labrador';
    // } else if (Left($feature["URL_f"],3) == 'TSW'){
    //   return 'Ontario';
    // } else if (Left($feature["URL_f"],2) == 'WL'){
    //   return 'Alberta';
    // } else if (Left($feature["URL_f"],3) == 'YNP'){
    //   return 'British Columbia';
    // } else {
    //   return 'Other';
    // }

  // Data on the provinces/territories as well as all parks and places

  const provincesData = [
    {
      name: "Alberta",
      coord: [-115.0, 55.0],
      zoom: isDesktopOrLaptop ? 5 : 4,
      abbr: "ab",
      place: [
        "Banff",
        "Banff, Kootenay & Yoho",
        "Elk Island",
        "Jasper",
        "Rocky Mountain House",
        "Waterton Lakes",
      ],
    },
    {
      name: "British Columbia",
      coord: [-125.647621, 54.726669],
      zoom: isDesktopOrLaptop ? 5 : 4,
      abbr: "bc",
      place: [
        "Fort Langley",
        "Fort Rodd Hill",
        "Glacier",
        "Gulf Islands",
        "Mount Revelstoke",
        "Pacific Rim",
        "Yoho",
      ],
    },
    {
      name: "Manitoba",
      coord: [-98.739075, 54.415211],
      zoom: isDesktopOrLaptop ? 5 : 4,
      abbr: "mb",
      place: ["Riding Mountain"],
    },
    {
      name: "New Brunswick",
      coord: [-66.159668, 46.49839],
      zoom: isDesktopOrLaptop ? 7 : 6,
      abbr: "nb",
      place: ["Fort Beauséjour - Fort Cumberland", "Fundy", "Kouchibouguac"],
    },
    {
      name: "Newfoundland and Labrador",
      coord: [-55.660435, 49.135509],
      zoom: isDesktopOrLaptop ? 6 : 5,
      abbr: "nl",
      place: ["Gros Morne", "Terra Nova"],
    },
    {
      name: "Northwest Territories",
      coord: [-124.8457, 64.8255],
      zoom: isDesktopOrLaptop ? 4 : 3,
      abbr: "nt",
      place: [],
    },
    {
      name: "Nova Scotia",
      coord: [-63.0, 45.3],
      zoom: isDesktopOrLaptop ? 7 : 6,
      abbr: "ns",
      place: ["Cape Breton Highlands", "Grand Pré", "Kejimkujik"],
    },
    {
      name: "Nunavut",
      coord: [-86.798981, 70.453262],
      zoom: isDesktopOrLaptop ? 3 : 2,
      abbr: "nu",
      place: [],
    },
    {
      name: "Ontario",
      coord: [-85.0, 48.0],
      zoom: isDesktopOrLaptop ? 5 : 4,
      abbr: "on",
      place: [
        "Bruce Peninsula",
        "Fathom Five",
        "Georgian Bay Islands",
        "Point Pelee",
        "Pukaskwa",
        "Rideau Canal",
        "Thousand Islands",
        "Trent-Severn Waterway",
      ],
    },
    {
      name: "Prince Edward Island",
      coord: [-63.0, 46.25],
      zoom: isDesktopOrLaptop ? 8 : 7,
      abbr: "pe",
      place: ["Prince Edward Island"],
    },
    {
      name: "Quebec",
      coord: [-70.0, 51.0],
      zoom: isDesktopOrLaptop ? 5 : 4,
      abbr: "qc",
      place: ["Forillon", "La Mauricie", "Mingan Archipelago", "St-Ours Canal"],
    },
    {
      name: "Saskatchewan",
      coord: [-106.0, 55.0],
      zoom: isDesktopOrLaptop ? 5 : 4,
      abbr: "sk",
      place: ["Grasslands", "Prince Albert"],
    },
    {
      name: "Yukon",
      coord: [-135.0, 65.0],
      zoom: isDesktopOrLaptop ? 4 : 3,
      abbr: "yt",
      place: ["Kluane"],
    },
  ];

  // All images and place descriptions taken from the Parks Canada website - https://www.pc.gc.ca/en/voyage-travel/recherche-tous-parks-all

  const placeDescriptionsData = [
    {
      name: "Banff",
      description:
        "Founded in 1885, Banff is Canada’s first national park and part of the first national park system in the world. With its soaring peaks, azure lakes and abundant wildlife, this Rocky Mountain park attracts millions of visitors every year.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/ab/banff/WET4/modules/np-banff-180x90.jpg?modified=20170529161247",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/ab/banff",
    },
    {
      name: "Banff, Kootenay & Yoho",
      description:
        "With diverse terrain embracing everything from arid grasslands to glaciers, Kootenay National Park offers the full Rocky Mountain experience along the historic Banff-Windermere Highway. Take a scenic drive or stay and explore the park’s treasures.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/bc/kootenay/WET4/modules/np-kootenay-180x90.jpg?modified=20170201183930",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/bc/kootenay",
    },
    {
      name: "Elk Island",
      description:
        "Experience first-hand the story of the bison and how it was saved from near extinction at Elk Island National Park, where an active conservation program replenishes herds around the world.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/ab/elkisland/WET4/modules/np-elkisland-190x90.jpg?modified=20170106165929",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/ab/elkisland",
    },
    {
      name: "Jasper",
      description:
        "Jasper astonishes visitors with its vast wilderness, dotted with glaciers, lakes, waterfalls, rivers, mountains and deep-cut canyons. Hike, paddle, swim, ski, fish, and take in soothing hot springs, scenic drives and extraordinary wildlife.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/ab/jasper/WET4/modules/np-jasper-180x90.jpg?modified=20170106165521",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/ab/jasper",
    },
    {
      name: "Rocky Mountain House",
      description:
        "Two centuries ago trappers, traders and the First Nation Peoples shared the rugged western frontier of Canada. At Rocky Mountain House National Historic Site - be a part of the story. Explore, hike, camp and discover their challenges and triumphs.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/lhn-nhs/ab/rockymountain/WET4/modules/nhs-rockymountain-180x90.jpg?modified=20170106195921",
      parksCanLink: "https://www.pc.gc.ca/en/lhn-nhs/ab/rockymountain",
    },
    {
      name: "Waterton Lakes",
      description:
        "The prairies of Alberta meet the peaks of the Rocky Mountains in Waterton Lakes National Park.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/ab/waterton/WET4/modules/waterton-180.jpg?modified=20211104162658",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/ab/waterton",
    },
    {
      name: "Fort Langley",
      description:
        "Experience life as a 19th century voyageur at Fort Langley, where the colony of British Columbia was born. Mingle with fur traders, pan for gold, learn the blacksmith’s art and camp in an HBC-themed oTENTik.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/GatherContent/Banff-Park-Museum/Image/FortLangley-site,-d-,jpg.jpg?modified=20161208230544",
      parksCanLink: "https://www.pc.gc.ca/en/lhn-nhs/bc/langley",
    },
    {
      name: "Fort Rodd Hill",
      description:
        "Tour through secret bunkers, military command posts and original 19th century buildings at Fort Rodd Hill, a west coast artillery fortress on active duty from 1895 to 1956. Be touched by the personal stories of soldiers and their families. Camp overnight in a group-friendly oTENTik.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/GatherContent/Banff-Park-Museum/Image/FortRoddHill-site,-d-,jpg.jpg?modified=20161208230542",
      parksCanLink: "https://www.pc.gc.ca/en/lhn-nhs/bc/fortroddhill",
    },
    {
      name: "Glacier",
      description:
        "Glacier is known for steep alpine hikes, lush cedar forests and unparalleled backcountry skiing. At the heart of the park, history comes alive at Rogers Pass, the key to completion of Canada’s transcontinental railway.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/bc/glacier/WET4/modules/np-glacier-180x90.jpg?modified=20170106170227",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/bc/glacier",
    },
    {
      name: "Gulf Islands",
      description:
        "Scattered throughout the Salish Sea, the Gulf Islands teem with wildlife, a haven for rare species and threatened eco-systems and a playground for hikers, campers, cyclists, boaters and kayakers.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/GatherContent/Banff-Park-Museum/Image/GulfIslands-site,-d-,jpg.jpg?modified=20161208230515",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/bc/gulf",
    },
    {
      name: "Mount Revelstoke",
      description:
        "Stroll through brilliant wildflower meadows, or lie back in awe atop a mountain peak. From lush green valley to mountain summit, all is within a leisurely day’s drive at Mount Revelstoke National Park.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/bc/revelstoke/WET4/modules/np-revelstoke-180x90.jpg?modified=20170106170349",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/bc/revelstoke",
    },
    {
      name: "Pacific Rim",
      description:
        "Catch a wave, or spread a blanket and watch the sun dip below the horizon. From rainforests on land to marine kelp forests at sea, Pacific Rim National Park Reserve embodies the rich natural and cultural heritage of Canada’s west coast.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/bc/pacificrim/WET4/modules/np-pacificrim-180x90.jpg?modified=20170106171433",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/bc/pacificrim",
    },
    {
      name: "Yoho",
      description:
        "In the shadow of the Great Divide, Yoho’s towering rockwalls, spectacular waterfalls and soaring peaks reveal the secrets of ancient life, the power of ice and water and the stories of plants and animals that continue to evolve today.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/bc/yoho/WET4/modules/np-yoho-180x90.jpg?modified=20170221181359",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/bc/yoho",
    },
    {
      name: "Riding Mountain",
      description:
        "Explore 3000 km2 of thrilling outdoor possibilities in Riding Mountain National Park where the boreal forest, aspen parkland and fescue prairie meet.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/mb/riding/WET4/modules/np-ridingmountain-180x90.jpg?modified=20170106173040",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/mb/riding",
    },
    {
      name: "Fort Beauséjour - Fort Cumberland",
      description:
        "Discover a time when Britain and France were caught in a tug-of-war for dominance in Acadie, and be moved by the stories of soldiers and settlers who lived and died around the historic star-shaped fort.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/lhn-nhs/nb/beausejour/WET4/images/nhs-fortbeausejour-cumberland-180x90.jpg?modified=20200127182743",
      parksCanLink: "https://www.pc.gc.ca/en/lhn-nhs/nb/beausejour",
    },
    {
      name: "Fundy",
      description:
        "The world’s highest tides await visitors at Fundy National Park. Kayak on the Bay of Fundy, explore the seafloor when the tide recedes, hike or bike through native Acadian forests and more at one of Canada’s best-known national parks.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/nb/fundy/WET4/images/plage-beach-fundy.jpg?modified=20200211154329",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/nb/fundy",
    },
    {
      name: "Kouchibouguac",
      description:
        "Golden sand dunes, estuaries brimming with life, warm ocean beaches, Mi’kmaq and Acadian culture, the starry spectacle of a Dark Sky Preserve and snowbound winter activities weave together the compelling tapestry of Kouchibouguac National Park.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/nb/kouchibouguac/WET4/images-510x275/np-kouchibouguac-510.jpg?modified=20200221200024",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/nb/kouchibouguac",
    },
    {
      name: "Gros Morne",
      description:
        "Cruise sheer-walled fjords and hike diverse landscapes from windswept shorelines to sub-Arctic summits. Explore rare geological oddities that earned Gros Morne UNESCO World Heritage status, and relax amid the culture of Newfoundland’s coastal communities.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/nl/grosmorne/activ/GM-2011_07_19-7125--S-Stone-180x90px.jpg?modified=20150629120214",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/nl/grosmorne",
    },
    {
      name: "Terra Nova",
      description:
        "A dramatic Atlantic shoreline, fringed in long headlands and fjords with views of whales and icebergs, gives way to marshland, tranquil ponds and wildlife-filled boreal forest – Terra Nova is accessible, wild Newfoundland for outdoor enthusiasts and nature-lovers of every age.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/nl/terranova/WET4/modules/np-terra-nova-180x90.jpg?modified=20170106173604",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/nl/terranova",
    },
    {
      name: "Cape Breton Highlands",
      description:
        "A third of the world-famous Cabot Trail winds through Cape Breton Highlands National Park, renowned for stunning ocean vistas, deep-cut canyons, 26 diverse hiking trails, spectacular campsites and glorious sandy beaches.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/ns/cbreton/WET4/modules/CBH1.jpg?modified=20190531173346",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/ns/cbreton",
    },
    {
      name: "Grand Pré",
      description:
        "Discover powerful Acadian stories within a picturesque landscape. Successes and struggles are illuminated through multimedia presentation and engaging displays, a splendid Victorian garden and a Memorial Church. This is Grand-Pré National Historic Site, monument to Acadian culture and deportation.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/lhn-nhs/ns/grandpre/WET4/images/nhs-grand-pre-180x90.jpg?modified=20200120173432",
      parksCanLink: "https://www.pc.gc.ca/en/lhn-nhs/ns/grandpre",
    },
    {
      name: "Kejimkujik",
      description:
        "Explore 4,000 years of Mi’kmaw heritage. Camp lakeside amidst Acadian forest. Spot harbour seals from a singing beach. Be enthralled by a Dark Sky Preserve. There are many sides to Kejimkujik and you can discover them all.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/ns/kejimkujik/WET4/modules/SNB-Keji.jpg?modified=20170411171510",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/ns/kejimkujik",
    },
    {
      name: "Bruce Peninsula",
      description:
        "Bruce Peninsula National Park beckons hikers to travel woodland trails, swimmers to refresh in clear waters, explorers to discover the rugged limestone coast and campers to revel at a stunning night sky.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/GatherContent/Banff-Park-Museum/Image/bruce,-d-,jpg.jpg?modified=20161208230452",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/on/bruce",
    },
    {
      name: "Fathom Five",
      description:
        "Fascinating limestone flowerpots, pristine freshwater, lush cliff-edge woodland, serene backcountry campsites, historic lightstations and exciting scuba-sites make Fathom Five National Marine Park an awe-inspiring Great Lake escape.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/GatherContent/Banff-Park-Museum/Image/fathom,-d-,jpg.jpg?modified=20161208230429",
      parksCanLink: "https://www.pc.gc.ca/en/amnc-nmca/on/fathomfive",
    },
    {
      name: "Georgian Bay Islands",
      description:
        "Swim in Lake Huron’s clear waters. Cycle wooded island trails. Hike paths that meander between ecosystems. Unwind at a cosy cabin. Welcome to an inspiring and beautiful place. Welcome to Georgian Bay Islands National Park.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/on/georg/WET4/modules/np-georg-180x90.jpg?modified=20170106171822",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/on/georg",
    },
    {
      name: "Point Pelee",
      description:
        "Canada’s second smallest but most diverse national park, Point Pelee’s forest hosts diverse habitats that provide a sanctuary for plants and animals rarely found elsewhere in the country and the nature lovers who enjoy it.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/GatherContent/Banff-Park-Museum/Image/PointPelee-180x90,-d-,jpg.jpg?modified=20161208230509",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/on/pelee",
    },
    {
      name: "Pukaskwa",
      description:
        "This is Ontario’s only wilderness national park, defined by pink-and-slate granite shores, Great Lake temperaments and near-endless stretches of spruce, fir, pine and hardwoods. Biodiverse coastal regions—where wetland, lake and forest meet—are home to iconic Canadian species like bald eagles...",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/on/pukaskwa/WET4/fttd_180_90/PUK_FTTD_BCPBCPH_180_90.jpg?modified=20200401184549",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/on/pukaskwa",
    },
    {
      name: "Rideau Canal",
      description:
        "An historic 19th century military waterway linking rivers and lakes across Eastern Ontario’s countryside, the Rideau Canal is now a popular natural playground, perfect for boating, paddling, fishing, camping, hiking and cycling the canal’s wooded pathways.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/lhn-nhs/on/rideau/WET4/modules/on-rideau-180x90.jpg?modified=20170118190842",
      parksCanLink: "https://www.pc.gc.ca/en/lhn-nhs/on/rideau",
    },
    {
      name: "Thousand Islands",
      description:
        "Granite islands speckle the St. Lawrence River in a transition zone between Canadian Shield and Adirondack Mountains. Explore by boating, paddling, or hiking. Awesome Thousand Islands National Park awaits, a few hours from Toronto or Montreal.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/on/1000/WET4/modules/on-1000-180x90.jpg?modified=20170118172038",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/on/1000",
    },
    {
      name: "Trent-Severn Waterway",
      description:
        "Discover a newfound fascination with engineering along the Trent-Severn Waterway. This navigational wonder adds up to 44 locks, 104 operable dams and six heritage lockstations along a 386-km scenic string of canals and waterways.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/GatherContent/Banff-Park-Museum/Image/trent,-d-,jpg.jpg?modified=20161208230438",
      parksCanLink: "https://www.pc.gc.ca/en/lhn-nhs/on/trentsevern",
    },
    {
      name: "Prince Edward Island",
      description:
        "Cliff and dune-lined beaches, woodlands and wetlands rich with wildlife, and all levels of outdoor activities make Prince Edward Island National Park a diverse and accessible natural destination for a seaside escape, restful or active.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/GatherContent/Banff-Park-Museum/Image/sandcastles,-d-,jpg.jpg?modified=20161208230448",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/pe/pei-ipe",
    },
    {
      name: "Forillon",
      description:
        "Forillon is a place where you can paddle with seals, watch passing whales and swim off a magnificent sandy beach all on the same day. You may even see a beaver on a walk through the forest.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/qc/forillon/WET4/modules/np-forillon-2-proximite-nearby.jpg?modified=20201104220731",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/qc/forillon",
    },
    {
      name: "La Mauricie",
      description:
        "With its 536 km2 area, La Mauricie National Park is the ideal place for an outdoor escape. Hills, forests and streams are accessible any season of the year.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/qc/mauricie/WET4/modules/np-mauricie-180x90.jpg?modified=20170210154218",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/qc/mauricie",
    },
    {
      name: "Mingan Archipelago",
      description:
        "The first word that springs to mind at the mention of the Mingan Archipelago is “remote”. Far from the hustle and bustle of everyday life, Mother Nature enchants with limestone sculptures, prolific marine and bird life, and the seductive sound of the sea.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/qc/mingan/WET4/modules/np-mingan-180x90.jpg?modified=20170106184111",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/qc/mingan",
    },
    {
      name: "St-Ours Canal",
      description:
        "Stroll through Darvard Island and enjoy recognizing many species of trees and birds. Have a family picnic while watching the lockage of pleasure craft. Children will be fascinated by the fish ladder, a structure unlike anything else in the world.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/lhn-nhs/qc/saintours/WET4/modules/nhs-saintours-180x90.jpg?modified=20170106215509",
      parksCanLink: "https://www.pc.gc.ca/en/lhn-nhs/qc/saintours",
    },
    {
      name: "Grasslands",
      description:
        "At Grasslands National Park, expanses of dinosaur fossils harken back to a time before history. Tipi rings are testament to First Nations communities, and ruins of prairie homesteads tell of settlers intent on taming the prairie.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/sk/grasslands/WET4/modules/np-grasslands-180x90.jpg?modified=20170106184228",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/sk/grasslands",
    },
    {
      name: "Prince Albert",
      description:
        "Prince Albert National Park offers accessible wilderness and extensive outdoor recreation in central Saskatchewan. Hike boreal forests, canoe pristine lakes and see free-range bison, with the town of Waskesiu as a convenient base.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/sk/princealbert/WET4/modules/np-albert-180x90.jpg?modified=20170106184258",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/sk/princealbert",
    },
    {
      name: "Kluane",
      description:
        "With vast icefields and 17 of Canada’s 20 highest peaks, Kluane offers outstanding alpine scenery, rich First Nations culture and history, and a mix of extreme adventure and accessible outdoor recreation.",
      imgSrc:
        "https://pcweb.azureedge.net/-/media/pn-np/yt/kluane/WET4/modules/np-kluane-180x90.jpg?modified=20170106184659",
      parksCanLink: "https://www.pc.gc.ca/en/pn-np/yt/kluane",
    },
  ];

  const { user, isAuthenticated } = useAuth0();

  const [filterProvince, setFilterProvince] = useState("");
  const [filterPark, setFilterPark] = useState("");
  const [provinces, setProvinces] = useState([]);
  const [provincesLoading, setProvincesLoading] = useState("loading");
  const [favourites, setFavourites] = useState([]);
  const [favouritesLoading, setFavouritesLoading] = useState("loading");
  const [newFav, setNewFav] = useState(false);
  const [deletedFavStatus, setDeletedFavStatus] = useState({});
  const [parkDescriptions, setParkDescriptions] = useState([]);
  const [parkDescriptionsLoading, setParkDescriptionsLoading] =
    useState("loading");
  const [allReviews, setAllReviews] = useState([]);
  const [allReviewsLoading, setAllReviewsLoading] = useState("loading");
  const [postAdded, setPostAdded] = useState(false);
  const [campgrounds, setCampgrounds] = useState({ name: null, array: null });

  useEffect(() => {
    setProvinces(provincesData);
    setProvincesLoading("idle");
    setParkDescriptions(placeDescriptionsData);
    setParkDescriptionsLoading("idle");
    // fetch("https://loon-backend.onrender.com/api/provinces")
    //   .then((res) => res.json())
    //   .then((data) => {
    //     setProvinces(data);
    //     setProvincesLoading("idle");
    //   });
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      fetch("https://loon-backend.onrender.com/api/add-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user: user,
        }),
      })
        .then((res) => res.json())
        .then((data) => {});
    }
  }, [isAuthenticated]);

  useEffect(() => {
    if (isAuthenticated) {
      fetch(`https://loon-backend.onrender.com/api/get-favourites/${user.sub}`)
        .then((res) => res.json())
        .then((data) => {
          setFavourites(data.data);
          setFavouritesLoading("idle");
        });
    }
  }, [isAuthenticated, newFav, deletedFavStatus]);

  // useEffect(() => {
  //   fetch("https://loon-backend.onrender.com/api/park-descriptions")
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setParkDescriptions(data.data);
  //       setParkDescriptionsLoading("idle");
  //   //   });
  // }, []);

  useEffect(() => {
    fetch("https://loon-backend.onrender.com/api/all-reviews")
      .then((res) => res.json())
      .then((data) => {
        setAllReviews(data.data);
        setAllReviewsLoading("idle");
      });
  }, []);

  return (
    <FilterContext.Provider
      value={{
        filterProvince,
        setFilterProvince,
        filterPark,
        setFilterPark,
        provinces,
        setProvinces,
        provincesLoading,
        setProvincesLoading,
        allReviews,
        allReviewsLoading,
        postAdded,
        setPostAdded,
        parkDescriptions,
        parkDescriptionsLoading,
        favourites,
        favouritesLoading,
        newFav,
        setNewFav,
        deletedFavStatus,
        setDeletedFavStatus,
        campgrounds,
        setCampgrounds,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
};
