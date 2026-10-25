import React, { useState, useRef, useEffect } from 'react';
import { Search, Camera, ChevronRight, ArrowLeft, ExternalLink, Upload, Plus, Check, Box, Layers, ShoppingCart, X, Filter, Barcode, FileText, Database, Image as ImageIcon } from 'lucide-react';
import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://hpyeywagxzqlgjdcrjta.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhweWV5d2FneHpxbGdqZGNyanRhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTI4NjU0NTAsImV4cCI6MjEwODQ0MTQ1MH0.bQsc3VQ-gPeWgvREXB-PcEyMsaTn7f6lBbG76w4iw2c';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

const getAssetImg = (filename) => {
  try {
    return new URL(`./assets/categories/${filename}`, import.meta.url).href;
  } catch (e) {
    return 'https://img.bricklink.com/ItemImage/MN/0/sw0001.png';
  }
};

const MASTER_THEMES_BASE = [
  { id: 'star-wars', name: 'Star Wars', prefix: 'sw', image: getAssetImg('Star Wars.jfif') },
  { id: 'marvel', name: 'Marvel Super Heroes', prefix: 'sh', image: getAssetImg('Marvel.jfif') },
  { id: 'harry-potter', name: 'Harry Potter', prefix: 'hp', image: getAssetImg('Harry Potter.jfif') },
  { id: 'ninjago', name: 'Ninjago', prefix: 'nj', image: getAssetImg('Ninjago.jfif') },
  { id: 'dc', name: 'DC Super Heroes', prefix: ['bat', 'dc'], image: getAssetImg('DC.jfif') },
  { id: 'city', name: 'City', prefix: 'cty', image: getAssetImg('City.jfif') },
  { id: 'lord-of-the-rings', name: 'Lord of the Rings', prefix: 'lor', image: getAssetImg('Lord of the Rings.jfif') },
  { id: 'jurassic-world', name: 'Jurassic World', prefix: 'jw', image: getAssetImg('Jurassic World.jfif') },
  { id: 'minecraft', name: 'Minecraft', prefix: 'min', image: getAssetImg('Minecraft.jfif') },
  { id: 'speed-champions', name: 'Speed Champions', prefix: 'sc', image: getAssetImg('Speed Champions.jfif') },
  { id: 'indiana-jones', name: 'Indiana Jones', prefix: 'iaj', image: getAssetImg('Indiana Jones.jfif') },
  { id: 'pirates-of-the-caribbean', name: 'Pirates of the Caribbean', prefix: 'poc', image: getAssetImg('Pirates of the Caribbean.jfif') },
  { id: 'animal-crossing', name: 'Animal Crossing', prefix: 'ani', image: getAssetImg('Animal Crossing.jfif') },
  { id: 'avatar-atla', name: 'Avatar: The Last Airbender', prefix: 'ava', image: getAssetImg('Avatar the Last Airbender.jfif') },
  { id: 'avatar', name: 'Avatar', prefix: 'avt', image: getAssetImg('Avatar.jfif') },
  { id: 'castle', name: 'Castle', prefix: 'cas', image: getAssetImg('Castle.jfif') },
  { id: 'chima', name: 'Legends of Chima', prefix: 'loc', image: getAssetImg('Chima.jfif') },
  { id: 'dimensions', name: 'LEGO Dimensions', prefix: 'dim', image: getAssetImg('Dimensions.jfif') },
  { id: 'disney', name: 'Disney', prefix: 'dis', image: getAssetImg('Disney.jfif') },
  { id: 'dreamzzz', name: 'DREAMzzZ', prefix: 'drm', image: getAssetImg('Dreamzzz.jfif') },
  { id: 'ghostbusters', name: 'Ghostbusters', prefix: 'gb', image: getAssetImg('Ghostbusters.jfif') },
  { id: 'hidden-side', name: 'Hidden Side', prefix: 'hs', image: getAssetImg('Hidden Side.jfif') },
  { id: 'ideas', name: 'Ideas and Icons', prefix: 'idea', image: getAssetImg('Ideas and Icons.jfif') },
  { id: 'kpop', name: 'Kpop Demon Hunters', prefix: 'kpo', image: getAssetImg('Kpop Demon Hunters.jfif') },
  { id: 'mario', name: 'Super Mario', prefix: 'mar', image: getAssetImg('Mario.jfif') },
  { id: 'minions', name: 'Minions', prefix: 'mnn', image: getAssetImg('Minions.jfif') },
  { id: 'monkie-kid', name: 'Monkie Kid', prefix: 'mk', image: getAssetImg('Monkie Kid.jfif') },
  { id: 'monster-fighters', name: 'Monster Fighters', prefix: 'mof', image: getAssetImg('Monster Hunters.jfif') },
  { id: 'nexo-knights', name: 'Nexo Knights', prefix: 'nex', image: getAssetImg('Nexo Knights.jfif') },
  { id: 'one-piece', name: 'One Piece', prefix: 'op', image: getAssetImg('One Piece.jfif') },
  { id: 'overwatch', name: 'Overwatch', prefix: 'ow', image: getAssetImg('Overwatch.jfif') },
  { id: 'pirate', name: 'Pirates', prefix: 'pi', image: getAssetImg('Pirate.jfif') },
  { id: 'pokemon', name: 'Pokemon', prefix: 'pok', image: getAssetImg('Pokemon.jfif') },
  { id: 'scooby-doo', name: 'Scooby-Doo', prefix: 'scd', image: getAssetImg('Scooby-Doo.jfif') },
  { id: 'sonic', name: 'Sonic the Hedgehog', prefix: 'son', image: getAssetImg('Sonic.jfif') },
  { id: 'space', name: 'Space', prefix: 'sp', image: getAssetImg('Space.jfif') },
  { id: 'spongebob', name: 'SpongeBob SquarePants', prefix: 'bob', image: getAssetImg('Spongebob Squarepants.jfif') },
  { id: 'stranger-things', name: 'Stranger Things', prefix: 'st', image: getAssetImg('Stranger Things.jfif') },
  { id: 'tmnt', name: 'Teenage Mutant Ninja Turtles', prefix: 'tnt', image: getAssetImg('Teenage Mutant Ninja Turtles.jfif') },
  { id: 'lego-movie', name: 'The LEGO Movie', prefix: 'tlm', image: getAssetImg('The LEGO Movie.jfif') },
  { id: 'town', name: 'Town', prefix: ['twn', 'town'], image: getAssetImg('Town.jfif') },
  { id: 'wednesday', name: 'Wednesday', prefix: 'wed', image: getAssetImg('Wednesday.jfif') },
  { id: 'wicked', name: 'Wicked', prefix: 'wck', image: getAssetImg('Wicked.jfif') },
  { id: 'zelda', name: 'The Legend of Zelda', prefix: 'loz', image: getAssetImg('Zelda.jfif') },
  { id: 'dragon-ball', name: 'Dragon Ball', prefix: 'drb', image: getAssetImg('Misc.jfif') },
  { id: 'misc', name: 'Miscellaneous', prefix: 'misc', image: getAssetImg('Misc.jfif') }
];

const CMF_SERIES_BASE = [
  { id: 'cmf-1', name: 'Series 1 (8683)', image: getAssetImg('Series-1.jpeg') },
  { id: 'cmf-2', name: 'Series 2 (8684)', image: getAssetImg('Series-2.webp') },
  { id: 'cmf-3', name: 'Series 3 (8803)', image: getAssetImg('Series-3.webp') },
  { id: 'cmf-4', name: 'Series 4 (8804)', image: getAssetImg('Series-4.webp') },
  { id: 'cmf-5', name: 'Series 5 (8805)', image: getAssetImg('Series-5.webp') },
  { id: 'cmf-6', name: 'Series 6 (8827)', image: getAssetImg('Series-6.webp') },
  { id: 'cmf-7', name: 'Series 7 (8831)', image: getAssetImg('Series-7.webp') },
  { id: 'cmf-8', name: 'Series 8 (8833)', image: getAssetImg('Series-8.webp') },
  { id: 'cmf-9', name: 'Series 9 (71000)', image: getAssetImg('Series-9.jpg') },
  { id: 'cmf-10', name: 'Series 10 (71001)', image: getAssetImg('Series-10.jpg') },
  { id: 'cmf-11', name: 'Series 11 (71002)', image: getAssetImg('Series-11.webp') },
  { id: 'cmf-12', name: 'Team GB (8909)', image: getAssetImg('Team GB Olympic Series.webp') },
  { id: 'cmf-13', name: 'The Simpsons S1 (71005)', image: getAssetImg('The Simpsons Series 1.webp') },
  { id: 'cmf-14', name: 'Series 12 (71007)', image: getAssetImg('Series-12.webp') },
  { id: 'cmf-15', name: 'Series 13 (71008)', image: getAssetImg('Series-13.webp') },
  { id: 'cmf-16', name: 'The Simpsons S2 (71009)', image: getAssetImg('The Simpsons Series 2.webp') },
  { id: 'cmf-17', name: 'Series 14 Monsters (71010)', image: getAssetImg('Series-14.webp') },
  { id: 'cmf-18', name: 'Series 15 (71011)', image: getAssetImg('Series-15.webp') },
  { id: 'cmf-19', name: 'Disney Series 1 (71012)', image: getAssetImg('Disney Series 1.webp') },
  { id: 'cmf-20', name: 'Series 16 (71013)', image: getAssetImg('Series-16.webp') },
  { id: 'cmf-21', name: 'German Football (71014)', image: getAssetImg('DFB German Football Team.webp') },
  { id: 'cmf-22', name: 'Series 17 (71018)', image: getAssetImg('Series-17.webp') },
  { id: 'cmf-23', name: 'The LEGO Batman Movie S1 (71017)', image: getAssetImg('The Lego Batman Movie Series 1.webp') },
  { id: 'cmf-23b', name: 'The LEGO Batman Movie S2', image: getAssetImg('The Lego Batman Movie Series 1.webp') },
  { id: 'cmf-23c', name: 'The LEGO Ninjago Movie', image: getAssetImg('Ninjago.jfif') },
  { id: 'cmf-24', name: 'Series 18 Party (71021)', image: getAssetImg('Series-18.webp') },
  { id: 'cmf-25', name: 'Harry Potter S1 (71022)', image: getAssetImg('Harry Potter Series 1.webp') },
  { id: 'cmf-26', name: 'Series 19 (71025)', image: getAssetImg('Series-19.webp') },
  { id: 'cmf-27', name: 'The LEGO Movie 2 (71023)', image: getAssetImg('The LEGO Movie 2.webp') },
  { id: 'cmf-28', name: 'Disney Series 2 (71024)', image: getAssetImg('Disney Series 2.webp') },
  { id: 'cmf-29', name: 'Series 20 (71027)', image: getAssetImg('Series-20.webp') },
  { id: 'cmf-30', name: 'Harry Potter S2 (71028)', image: getAssetImg('Harry Potter Series 2.webp') },
  { id: 'cmf-31', name: 'DC Super Heroes (71026)', image: getAssetImg('DC Super Heroes.webp') },
  { id: 'cmf-32', name: 'Series 21 (71029)', image: getAssetImg('Series-21.webp') },
  { id: 'cmf-33', name: 'Looney Tunes (71030)', image: getAssetImg('Looney Tunes.webp') },
  { id: 'cmf-34', name: 'Marvel Series 1 (71031)', image: getAssetImg('Marvel Series 1.jpg') },
  { id: 'cmf-35', name: 'Vidiyo Series 1 (43101)', image: 'https://img.bricklink.com/ItemImage/MN/0/colvid1.png' },
  { id: 'cmf-36', name: 'Series 22 (71032)', image: getAssetImg('Series-22.webp') },
  { id: 'cmf-37', name: 'The Muppets (71033)', image: getAssetImg('The Muppets.webp') },
  { id: 'cmf-38', name: 'Series 23 (71034)', image: getAssetImg('Series-23.jpg') },
  { id: 'cmf-39', name: 'Vidiyo Series 2 (43108)', image: 'https://img.bricklink.com/ItemImage/MN/0/colvid2.png' },
  { id: 'cmf-40', name: 'Series 24 (71037)', image: getAssetImg('Series-24.webp') },
  { id: 'cmf-41', name: 'Disney 100 (71038)', image: getAssetImg('Disney 100.jpg') },
  { id: 'cmf-42', name: 'Marvel Series 2 (71039)', image: getAssetImg('Marvel Series 2.webp') },
  { id: 'cmf-43', name: 'Series 25 (71045)', image: getAssetImg('Series-25.webp') },
  { id: 'cmf-44', name: 'Series 26 Space (71046)', image: getAssetImg('Series-26.webp') },
  { id: 'cmf-45', name: 'Dungeons & Dragons (71047)', image: getAssetImg('Dungeons & Dragons.webp') },
  { id: 'cmf-46', name: 'Series 27', image: getAssetImg('Series-27.webp') },
  { id: 'cmf-47', name: 'Series 28', image: getAssetImg('Series-28.png') },
  { id: 'cmf-48', name: 'Series 29', image: getAssetImg('Series-29.webp') },
  { id: 'cmf-49', name: 'Spider-Man: Across the Spider-Verse', image: getAssetImg('Spider-Man Across the Spider-Verse.webp') },
  { id: 'cmf-50', name: 'Shrek', image: getAssetImg('Shrek.webp') },
  { id: 'cmf-51', name: 'Unikitty!', image: getAssetImg('Unikitty.webp') },
  { id: 'cmf-52', name: 'The LEGO Movie Series 1', image: getAssetImg('The LEGO Movie.jfif') }
];

export default function App() {
  const [activeModal, setActiveModal] = useState(null);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedMinifig, setSelectedMinifig] = useState(null);
  const [selectedSet, setSelectedSet] = useState(null);
  const [addModalOpen, setAddModalOpen] = useState(false);
  const [importModalOpen, setImportModalOpen] = useState(false);
  const [scannerOpen, setScannerOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  
  const [categorySearchQuery, setCategorySearchQuery] = useState('');
  const [filterTab, setFilterTab] = useState('all');

  const [minifigs, setMinifigs] = useState([]);
  const [setsDB, setSetsDB] = useState([]);
  const [customImages, setCustomImages] = useState({});
  const [customValues, setCustomValues] = useState({});
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [valueInput, setValueInput] = useState('');

  const videoRef = useRef(null);

  // Load cloud sync data from Supabase on mount
  useEffect(() => {
    async function fetchCloudData() {
      const { data, error } = await supabase.from('user_collection').select('*');
      if (data && !error) {
        const ownedMap = {};
        const imgMap = {};
        const valMap = {};
        data.forEach(row => {
          if (row.owned) ownedMap[row.id] = true;
          if (row.custom_image) imgMap[row.id] = row.custom_image;
          if (row.custom_value != null) valMap[row.id] = row.custom_value;
        });
        setMinifigs(prev => prev.map(f => ({
          ...f,
          owned: !!ownedMap[f.id],
          value: valMap[f.id] != null ? valMap[f.id] : f.value
        })));
        setCustomImages(imgMap);
        setCustomValues(valMap);
      }
    }
    fetchCloudData();
  }, []);

  useEffect(() => {
    async function loadDatabaseFiles() {
      try {
        let setMappingsMap = {};
        const setMappingsRes = await fetch(new URL('./assets/database/set_mappings.csv', import.meta.url).href);
        if (setMappingsRes.ok) {
          const text = await setMappingsRes.text();
          text.split('\n').forEach((line, idx) => {
            if (idx === 0 || line.trim().length < 3) return;
            const row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.replace(/^"|"$/g, '').trim());
            if (row.length >= 3) {
              const setNum = row[0]; 
              const extSystem = row[1]; 
              const extId = row[2]; 
              if (extSystem === 'BL' && setNum.startsWith('fig-')) {
                setMappingsMap[setNum] = extId;
              }
            }
          });
        }

        let partsMap = {};
        const partsRes = await fetch(new URL('./assets/database/parts.csv', import.meta.url).href);
        if (partsRes.ok) {
          const text = await partsRes.text();
          text.split('\n').forEach((line, idx) => {
            if (idx === 0 || line.trim().length < 3) return;
            const row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.replace(/^"|"$/g, '').trim());
            if (row.length >= 2) {
              partsMap[row[0]] = row[1];
            }
          });
        }

        let figInventoryIdMap = {};
        const inventoriesRes = await fetch(new URL('./assets/database/inventories.csv', import.meta.url).href);
        if (inventoriesRes.ok) {
          const text = await inventoriesRes.text();
          text.split('\n').forEach((line, idx) => {
            if (idx === 0 || line.trim().length < 3) return;
            const row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.replace(/^"|"$/g, '').trim());
            if (row.length >= 3) {
              const invId = row[0];
              const setNum = row[2];
              if (setNum.startsWith('fig-')) {
                figInventoryIdMap[setNum] = invId;
              }
            }
          });
        }

        let figPartsMap = {};
        const invPartsRes = await fetch(new URL('./assets/database/inventory_parts.csv', import.meta.url).href);
        if (invPartsRes.ok) {
          const text = await invPartsRes.text();
          let invToFigMap = {};
          Object.entries(figInventoryIdMap).forEach(([figNum, invId]) => {
            invToFigMap[invId] = figNum;
          });

          text.split('\n').forEach((line, idx) => {
            if (idx === 0 || line.trim().length < 3) return;
            const row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.replace(/^"|"$/g, '').trim());
            if (row.length >= 2) {
              const invId = row[0];
              const partNum = row[1];
              const quantity = row[3] || '1';
              const figNum = invToFigMap[invId];
              if (figNum) {
                if (!figPartsMap[figNum]) figPartsMap[figNum] = [];
                const partName = partsMap[partNum] || `Part ${partNum}`;
                figPartsMap[figNum].push({
                  name: `${quantity}x ${partName}`,
                  blPartId: partNum,
                  link: `https://www.bricklink.com/v2/catalog/catalogitem.page?P=${partNum}`
                });
              }
            }
          });
        }

        let loadedSets = [];
        const setsRes = await fetch(new URL('./assets/database/sets.csv', import.meta.url).href);
        if (setsRes.ok) {
          const text = await setsRes.text();
          text.split('\n').forEach((line, idx) => {
            if (idx === 0 || line.trim().length < 3) return;
            const row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.replace(/^"|"$/g, '').trim());
            if (row.length >= 4) {
              const setNum = row[0];
              const setName = row[1] || 'Unknown Set';
              const setYear = parseInt(row[2]) || 2020;
              const setPieces = parseInt(row[4]) || 100;

              loadedSets.push({
                number: setNum,
                name: setName,
                theme: 'Standard',
                year: setYear,
                pieces: setPieces,
                value: 49.99,
                image: `https://img.bricklink.com/ItemImage/SN/0/${setNum}.png`
              });
            }
          });
          if (loadedSets.length > 0) setSetsDB(loadedSets);
        }

        let inventoryToSetMap = {};
        const invRes2 = await fetch(new URL('./assets/database/inventories.csv', import.meta.url).href);
        if (invRes2.ok) {
          const text = await invRes2.text();
          text.split('\n').forEach((line, idx) => {
            if (idx === 0 || line.trim().length < 3) return;
            const row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.replace(/^"|"$/g, '').trim());
            if (row.length >= 3) inventoryToSetMap[row[0]] = row[2];
          });
        }

        let figSetsMap = {};
        const invMinifigsRes = await fetch(new URL('./assets/database/inventory_minifigs.csv', import.meta.url).href);
        if (invMinifigsRes.ok) {
          const text = await invMinifigsRes.text();
          text.split('\n').forEach((line, idx) => {
            if (idx === 0 || line.trim().length < 3) return;
            const row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.replace(/^"|"$/g, '').trim());
            if (row.length >= 2) {
              const figNum = row[0];
              const invId = row[1];
              const setNum = inventoryToSetMap[invId];
              if (setNum) {
                const matchingSetObj = loadedSets.find(s => s.number === setNum);
                if (matchingSetObj) {
                  if (!figSetsMap[figNum]) figSetsMap[figNum] = [];
                  if (!figSetsMap[figNum].some(s => s.number === setNum)) {
                    figSetsMap[figNum].push(matchingSetObj);
                  }
                }
              }
            }
          });
        }

        const resolveThemeAndSeries = (blId, figName) => {
          const lowerId = (blId || '').toLowerCase();
          const lowerName = (figName || '').toLowerCase();

          if (lowerId === 'shr001') {
            return { theme: 'Miscellaneous', isCmf: false };
          }
          if (lowerId.startsWith('shell')) {
            return { theme: 'Miscellaneous', isCmf: false };
          }

          if (lowerId.startsWith('tlm')) {
            const numMatch = lowerId.match(/tlm(\d+)/);
            if (numMatch) {
              const num = parseInt(numMatch[1], 10);
              if (num >= 1 && num <= 16) return { theme: 'The LEGO Movie Series 1', isCmf: true };
              if (num >= 148 && num <= 167) return { theme: 'The LEGO Movie 2 (71023)', isCmf: true };
            }
            return { theme: 'The LEGO Movie', isCmf: false };
          }

          if (lowerId.startsWith('gfb')) {
            const numMatch = lowerId.match(/gfb(\d+)/);
            if (numMatch) {
              const num = parseInt(numMatch[1], 10);
              if (num >= 1 && num <= 16) return { theme: 'German Football (71014)', isCmf: true };
            }
          }

          if (lowerId.startsWith('col')) {
            if (lowerId.startsWith('colshr') || lowerId === 'donkey01') return { theme: 'Shrek', isCmf: true };
            if (lowerId.startsWith('coluni')) return { theme: 'Unikitty!', isCmf: true };
            if (lowerId.startsWith('coldnd')) return { theme: 'Dungeons & Dragons (71047)', isCmf: true };
            if (lowerId.startsWith('colspi')) return { theme: 'Spider-Man: Across the Spider-Verse', isCmf: true };
            if (lowerId.startsWith('coltlnm')) return { theme: 'The LEGO Ninjago Movie', isCmf: true };
            if (lowerId.startsWith('colhp')) return { theme: 'Harry Potter S1 (71022)', isCmf: true };
            if (lowerId.startsWith('colmar')) return { theme: 'Marvel Series 1 (71031)', isCmf: true };
            if (lowerId.startsWith('colsh')) return { theme: 'DC Super Heroes (71026)', isCmf: true };
            if (lowerId.startsWith('coltm') || lowerId.startsWith('colmup')) return { theme: 'The Muppets (71033)', isCmf: true };
            if (lowerId.startsWith('coltlbm')) return { theme: 'The LEGO Batman Movie S1 (71017)', isCmf: true };
            if (lowerId.startsWith('coltlm')) return { theme: 'The LEGO Movie Series 1', isCmf: true };

            const numMatch = lowerId.match(/col(\d+)/);
            if (numMatch) {
              const num = parseInt(numMatch[1], 10);
              if (num >= 1 && num <= 16) return { theme: 'Series 1 (8683)', isCmf: true };
              if (num >= 17 && num <= 32) return { theme: 'Series 2 (8684)', isCmf: true };
              if (num >= 33 && num <= 48) return { theme: 'Series 3 (8803)', isCmf: true };
              if (num >= 49 && num <= 64) return { theme: 'Series 4 (8804)', isCmf: true };
              if (num >= 65 && num <= 80) return { theme: 'Series 5 (8805)', isCmf: true };
              if (num >= 81 && num <= 96) return { theme: 'Series 6 (8827)', isCmf: true };
              if (num >= 97 && num <= 112) return { theme: 'Series 7 (8831)', isCmf: true };
              if (num >= 113 && num <= 128) return { theme: 'Series 8 (8833)', isCmf: true };
              if (num >= 129 && num <= 144) return { theme: 'Series 9 (71000)', isCmf: true };
              if (num >= 145 && num <= 161) return { theme: 'Series 10 (71001)', isCmf: true };
              if (num >= 162 && num <= 177) return { theme: 'Series 11 (71002)', isCmf: true };
              if (num >= 178 && num <= 193) return { theme: 'Series 12 (71007)', isCmf: true };
              if (num >= 194 && num <= 209) return { theme: 'Series 13 (71008)', isCmf: true };
              if (num >= 210 && num <= 225) return { theme: 'Series 14 Monsters (71010)', isCmf: true };
              if (num >= 226 && num <= 241) return { theme: 'Series 15 (71011)', isCmf: true };
              if (num >= 242 && num <= 257) return { theme: 'Series 16 (71013)', isCmf: true };
              if (num >= 286 && num <= 301) return { theme: 'Series 17 (71018)', isCmf: true };
              if (num >= 302 && num <= 318) return { theme: 'Series 18 Party (71021)', isCmf: true };
              if (num >= 319 && num <= 334) return { theme: 'Series 19 (71025)', isCmf: true };
              if (num >= 335 && num <= 350) return { theme: 'Series 20 (71027)', isCmf: true };
              if (num >= 351 && num <= 362) return { theme: 'Series 21 (71029)', isCmf: true };
              if (num >= 363 && num <= 374) return { theme: 'Series 22 (71032)', isCmf: true };
              if (num >= 394 && num <= 405) return { theme: 'Series 23 (71034)', isCmf: true };
              if (num >= 411 && num <= 422) return { theme: 'Series 24 (71037)', isCmf: true };
              if (num >= 423 && num <= 434) return { theme: 'Series 25 (71045)', isCmf: true };
              if (num >= 436 && num <= 448) return { theme: 'Series 26 Space (71046)', isCmf: true };
              if (num >= 449 && num <= 460) return { theme: 'Series 27', isCmf: true };
              if (num >= 461 && num <= 472) return { theme: 'Series 28', isCmf: true };
              if (num >= 474 && num <= 485) return { theme: 'Series 29', isCmf: true };
            }
          }

          const dimExplicitIds = ['sh002', 'sh012', 'sh095', 'sh101', 'sh143', 'sh146', 'sh218', 'tlm060', 'tlm061', 'tlm070', 'tlm099', 'njo116', 'njo140', 'njo144', 'njo156', 'njo157', 'njo161', 'loc099', 'loc104', 'loc109', 'lor037'];
          if (lowerId.startsWith('dim') || dimExplicitIds.includes(lowerId)) {
            const numMatch = lowerId.match(/dim(\d+)/);
            if (numMatch) {
              const num = parseInt(numMatch[1], 10);
              if (num >= 1 && num <= 54) return { theme: 'LEGO Dimensions', isCmf: false };
            }
            if (dimExplicitIds.includes(lowerId)) return { theme: 'LEGO Dimensions', isCmf: false };
          }

          const mofExplicitIds = ['gen043', 'gen044', 'gen045'];
          if (lowerId.startsWith('mof') || mofExplicitIds.includes(lowerId)) {
            return { theme: 'Monster Fighters', isCmf: false };
          }

          const scoobyExplicitIds = ['scooby01', 'scooby02', 'scooby03', 'scooby04'];
          const scoobyParts = ['21042pb01c03', '20690pb01c03', '20690pb01c02', '21042pb01c02', '20690pb01c01', '21042pb01c01'];
          if (lowerId.startsWith('scd') || scoobyExplicitIds.includes(lowerId) || scoobyParts.some(p => lowerId.includes(p) || lowerName.includes(p))) {
            return { theme: 'Scooby-Doo', isCmf: false };
          }

          if (lowerId.startsWith('sh') || lowerId.startsWith('shg') || lowerId.startsWith('bat')) {
            const marvelExplicitIds = [
              'sh1053', 'sh0250', 'sh0251', 'sh0212', 'sh0173', 'sh0177', 
              'sh0090', 'sh0045', 'sh0044', 'sh0038', 'sh0037', 'sh0035', 'sh0034', 
              'sh0033', 'sh0032', 'sh0031', 'sh0030', 'sh0029', 'sh0018', 'sh0017', 
              'sh0015', 'sh0014', 'sh0013', 'sh0041', 'sh0084', 'sh0602', 'sh0601', 
              'sh0554', 'sh0605', 'sh0068', 'sh0071', 'sh0070', 'sh0069', 'sh0066', 
              'sh0067', 'sh0053', 'sh0052', 'sh0054', 'sh0051', 'sh0056', 'sh0130', 
              'sh0448', 'sh0407', 'sh0406', 'sh0579', 'sh0186', 'sh0404', 'sh0426', 
              'sh0494', 'sh0571', 'sh0597a', 'sh0629', 'sh0630', 'sh0637', 'sh0675', 
              'sh0676', 'sh0702', 'sh0699', 'sh0701', 'sh0700', 'sh0706', 'sh0705', 
              'sh0694', 'sh0724', 'sh0712', 'sh0714', 'sh714', 'sh0716', 'sh0719', 
              'sh0713', 'sh0726', 'sh0710', 'sh0725', 'sh0717', 'sh0720', 'sh0718', 
              'sh0722', 'sh0715', 'sh0738', 'sh0746', 'sh0749', 'sh0751', 'sh0754', 
              'sh0752', 'sh0638', 'sh0698', 'sh0140', 'sh0770', 'sh0767', 'sh0765', 
              'sh0764', 'sh0766', 'sh0771', 'sh0763', 'sh0762', 'sh0768', 'sh0769', 
              'sh0779', 'sh0793', 'sh0801', 'sh0821', 'sh0826', 'sh0830', 'sh0833', 
              'sh0848', 'sh0840', 'sh0846', 'sh0841', 'sh0845', 'sh0856', 'sh0851', 
              'sh0877', 'sh0881', 'sh0907', 'sh0912', 'sh0934', 'sh0921', 'sh0920', 
              'sh0922', 'sh0930', 'sh0927', 'sh0931', 'sh0933', 'sh0942', 'sh0938', 
              'sh0953', 'sh0378', 'sh0518', 'sh0203', 'sh0812', 'sh0980', 'sh0990', 
              'sh0998', 'sh0995', 'sh0996', 'sh0994', 'sh1002', 'sh1025', 'sh1032', 
              'sh1031', 'sh1012', 'sh1051', 'sh1049', 'sh1065', 'sh1059', 'sh1100', 
              'sh1136', 'sh1142', 'sh1141', 'sh1158', 'sh1161', 'sh1165', 'sh1168', 
              'sh1169', 'sh1171', 'sh1135', 'sh1139'
            ];
            const marvelKeywords = [
              'spider-man', 'spider man', 'captain america', 'iron man', 'thor', 
              'hulk', 'avengers', 'wolverine', 'deadpool', 'magneto', 'loki', 
              'hawkeye', 'jean grey', 'rocket', 'thanos', 'venom', 'carnage', 
              'black panther', 'doctor strange', 'ultron', 'vision', 'ant-man', 
              'star-lord', 'groot', 'gamora', 'drax', 'collector', 'valkyrie', 
              'hela', 'chitauri', 'iron fist', 'iron patriot', 'ned leeds', 
              'maria hill', 'nick fury', 'captain marvel', 'pepper potts', 
              'extremis', 'mandarin', 'tony stark', 'war machine', 'aldrich killian', 
              'beetle', 'dr. doom', 'j jonah jameson', 'nova', 'scarlet witch', 
              'iron legion', 'sandman', 'rhino', 'iron spider', 'shield agent', 
              'beast boy', 'yellowjacket', 'hydra', 'iron skull', 'winter soldier', 
              'quicksilver', 'baron von strucker', 'agent 13', 'crossbones', 
              'falcon', 'hyperion', 'green goblin', 'kraven', 'scarlet spider', 
              'scorpion', 'spider-girl', 'aunt may', 'ancient one', 'karl mordo', 
              'captain stacy', 'dr. octopus', 'white tiger', 'vulture', 'ghost rider', 
              'hobgoblin', 'mantis', 'taserface', 'justin hammer', 'agent coulson', 
              'super-adaptoid', 'ms. marvel', 'yondu', 'nebula', 'grandmaster',
              'cyclops', 'storm', 'sakaaran', 'ronan', 'modok', 'taskmaster', 
              'red skull', 'power man', 'proxima midnight', 'outrider', 'shuri', 
              'corvus glaive', 'ulysses klaue', 'erik killmonger', 'nakia', 
              'okoye', 'talon', 'ebony maw', 'cull obsidian', 'ghost-spider', 
              'spider-gwen', 'dock worker', 'happy hogan', 'mysterio', 'mj', 
              'michelle jones', 'mary jane', 'hydro-man', 'firefighter', 'talos', 
              'aim agent', 'electro', 'shocker', 'maria rambeau', 'yelena belova', 
              'red guardian', 'razor fist', 'katy', 'wenwu', 'shang-chi', 'xialing', 
              'death dealer', 'miles morales', 'daredevil', 'firestar', 'peter parker', 
              'robbie robertson', 'ben urich', 'blade', 'betty brant', 'amber grant', 
              'ron barney', 'taxi driver bernie', 'gwen stacy', 'punisher', 'black cat', 
              'obadiah stone', 'watcher', 'captain carter', 'steve rogers', 'miek', 'korg',
              'spider-ham', 'pork grind', 'spider-woman', 'phastos', 'makkari', 'sersi', 
              'ikaris', 'thena', 'druig', 'kingo', 'ajak', 'gilgamesh', 'sprite', 
              'wong', 'america chavez', 'whiplash', 'sinister strange', 'dead strange', 
              'ironheart', 'attuma', "m'baku", 'namor', 'morbius', 'adam warlock', 
              'photon', 'kevin feige', 'helen cho', 'alexander pierce', 'erik selvig', 
              'wasp', 'dum-e', 'rogue', 'lizard', 'zola', 'ayesha', 'ghost', 'gorr', 
              'fire demon', 'charles xavier', 'iceman', 'bishop', 'gambit', 
              'ruth bat-seraph', 'trapster', 'spot', 'jefferson', 'the thing', 
              'reed richards', 'norman osborn', 'boomerang', 'dodc guard', 'tombstone', 
              'doctor doom', 'kurt wagner', 'nightcrawler', 'raven darkholme', 'mystique', 
              'robert reynolds', 'sentry', 'tarantula', 'hotdog vendor'
            ];
            
            if (marvelExplicitIds.includes(lowerId) || marvelKeywords.some(kw => lowerId.includes(kw) || lowerName.includes(kw))) {
              return { theme: 'Marvel Super Heroes', isCmf: false };
            }
            return { theme: 'DC Super Heroes', isCmf: false };
          }

          for (const theme of MASTER_THEMES_BASE) {
            if (Array.isArray(theme.prefix)) {
              if (theme.prefix.some(p => lowerId.startsWith(p))) {
                return { theme: theme.name, isCmf: false };
              }
            } else if (theme.prefix && lowerId.startsWith(theme.prefix)) {
              return { theme: theme.name, isCmf: false };
            }
          }

          return { theme: 'Miscellaneous', isCmf: false };
        };

        // Smart Valuation Estimator
        const estimateValue = (blId, name) => {
          const id = (blId || '').toLowerCase();
          const nm = (name || '').toLowerCase();
          if (id.includes('boba') || id.includes('rex') || id.includes('jango') || id.includes('vader') || nm.includes('boba fett')) return 45.00;
          if (id.startsWith('sw') && parseInt(id.replace('sw','')) < 50) return 25.00;
          if (nm.includes('gold') || nm.includes('chrome') || nm.includes('exclusive')) return 60.00;
          if (id.startsWith('col') || id.startsWith('sh') || id.startsWith('hp')) return 8.50;
          return 5.00;
        };

        const minifigsRes = await fetch(new URL('./assets/database/minifigs.csv', import.meta.url).href);
        if (minifigsRes.ok) {
          const text = await minifigsRes.text();
          const loadedFigs = [];
          text.split('\n').forEach((line, idx) => {
            if (idx === 0 || line.trim().length < 3) return;
            const row = line.split(/,(?=(?:(?:[^"]*"){2})*[^"]*$)/).map(val => val.replace(/^"|"$/g, '').trim());
            if (row.length >= 2 && row[0].startsWith('fig-')) {
              const rbId = row[0];
              const name = row[1] || 'Unknown Minifigure';
              const imgUrl = row[3] || `https://img.bricklink.com/ItemImage/MN/0/sw0001.png`;
              
              const blId = setMappingsMap[rbId] || `sw${rbId.replace('fig-', '')}`;
              const { theme } = resolveThemeAndSeries(blId, name);
              const figSets = figSetsMap[rbId] || [];
              const figParts = figPartsMap[rbId] || [
                { name: 'Minifigure Torso & Head Assembly', blPartId: '973', link: `https://www.bricklink.com/v2/catalog/catalogitem.page?P=973` }
              ];
              const defaultVal = estimateValue(blId, name);

              loadedFigs.push({
                id: rbId,
                name: name,
                blId: blId,
                rbId: rbId,
                theme: theme,
                year: 2020,
                value: defaultVal,
                owned: false,
                image: imgUrl,
                sets: figSets,
                parts: figParts
              });
            }
          });

          loadedFigs.push({
            id: 'fig-donkey01',
            name: 'Donkey (Shrek)',
            blId: 'donkey01',
            rbId: 'fig-donkey01',
            theme: 'Shrek',
            year: 2026,
            value: 3.50,
            owned: false,
            image: 'https://img.bricklink.com/ItemImage/PN/147/donkey01.png',
            sets: [],
            parts: [{ name: 'Donkey Body Element', blPartId: 'donkey01', link: 'https://www.bricklink.com/v2/catalog/catalogitem.page?P=donkey01' }]
          });

          loadedFigs.push({
            id: 'fig-shr001',
            name: 'Puss in Boots (Miscellaneous)',
            blId: 'shr001',
            rbId: 'fig-shr001',
            theme: 'Miscellaneous',
            year: 2026,
            value: 4.50,
            owned: false,
            image: 'https://img.bricklink.com/ItemImage/PN/147/shr001.png',
            sets: [],
            parts: [{ name: 'Puss in Boots Hat & Head Assembly', blPartId: 'shr001', link: 'https://www.bricklink.com/v2/catalog/catalogitem.page?P=shr001' }]
          });

          const scoobyPartsList = [
            { id: '21042pb01c03', name: 'Scooby-Doo (Walking, Tongue Licking Chops)' },
            { id: '20690pb01c03', name: 'Scooby-Doo (Sitting, Tongue Licking Chops)' },
            { id: '20690pb01c02', name: 'Scooby-Doo (Sitting, Chattering Teeth)' },
            { id: '21042pb01c02', name: 'Scooby-Doo (Walking, Chattering Teeth)' },
            { id: '20690pb01c01', name: 'Scooby-Doo (Sitting, Pilot Goggles)' },
            { id: '21042pb01c01', name: 'Scooby-Doo (Walking, Pilot Goggles)' }
          ];

          scoobyPartsList.forEach((sp, idx) => {
            loadedFigs.push({
              id: `fig-scooby-${idx}`,
              name: sp.name,
              blId: sp.id,
              rbId: `fig-scooby-${idx}`,
              theme: 'Scooby-Doo',
              year: 2015,
              value: 6.00,
              owned: false,
              image: `https://img.bricklink.com/ItemImage/PN/147/${sp.id}.png`,
              sets: [],
              parts: [{ name: sp.name, blPartId: sp.id, link: `https://www.bricklink.com/v2/catalog/catalogitem.page?P=${sp.id}` }]
            });
          });

          if (loadedFigs.length > 0) {
            setMinifigs(loadedFigs);
          }
        }
      } catch (err) {
        console.log('Database auto-load error:', err);
      }
    }
    loadDatabaseFiles();
  }, []);

  useEffect(() => {
    let stream = null;
    if (scannerOpen) {
      navigator.mediaDevices?.getUserMedia({ video: { facingMode: 'environment' } })
        .then((s) => {
          stream = s;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch((err) => {
          console.log('Camera simulation mode active:', err);
        });
    }
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [scannerOpen]);

  const toggleOwned = async (id) => {
    const fig = minifigs.find(f => f.id === id);
    const newOwned = !fig.owned;

    setMinifigs(prev => prev.map(f => f.id === id ? { ...f, owned: newOwned } : f));
    if (selectedMinifig && selectedMinifig.id === id) {
      setSelectedMinifig(prev => ({ ...prev, owned: newOwned }));
    }

    await supabase.from('user_collection').upsert({
      id: id,
      owned: newOwned,
      custom_image: customImages[id] || null,
      custom_value: customValues[id] != null ? customValues[id] : fig.value
    });
  };

  const updateCustomImage = async (id, url) => {
    setCustomImages(prev => ({ ...prev, [id]: url }));
    const fig = minifigs.find(f => f.id === id);
    await supabase.from('user_collection').upsert({
      id: id,
      owned: fig.owned,
      custom_image: url,
      custom_value: customValues[id] != null ? customValues[id] : fig.value
    });
  };

  const updateCustomValue = async (id, val) => {
    const numVal = parseFloat(val) || 0;
    setCustomValues(prev => ({ ...prev, [id]: numVal }));
    setMinifigs(prev => prev.map(f => f.id === id ? { ...f, value: numVal } : f));
    if (selectedMinifig && selectedMinifig.id === id) {
      setSelectedMinifig(prev => ({ ...prev, value: numVal }));
    }
    const fig = minifigs.find(f => f.id === id);
    await supabase.from('user_collection').upsert({
      id: id,
      owned: fig.owned,
      custom_image: customImages[id] || null,
      custom_value: numVal
    });
  };

  const getFigImage = (fig) => {
    return customImages[fig.id] || fig.image;
  };

  const masterThemes = MASTER_THEMES_BASE.map(theme => {
    const themeFigs = minifigs.filter(f => f.theme === theme.name);
    return { ...theme, owned: themeFigs.filter(f => f.owned).length, total: themeFigs.length };
  });

  const cmfSeries = CMF_SERIES_BASE.map(series => {
    const seriesFigs = minifigs.filter(f => f.theme === series.name);
    const ownedCount = seriesFigs.filter(f => f.owned).length;
    const totalCount = seriesFigs.length;
    const completionPct = totalCount > 0 ? Math.round((ownedCount / totalCount) * 100) : 0;
    return { ...series, owned: ownedCount, total: totalCount, completionPct };
  });

  const matchingSets = searchQuery.trim() === '' ? [] : setsDB.filter(s => s.name.toLowerCase().includes(searchQuery.toLowerCase()) || s.number.includes(searchQuery));
  const matchingMinifigs = searchQuery.trim() === '' ? [] : minifigs.filter(fig => fig.name.toLowerCase().includes(searchQuery.toLowerCase()) || fig.blId.toLowerCase().includes(searchQuery.toLowerCase()) || fig.rbId.toLowerCase().includes(searchQuery.toLowerCase()));

  const totalOwned = minifigs.filter(f => f.owned).length;
  const totalCollection = minifigs.length;
  const totalValue = minifigs.reduce((acc, f) => acc + (f.owned ? f.value : 0), 0);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col max-w-md mx-auto relative shadow-2xl border-x border-zinc-900">
      
      <header className="bg-black border-b border-zinc-900 p-4 sticky top-0 z-20 flex justify-between items-center">
        <h1 className="text-base font-black tracking-widest text-white">MINIFIG MADNESS</h1>
        <button 
          onClick={() => setImportModalOpen(true)}
          className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 text-xs font-bold py-1.5 px-3 rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <Database size={14} /> Cloud Sync Active
        </button>
      </header>

      <main className="flex-1 p-4 flex flex-col gap-4">

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 text-center shadow-lg">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Unique Minifigs</span>
            <span className="text-lg font-mono font-black text-amber-400">{totalOwned} / {totalCollection}</span>
            <span className="block text-[10px] text-zinc-500 mt-0.5">{totalCollection > 0 ? ((totalOwned / totalCollection) * 100).toFixed(1) : 0}% Collected</span>
          </div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-2xl p-4 text-center shadow-lg">
            <span className="block text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-1">Estimated Value</span>
            <span className="text-lg font-mono font-black text-emerald-400">${totalValue.toLocaleString(undefined, {minimumFractionDigits: 2, maximumFractionDigits: 2})}</span>
            <span className="block text-[10px] text-zinc-500 mt-0.5">Market Value</span>
          </div>
        </div>

        <div className="relative w-full">
          <Search className="absolute left-3.5 top-3.5 text-zinc-500" size={18} />
          <input 
            type="text"
            placeholder="Search sets ('75192'), BL ID ('sw0190')..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full bg-zinc-900 border border-zinc-800 rounded-2xl pl-10 pr-10 py-3 text-sm focus:outline-none focus:border-amber-500 text-white placeholder-zinc-500 shadow-inner"
          />
          {searchQuery && (
            <button onClick={() => setSearchQuery('')} className="absolute right-3.5 top-3 text-zinc-400 hover:text-white cursor-pointer">
              <X size={18} />
            </button>
          )}
        </div>

        {searchQuery.trim() !== '' ? (
          <div className="flex-1 flex flex-col gap-4 pb-4">
            {matchingSets.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Box size={14} /> Matching LEGO Sets ({matchingSets.length})
                </h3>
                <div className="flex flex-col gap-2">
                  {matchingSets.map(set => (
                    <div 
                      key={set.number}
                      onClick={() => setSelectedSet(set)}
                      className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-3 flex items-center justify-between cursor-pointer transition"
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-16 h-14 bg-black rounded-xl p-1 flex items-center justify-center border border-zinc-800">
                          <img src={set.image} alt={set.name} className="max-h-12 object-contain" onError={(e)=>{ e.target.src = 'https://img.bricklink.com/ItemImage/SN/0/75192-1.png'; }} />
                        </div>
                        <div>
                          <span className="text-[10px] font-mono text-amber-400 font-semibold">{set.number}</span>
                          <h4 className="text-xs font-bold text-white line-clamp-1">{set.name}</h4>
                          <span className="text-[10px] text-zinc-400">{set.pieces} pcs • ${set.value}</span>
                        </div>
                      </div>
                      <ChevronRight size={16} className="text-zinc-500" />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {matchingMinifigs.length > 0 && (
              <div>
                <h3 className="text-xs font-bold text-amber-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
                  <Layers size={14} /> Matching Minifigures ({matchingMinifigs.length})
                </h3>
                <div className="grid grid-cols-3 gap-2.5">
                  {matchingMinifigs.map(fig => (
                    <div 
                      key={fig.id}
                      onClick={() => { setSelectedMinifig(fig); setImageUrlInput(customImages[fig.id] || fig.image); setValueInput(fig.value); }}
                      className={`bg-zinc-900 border ${fig.owned ? 'border-amber-500/50' : 'border-zinc-800 opacity-60'} rounded-2xl p-2.5 flex flex-col items-center cursor-pointer relative`}
                    >
                      <div className="absolute top-2 right-2">
                        <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${fig.owned ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-transparent'}`}>
                          <Check size={10} strokeWidth={3} />
                        </div>
                      </div>
                      <div className="h-20 w-full flex items-center justify-center mb-1.5">
                        <img src={getFigImage(fig)} alt={fig.name} className="max-h-18 object-contain" />
                      </div>
                      <span className="text-[9px] font-mono text-amber-400">{fig.blId}</span>
                      <h3 className="text-[10px] font-medium text-center line-clamp-1">{fig.name}</h3>
                      <span className="text-[9px] text-zinc-400 mt-0.5">${fig.value.toFixed(2)}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        ) : (
          <>
            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setActiveModal('themes')}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold py-4 px-4 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <span className="text-sm tracking-wide">Master Themes</span>
                <span className="text-[10px] text-zinc-400 font-normal">{masterThemes.length} Categories</span>
              </button>
              <button 
                onClick={() => setActiveModal('cmf')}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-white font-bold py-4 px-4 rounded-2xl flex flex-col items-center justify-center gap-1 cursor-pointer"
              >
                <span className="text-sm tracking-wide">CMF Series</span>
                <span className="text-[10px] text-zinc-400 font-normal">{cmfSeries.length} Series</span>
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button 
                onClick={() => setScannerOpen(true)}
                className="bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-amber-400 font-bold py-4 px-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Camera size={20} />
                <span className="text-xs uppercase tracking-wider">Scanner</span>
              </button>
              <button 
                onClick={() => setAddModalOpen(true)}
                className="bg-amber-500 hover:bg-amber-400 text-black font-bold py-4 px-4 rounded-2xl flex items-center justify-center gap-2 cursor-pointer"
              >
                <Plus size={20} />
                <span className="text-xs uppercase tracking-wider">Add Minifig</span>
              </button>
            </div>
          </>
        )}

      </main>

      {activeModal && (
        <div className="fixed inset-0 bg-black/90 backdrop-blur-md z-50 flex flex-col p-4">
          <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-900">
            <h2 className="text-lg font-bold uppercase text-amber-400">
              {activeModal === 'themes' ? 'Master Themes' : 'CMF Series (Release Order)'}
            </h2>
            <button onClick={() => setActiveModal(null)} className="bg-zinc-900 text-zinc-300 w-8 h-8 rounded-full flex items-center justify-center border border-zinc-800 cursor-pointer">
              ✕
            </button>
          </div>

          <div className="flex-1 overflow-y-auto">
            <div className="grid grid-cols-2 gap-3">
              {(activeModal === 'themes' ? masterThemes : cmfSeries).map(item => (
                <div 
                  key={item.id}
                  onClick={() => { setSelectedCategory(item); setCategorySearchQuery(''); setFilterTab('all'); setActiveModal(null); }}
                  className="bg-zinc-900 border border-zinc-800 hover:border-amber-500/50 rounded-2xl p-3 flex flex-col items-center cursor-pointer justify-between"
                >
                  <div className="h-24 w-full flex items-center justify-center mb-2">
                    <img src={item.image} alt={item.name} className="max-h-20 object-contain" />
                  </div>
                  <h3 className="font-bold text-xs text-center line-clamp-1 mb-2">{item.name}</h3>
                  <div className="w-full flex justify-between items-center px-1">
                    <span className="text-[10px] font-mono text-amber-400 font-semibold">{item.owned} / {item.total}</span>
                    {activeModal === 'cmf' && (
                      <span className="text-[10px] font-mono text-zinc-400">{item.completionPct}%</span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {selectedCategory && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col p-4">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-zinc-900">
            <button 
              onClick={() => {
                const wasTheme = masterThemes.some(t => t.name === selectedCategory.name);
                setSelectedCategory(null);
                setActiveModal(wasTheme ? 'themes' : 'cmf');
              }}
              className="flex items-center text-amber-400 text-sm font-medium cursor-pointer"
            >
              <ArrowLeft size={16} className="mr-1" /> Back
            </button>
            <h2 className="text-sm font-bold truncate max-w-[200px]">{selectedCategory.name}</h2>
            <span className="text-xs font-mono text-zinc-400">{selectedCategory.owned} / {selectedCategory.total}</span>
          </div>

          <div className="relative w-full mb-3">
            <Search className="absolute left-3.5 top-3 text-zinc-500" size={16} />
            <input 
              type="text"
              placeholder={`Search in ${selectedCategory.name}...`}
              value={categorySearchQuery}
              onChange={(e) => setCategorySearchQuery(e.target.value)}
              className="w-full bg-zinc-900 border border-zinc-800 rounded-xl pl-9 pr-8 py-2 text-xs focus:outline-none focus:border-amber-500 text-white placeholder-zinc-500"
            />
            {categorySearchQuery && (
              <button onClick={() => setCategorySearchQuery('')} className="absolute right-3 top-2.5 text-zinc-400 hover:text-white cursor-pointer">
                <X size={14} />
              </button>
            )}
          </div>

          <div className="grid grid-cols-3 gap-2 mb-3">
            <button 
              onClick={() => setFilterTab('all')} 
              className={`py-1.5 text-xs font-bold rounded-xl border cursor-pointer ${filterTab === 'all' ? 'bg-amber-500 text-black border-amber-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800'}`}
            >
              All
            </button>
            <button 
              onClick={() => setFilterTab('owned')} 
              className={`py-1.5 text-xs font-bold rounded-xl border cursor-pointer ${filterTab === 'owned' ? 'bg-amber-500 text-black border-amber-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800'}`}
            >
              Owned
            </button>
            <button 
              onClick={() => setFilterTab('not-owned')} 
              className={`py-1.5 text-xs font-bold rounded-xl border cursor-pointer ${filterTab === 'not-owned' ? 'bg-amber-500 text-black border-amber-500' : 'bg-zinc-900 text-zinc-400 border-zinc-800'}`}
            >
              Not Owned
            </button>
          </div>

          {/* 3 Columns Grid View */}
          <div className="flex-1 overflow-y-auto grid grid-cols-3 gap-2.5 pb-4">
            {minifigs
              .filter(fig => fig.theme === selectedCategory.name)
              .filter(fig => {
                const matchesSearch = categorySearchQuery.trim() === '' || 
                  fig.name.toLowerCase().includes(categorySearchQuery.toLowerCase()) || 
                  fig.blId.toLowerCase().includes(categorySearchQuery.toLowerCase());
                const matchesTab = filterTab === 'all' || 
                  (filterTab === 'owned' && fig.owned) || 
                  (filterTab === 'not-owned' && !fig.owned);
                return matchesSearch && matchesTab;
              })
              .map(fig => (
                <div 
                  key={fig.id}
                  onClick={() => { setSelectedMinifig(fig); setImageUrlInput(customImages[fig.id] || fig.image); setValueInput(fig.value); }}
                  className={`bg-zinc-900 border ${fig.owned ? 'border-amber-500/50' : 'border-zinc-800 opacity-60'} rounded-2xl p-2.5 flex flex-col items-center cursor-pointer relative`}
                >
                  <div className="absolute top-2 right-2">
                    <div className={`w-4 h-4 rounded-full flex items-center justify-center border ${fig.owned ? 'bg-amber-500 text-black' : 'bg-zinc-800 text-transparent'}`}>
                      <Check size={10} strokeWidth={3} />
                    </div>
                  </div>
                  <div className="h-20 w-full flex items-center justify-center mb-1.5">
                    <img src={getFigImage(fig)} alt={fig.name} className="max-h-18 object-contain" />
                  </div>
                  <span className="text-[9px] font-mono text-amber-400">{fig.blId}</span>
                  <h3 className="text-[10px] font-medium text-center line-clamp-1">{fig.name}</h3>
                  <span className="text-[9px] text-zinc-400 mt-0.5">${fig.value.toFixed(2)}</span>
                </div>
              ))}
          </div>
        </div>
      )}

      {selectedMinifig && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-6 max-h-[85vh] overflow-y-auto">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-mono bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-md border border-amber-500/20">
                  {selectedMinifig.theme} • Released {selectedMinifig.year}
                </span>
                <h2 className="text-xl font-bold mt-2">{selectedMinifig.name}</h2>
              </div>
              <button onClick={() => setSelectedMinifig(null)} className="bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 cursor-pointer">
                ✕
              </button>
            </div>

            <div className="bg-black rounded-2xl p-6 flex items-center justify-center mb-4 border border-zinc-800">
              <img src={getFigImage(selectedMinifig)} alt={selectedMinifig.name} className="h-36 object-contain" />
            </div>

            <div className="mb-4 bg-black/60 border border-zinc-800 rounded-2xl p-3.5 flex flex-col gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
                  <ImageIcon size={14} /> Custom Image URL
                </label>
                <div className="flex gap-2">
                  <input 
                    type="text" 
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="Paste direct image URL..."
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <button 
                    onClick={() => updateCustomImage(selectedMinifig.id, imageUrlInput)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-amber-400 text-xs font-bold px-3 py-2 rounded-xl border border-zinc-700 cursor-pointer"
                  >
                    Update
                  </button>
                </div>
              </div>
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-amber-400 mb-1.5 flex items-center gap-1.5">
                  Market Value ($)
                </label>
                <div className="flex gap-2">
                  <input 
                    type="number" 
                    value={valueInput}
                    onChange={(e) => setValueInput(e.target.value)}
                    placeholder="5.00"
                    className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-amber-500 font-mono"
                  />
                  <button 
                    onClick={() => updateCustomValue(selectedMinifig.id, valueInput)}
                    className="bg-zinc-800 hover:bg-zinc-700 text-emerald-400 text-xs font-bold px-3 py-2 rounded-xl border border-zinc-700 cursor-pointer"
                  >
                    Set Price
                  </button>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                <span className="block text-[10px] text-zinc-500 uppercase">BrickLink ID</span>
                <span className="text-xs font-mono font-bold text-amber-400">{selectedMinifig.blId}</span>
              </div>
              <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                <span className="block text-[10px] text-zinc-500 uppercase">Rebrickable ID</span>
                <span className="text-xs font-mono font-bold text-amber-400">{selectedMinifig.rbId}</span>
              </div>
              <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                <span className="block text-[10px] text-zinc-500 uppercase">Est. Value</span>
                <span className="text-xs font-mono font-bold text-emerald-400">${selectedMinifig.value.toFixed(2)}</span>
              </div>
            </div>

            <div className="mb-4 bg-black/60 border border-zinc-800 rounded-2xl p-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <Layers size={14} /> Parts Breakdown ({selectedMinifig.parts.length})
              </h3>
              <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto pr-1">
                {selectedMinifig.parts.map((part, idx) => (
                  <a 
                    key={idx} 
                    href={part.link}
                    target="_blank"
                    rel="noreferrer"
                    className="flex justify-between items-center text-xs bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl border border-zinc-800 transition group"
                  >
                    <span className="text-zinc-300 truncate max-w-[230px] group-hover:text-white">{part.name}</span>
                    <span className="text-amber-400 font-mono flex items-center gap-1 text-[11px]">
                      {part.blPartId} <ExternalLink size={11} />
                    </span>
                  </a>
                ))}
              </div>
            </div>

            <div className="mb-4 bg-black/60 border border-zinc-800 rounded-2xl p-3.5">
              <h3 className="text-xs font-bold uppercase tracking-wider text-amber-400 mb-2 flex items-center gap-1.5">
                <Box size={14} /> Appeared in Sets ({selectedMinifig.sets.length})
              </h3>
              <div className="flex flex-col gap-1.5">
                {selectedMinifig.sets.map((set, idx) => (
                  <div 
                    key={idx} 
                    onClick={() => { setSelectedMinifig(null); setSelectedSet(set); }}
                    className="flex justify-between items-center text-xs bg-zinc-900 hover:bg-zinc-800 px-3 py-2 rounded-xl border border-zinc-800 cursor-pointer"
                  >
                    <span className="font-mono text-amber-400 font-semibold">{set.number}</span>
                    <span className="text-zinc-300 truncate max-w-[200px]">{set.name}</span>
                    <ChevronRight size={14} className="text-zinc-500" />
                  </div>
                ))}
              </div>
            </div>

            <button 
              onClick={() => toggleOwned(selectedMinifig.id)}
              className={`w-full font-bold py-3.5 px-4 rounded-2xl flex items-center justify-center gap-2 text-sm cursor-pointer ${selectedMinifig.owned ? 'bg-zinc-800 text-zinc-300' : 'bg-amber-500 text-black'}`}
            >
              {selectedMinifig.owned ? <><Check size={18} /> Owned</> : <><Plus size={18} /> Add to Collection</>}
            </button>
          </div>
        </div>
      )}

      {selectedSet && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-md rounded-3xl p-6">
            <div className="flex justify-between items-start mb-4">
              <div>
                <span className="text-xs font-mono bg-amber-500/10 text-amber-400 px-2.5 py-1 rounded-md border border-amber-500/20">
                  Set #{selectedSet.number} • Released {selectedSet.year}
                </span>
                <h2 className="text-xl font-bold mt-2">{selectedSet.name}</h2>
              </div>
              <button onClick={() => setSelectedSet(null)} className="bg-zinc-800 w-8 h-8 rounded-full flex items-center justify-center text-zinc-400 cursor-pointer">
                ✕
              </button>
            </div>

            <div className="bg-black rounded-2xl p-6 flex items-center justify-center mb-4 border border-zinc-800">
              <img src={selectedSet.image} alt={selectedSet.name} className="h-36 object-contain" />
            </div>

            <div className="grid grid-cols-3 gap-2 mb-4 text-center">
              <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                <span className="block text-[10px] text-zinc-500 uppercase">Theme</span>
                <span className="text-xs font-bold text-white truncate block">{selectedSet.theme}</span>
              </div>
              <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                <span className="block text-[10px] text-zinc-500 uppercase">Pieces</span>
                <span className="text-xs font-mono font-bold text-amber-400">{selectedSet.pieces}</span>
              </div>
              <div className="bg-black p-2.5 rounded-xl border border-zinc-800">
                <span className="block text-[10px] text-zinc-500 uppercase">Est. Value</span>
                <span className="text-xs font-mono font-bold text-emerald-400">${selectedSet.value}</span>
              </div>
            </div>

            <a href={`https://www.bricklink.com/v2/catalog/catalogitem.page?S=${selectedSet.number}`} target="_blank" rel="noreferrer" className="w-full bg-emerald-600/20 border border-emerald-500/30 text-emerald-400 text-xs font-semibold py-3 px-4 rounded-xl flex items-center justify-center gap-2">
              <ShoppingCart size={14} /> Buy Set on BrickLink <ExternalLink size={14} />
            </a>
          </div>
        </div>
      )}

      {scannerOpen && (
        <div className="fixed inset-0 bg-black z-50 flex flex-col p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-base font-bold text-amber-400">Minifig & Set Scanner</h2>
            <button onClick={() => setScannerOpen(false)} className="bg-zinc-900 text-zinc-300 w-8 h-8 rounded-full flex items-center justify-center">✕</button>
          </div>
          <div className="flex-1 bg-zinc-900 border border-zinc-800 rounded-3xl flex flex-col items-center justify-center relative overflow-hidden">
            <video ref={videoRef} autoPlay playsInline muted className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute border-2 border-amber-400/80 w-64 h-64 rounded-3xl pointer-events-none shadow-2xl flex items-center justify-center">
              <div className="w-full h-0.5 bg-amber-400/50 absolute animate-pulse" />
            </div>
            <span className="absolute bottom-6 text-xs bg-black/70 px-4 py-2 rounded-full border border-zinc-800 text-amber-400 font-mono">Position barcode or minifig in frame</span>
          </div>
        </div>
      )}

      {addModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-800">
              <h2 className="text-base font-bold text-amber-400">Add Custom Minifigure</h2>
              <button onClick={() => setAddModalOpen(false)} className="text-zinc-400 hover:text-white">✕</button>
            </div>
            <div className="flex flex-col gap-3">
              <input type="text" placeholder="Minifig Name" className="bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white" />
              <input type="text" placeholder="BrickLink ID (e.g. sw0190)" className="bg-black border border-zinc-800 rounded-xl px-3 py-2.5 text-xs text-white font-mono" />
              <button onClick={() => setAddModalOpen(false)} className="w-full bg-amber-500 text-black text-xs font-bold py-3 rounded-xl cursor-pointer">Save Minifig</button>
            </div>
          </div>
        </div>
      )}

      {importModalOpen && (
        <div className="fixed inset-0 bg-black/85 backdrop-blur-md z-50 flex items-center justify-center p-4">
          <div className="bg-zinc-900 border border-zinc-800 w-full max-w-sm rounded-3xl p-6 shadow-2xl">
            <div className="flex justify-between items-center mb-4 pb-2 border-b border-zinc-800">
              <div className="flex items-center gap-2">
                <Database className="text-amber-400" size={18} />
                <h2 className="text-base font-bold text-amber-400">Cloud Sync Status</h2>
              </div>
              <button onClick={() => setImportModalOpen(false)} className="text-zinc-400 hover:text-white cursor-pointer">
                <X size={18} />
              </button>
            </div>
            <p className="text-xs text-zinc-400 mb-4">Supabase Cloud database successfully linked. Changes made on your iPhone will automatically sync to your iPad!</p>
            <button onClick={() => setImportModalOpen(false)} className="w-full bg-amber-500 hover:bg-amber-400 text-black text-xs font-bold py-3 rounded-xl cursor-pointer">
              Close
            </button>
          </div>
        </div>
      )}

    </div>
  );
}