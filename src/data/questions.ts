import { Question } from '../types';

export const QUESTIONS_BANK: Question[] = [
  {
    id: 'q-1',
    category: 'amategeko',
    question: {
      rw: 'Ku masangano y\'imihanda ingana aho nta kimenyetso cyangwa umupolisi uhari, ni nde ufite uburenganzira bwo gutambuka mbere?',
      en: 'At an unmarked intersection of equal roads with no traffic signs or police officer, who has the right of way?',
      fr: 'À une intersection de routes d\'égale importance sans signalisation ni agent, qui a la priorité?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Ikinyabiziga gituruka ibumoso',
          en: 'The vehicle coming from the left',
          fr: 'Le véhicule venant de la gauche',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Ikinyabiziga gituruka iburyo (Itegeko ry\'uburyo)',
          en: 'The vehicle approaching from the right (Priority to the right)',
          fr: 'Le véhicule venant de la droite (Priorité à droite)',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Ikinyabiziga gifite umuvuduko munini',
          en: 'The vehicle traveling at higher speed',
          fr: 'Le véhicule qui roule le plus vite',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Ikinyabiziga kinini cyane kurusha ibindi',
          en: 'The largest vehicle',
          fr: 'Le véhicule le plus volumineux',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Ku masangano yose adafite ibyapa cyangwa amatara agenga gutambuka, itegeko rusange rigenga umuhanda mu Rwanda ritegeka ko ugomba guha inzira ikinyabiziga kiguturutse iburyo.',
      en: 'Under general Rwandan road traffic law, at uncontrolled intersections where no priority signs exist, traffic approaching from the right always has priority (priorité à droite).',
      fr: 'En l\'absence de signalisation spécifique ou d\'agent, la priorité appartient toujours au conducteur venant de droite.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 18",
    difficulty: 'easy',
  },
  {
    id: 'q-2',
    category: 'ibyapa',
    question: {
      rw: 'Iki cyapa cya STOP (B2) gisobanura iki ku mushoferi uhageze?',
      en: 'What does this STOP sign (B2) mandate when approaching an intersection?',
      fr: 'Que signifie ce panneau STOP (B2) pour un conducteur arrivant à l\'intersection?',
    },
    signCode: 'B2',
    signSvgType: 'stop',
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Kugabanya umuvuduko gusa ugakomeza niba nta modoka ihari',
          en: 'Only slowing down and continuing if no cars are visible',
          fr: 'Ralentir simplement et passer si aucune voiture n\'est visible',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Guhagarara burundu ku murongo wo guhagararaho no guha inzira ibinyabiziga byose',
          en: 'Complete mandatory stop at the line and yield to all intersecting traffic',
          fr: 'Arrêt absolu obligatoire à la ligne et céder le passage à tous les véhicules',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Guhagarara gusa ninjoro cyangwa mu gihe cy\'imvura',
          en: 'Stopping only at night or during heavy rainfall',
          fr: 'Arrêt uniquement la nuit ou par temps pluvieux',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Kuvuza ihoni mbere yo gutambuka',
          en: 'Honking the horn before crossing the road',
          fr: 'Klaxonner avant de franchir l\'intersection',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Icyapa cya STOP gitegeka guhagarara burundu ku murongo wo guhagararaho, ndetse no guha inzira ibinyabiziga byose bigendera mu muhanda ugiye kwinjiramo, n\'iyo waba ubona nta modoka ihari mbere.',
      en: 'The STOP sign mandates a full mechanical stop at the designated line, regardless of traffic density, and yielding to all cross-traffic.',
      fr: 'Le panneau STOP exige un arrêt mécanique complet et absolu à la ligne, et l\'obligation de céder le passage à tous les usagers prioritaires.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 31",
    difficulty: 'easy',
  },
  {
    id: 'q-3',
    category: 'amategeko',
    question: {
      rw: 'Umuvuduko ntarengwa rusange wemewe ku modoka nto zigenewe gutwara abantu mu nsisiro (mu mugi) mu Rwanda ni uwuhe igihe nta cyapa kibugabanya?',
      en: 'What is the default maximum speed limit for passenger cars within built-up urban areas in Rwanda when no sign states otherwise?',
      fr: 'Quelle est la limitation de vitesse générale pour les voitures de tourisme en agglomération au Rwanda en l\'absence de panneau contraire?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: '40 km/h',
          en: '40 km/h',
          fr: '40 km/h',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: '60 km/h',
          en: '60 km/h',
          fr: '60 km/h',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: '50 km/h',
          en: '50 km/h',
          fr: '50 km/h',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: '80 km/h',
          en: '80 km/h',
          fr: '80 km/h',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Mu nsisiro (agglomération), umuvuduko ntarengwa rusange mu mategeko y\'u Rwanda ku modoka nto ni 60 km/h, keretse aho ibyapa bibuza bitegetse umuvuduko uri hasi (urugero: 40 km/h).',
      en: 'In Rwanda, the general statutory speed limit inside built-up areas (insisiro) is 60 km/h, unless otherwise indicated by signs (such as 40 km/h zones).',
      fr: 'Au Rwanda, la vitesse maximale générale autorisée en agglomération est fixée à 60 km/h, à moins qu\'une signalisation locale ne prévoie une vitesse inférieure.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 12",
    difficulty: 'medium',
  },
  {
    id: 'q-4',
    category: 'amategeko',
    question: {
      rw: 'Umuvuduko ntarengwa wemewe hanze y\'insisiro (ku mihanda yo mu ntara) ku modoka nto zitagejeje kuri toni 3.5 ni uwuhe?',
      en: 'What is the standard maximum speed limit outside built-up areas for light passenger cars (under 3.5 tons)?',
      fr: 'Quelle est la vitesse maximale autorisée hors agglomération pour les véhicules légers (moins de 3,5 tonnes)?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: '80 km/h',
          en: '80 km/h',
          fr: '80 km/h',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: '100 km/h',
          en: '100 km/h',
          fr: '100 km/h',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: '70 km/h',
          en: '70 km/h',
          fr: '70 km/h',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: '120 km/h',
          en: '120 km/h',
          fr: '120 km/h',
        },
      },
    ],
    correctAnswerId: 'opt-a',
    explanation: {
      rw: 'Hanze y\'insisiro ku mihanda ya leta mu Rwanda, umuvuduko ntarengwa rusange ku modoka nto ni 80 km/h.',
      en: 'Outside built-up areas, the default statutory speed limit on Rwandan national roads is 80 km/h for passenger cars.',
      fr: 'Hors agglomération sur le réseau routier rwandais, la vitesse maximale autorisée pour les voitures particulières est de 80 km/h.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 12",
    difficulty: 'medium',
  },
  {
    id: 'q-5',
    category: 'ibyapa',
    question: {
      rw: 'Iki cyapa (C3) kigaragaza imodoka ebyiri zegeranye mu ruziga rw\'umutuku gisobanura iki?',
      en: 'What does sign C3 (showing two side-by-side cars inside a red circle) mean?',
      fr: 'Que signifie le panneau C3 (deux voitures côte à côte dans un cercle rouge)?',
    },
    signCode: 'C3',
    signSvgType: 'no_overtaking',
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Umuhanda ugendwamo n\'imodoka ebyiri icyarimwe',
          en: 'Road suitable for two vehicles side-by-side',
          fr: 'Chaussée à deux voies de circulation',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Birabujijwe ko ibinyabiziga bifite moteri binyuranaho',
          en: 'No overtaking allowed for motor vehicles',
          fr: 'Interdiction de dépasser pour tous les véhicules à moteur',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Aho guhurira kw\'imodoka ziturutse imbere',
          en: 'Meeting point for oncoming vehicles',
          fr: 'Croisement de véhicules en sens opposé',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Umuhanda wihariye w\'imodoka zigurishwa',
          en: 'Special lane for motor dealerships',
          fr: 'Voie réservée aux concessionnaires automobiles',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Icyapa C3 kibuzanya kunyuranaho ku binyabiziga bifite moteri birenze ku bindi binyabiziga bifite moteri, keretse amapikipiki adafite akanyabiziga ku ruhande cyangwa amagare.',
      en: 'Sign C3 strictly prohibits motor vehicles from overtaking other four-wheeled motor vehicles.',
      fr: 'Le signal C3 interdit tout dépassement de véhicules à moteur à deux files ou plus par un autre véhicule à moteur.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 37",
    difficulty: 'easy',
  },
  {
    id: 'q-6',
    category: 'umutekano',
    question: {
      rw: 'Mu gihe imodoka yawe ipfiriye mu muhanda hanze y\'insisiro, icyapa cy\'umutekano (Triangle de pré-signalisation) kigomba gushyirwa inyuma yayo ku ntera ingana iki nibura?',
      en: 'When your vehicle breaks down on an open road outside a built-up area, at what minimum distance behind must the hazard warning triangle be placed?',
      fr: 'En cas de panne de véhicule hors agglomération, à quelle distance minimale derrière le véhicule le triangle de présignalisation doit-il être placé?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Metero 10 nibura',
          en: 'At least 10 meters',
          fr: 'Au moins 10 mètres',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Metero 30 nibura',
          en: 'At least 30 meters',
          fr: 'Au moins 30 mètres',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Metero 50 nibura',
          en: 'At least 50 meters',
          fr: 'Au moins 50 mètres',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Metero 100 nibura',
          en: 'At least 100 meters',
          fr: 'Au moins 100 mètres',
        },
      },
    ],
    correctAnswerId: 'opt-c',
    explanation: {
      rw: 'Itegeko ritegeka ko hanze y\'insisiro, ikimenyetso cy\'umutekano (triyangle) gishyirwa nibura muri metero 50 inyuma y\'ikinyabiziga gihagaze ku buryo kibonwa na kure n\'abandi bashoferi (mu mugi cyangwa mu nsisiro ni nibura metero 30).',
      en: 'Outside built-up areas, the emergency triangle must be placed at least 50 meters behind the disabled vehicle so approaching drivers have ample warning. Inside built-up areas, it is at least 30 meters.',
      fr: 'Hors agglomération, le triangle de danger doit être disposé à une distance minimale de 50 mètres en amont du véhicule accidenté ou en panne (30 mètres en agglomération).',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 48",
    difficulty: 'medium',
  },
  {
    id: 'q-7',
    category: 'amategeko',
    question: {
      rw: 'Ku masangano azengurutswe (Rond-point / Carrefour à sens giratoire), ni nde ufite uburenganzira bwo gutambuka mbere mu Rwanda?',
      en: 'At a roundabout in Rwanda, who has the right-of-way?',
      fr: 'Dans un carrefour à sens giratoire (rond-point) au Rwanda, qui a la priorité?',
    },
    signCode: 'D3',
    signSvgType: 'roundabout_mandatory',
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Ikinyabiziga kigiye kwinjira muri rond-point giturutse iburyo',
          en: 'The vehicle about to enter from the right',
          fr: 'Le véhicule qui s\'apprête à entrer venant de droite',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Ikinyabiziga kigeze cyangwa kiri mu kayira ka rond-point (kiguturutse ibumoso)',
          en: 'The vehicle already circulating inside the roundabout ring (approaching from your left)',
          fr: 'Le véhicule déjà engagé sur l\'anneau du rond-point (venant de votre gauche)',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Ikinyabiziga gishaka gusohoka ku marembo ya mbere',
          en: 'The vehicle aiming for the first exit',
          fr: 'Le véhicule qui souhaite prendre la première sortie',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Ikinyabiziga gifite uburemere bwinshi',
          en: 'The heaviest vehicle',
          fr: 'Le véhicule ayant le tonnage le plus lourd',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Mu Rwanda, amategeko yerekana ko umushoferi ugiye kwinjira muri rond-point agomba guha inzira ibinyabiziga bimaze kwinjiramo kandi bizenguruka (abamuturuka ibumoso).',
      en: 'In Rwanda, entering vehicles must yield to traffic already navigating the roundabout traffic circle from the left.',
      fr: 'Les conducteurs abordant un giratoire doivent céder le passage à ceux qui circulent déjà sur l\'anneau.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 33",
    difficulty: 'easy',
  },
  {
    id: 'q-8',
    category: 'amategeko',
    question: {
      rw: 'Birabujijwe kunyuranaho (overtaking) ku ruhande rw\'ibumoso mu yihe muri izi miterere?',
      en: 'In which of the following circumstances is overtaking strictly prohibited?',
      fr: 'Dans quelle situation le dépassement est-il formellement interdit?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Hafi y\'umutwe w\'imisozi (ku gasozi) cyangwa mu makoni adafite aho kurebera kure',
          en: 'Near the crest of a hill or in blind curves without clear visibility',
          fr: 'Au sommet d\'une côte ou dans un virage sans visibilité suffisante',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Ku muhanda ugororotse ufite umurongo ucagaguye',
          en: 'On a straight road with broken white line',
          fr: 'Sur une ligne droite avec ligne discontinue',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Ku manywa y\'ihangu mu gihe ijuru rikeye',
          en: 'During clear daytime weather',
          fr: 'En plein jour par temps clair et dégagé',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Iyo ikinyabiziga kigenda munsi y\'umuvuduko wemewe',
          en: 'When the preceding vehicle travels below the limit',
          fr: 'Lorsque le véhicule précédent roule à faible allure',
        },
      },
    ],
    correctAnswerId: 'opt-a',
    explanation: {
      rw: 'Birabujijwe rwose kunyuranaho ku misozi hejuru (crests) cyangwa mu makoni abujije kubona kure, kuko hashobora gutungurana ikinyabiziga gituruka imbere.',
      en: 'Overtaking is forbidden near hill crests and around blind corners where forward visibility is dangerously restricted.',
      fr: 'Tout dépassement est interdit à proximité des sommets de côtes et dans les virages masquant la visibilité vers l\'avant.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 15",
    difficulty: 'medium',
  },
  {
    id: 'q-9',
    category: 'ibyapa',
    question: {
      rw: 'Umurongo wera udahagarara (Ligne blanche continue) waciwe hagati mu muhanda utegeka iki?',
      en: 'What does a solid continuous white line along the center of the road mandate?',
      fr: 'Que signifie une ligne médiane continue sur la chaussée?',
    },
    signCode: 'M1',
    signSvgType: 'road_marking_continuous',
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Ubyemerewe kuwurenga iyo nta modoka iturutse imbere',
          en: 'You may cross it if no oncoming traffic is visible',
          fr: 'Vous pouvez la franchir si aucune voiture n\'arrive en face',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Birabujijwe rwose kuwurenga cyangwa kuwugenderaho mu buryo ubwo ari bwo bwose',
          en: 'It is strictly forbidden to cross or straddle it at any time',
          fr: 'Il est formellement interdit de la franchir ou de la chevaucher',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Ni umurongo wo kugenderaho gusa n\'abanyamaguru',
          en: 'It is reserved exclusively for pedestrian traffic',
          fr: 'Réservée exclusivement aux piétons',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Bikwemerera gukata ugana ibumoso igihe wihuta',
          en: 'It permits making an immediate U-turn if hurried',
          fr: 'Autorise le demi-tour en cas d\'urgence',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Umurongo udahagarara (ligne continue) ntushobora kurengwa cyangwa kugenderwaho na rimwe haba mu gukata cyangwa kunyuranaho.',
      en: 'A solid white line functions as an impenetrable barrier; vehicles must never cross or drive on top of it.',
      fr: 'Une ligne continue ne doit jamais être franchie ni chevauchée, sous peine de sanction grave.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 44",
    difficulty: 'easy',
  },
  {
    id: 'q-10',
    category: 'ibinyabiziga',
    question: {
      rw: 'Ninjoro mu gihe uhuye n\'ikinyabiziga gituruka imbere, ugomba kuzimya amatara maremare (feux de route) ugacana amatara magufi (feux de croisement) ku ntera ya metero zingahe nibura?',
      en: 'At night when meeting an approaching vehicle, at what minimum distance must you dim your high beams to low beams?',
      fr: 'La nuit lors du croisement avec un véhicule venant en sens inverse, à quelle distance minimale devez-vous passer des feux de route aux feux de croisement?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Metero 20',
          en: '20 meters',
          fr: '20 mètres',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Metero 50',
          en: '50 meters',
          fr: '50 mètres',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Metero 100 nibura',
          en: 'At least 100 meters',
          fr: 'Au moins 100 mètres',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Metero 200 nibura',
          en: 'At least 200 meters',
          fr: 'Au moins 200 mètres',
        },
      },
    ],
    correctAnswerId: 'opt-c',
    explanation: {
      rw: 'Ugize aho uhurira n\'undi mushoferi ninjoro, ugomba gushyiraho amatara magufi nibura muri metero 100 mbere yo kumugeraho kugira ngo utamuhuma amaso.',
      en: 'The law requires switching from high beams to low beams at least 100 meters before meeting approaching vehicles to prevent blinding other road users.',
      fr: 'Les conducteurs doivent commuter leurs feux de route en feux de croisement à une distance d\'au moins 100 mètres pour ne pas éblouir autrui.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 41",
    difficulty: 'medium',
  },
  {
    id: 'q-11',
    category: 'ubutabazi',
    question: {
      rw: 'Iyo ugeze aho impanuka ikomeye y\'umuhanda yabereye, ni iki cya mbere kigomba gukorwa mu mategeko n\'amabwiriza y\'ubutabazi?',
      en: 'When arriving at the scene of a serious traffic accident, what is the primary initial step according to safety regulations?',
      fr: 'En arrivant sur le lieu d\'un accident grave de la circulation, quelle est la toute première mesure à prendre?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Kugaburira no guha amazi abakomeretse',
          en: 'Giving food and cold water to injured individuals',
          fr: 'Donner à boire et à manger aux victimes',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Kurinda / Kurengera aho byabereye (Protège) kugira ngo hataba izindi mpanuka no guhamagara ubutabazi (Alerte)',
          en: 'Secure the area to protect from secondary collisions and alert emergency services (Police / Ambulance)',
          fr: 'Protéger la zone de l\'accident pour éviter le suraccident et alerter les secours (112 / SAMU)',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Guterura abakomeretse byihuse ukabajugunya mu yindi modoka nta kwitonda',
          en: 'Immediately moving injured victims into another car without precaution',
          fr: 'Déplacer immédiatement les blessés sans précautions préalables',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Gufata amafoto n\'amashusho yo gushyira kuri WhatsApp',
          en: 'Taking photos and videos to share on social networks',
          fr: 'Prendre des photos et vidéos pour les réseaux sociaux',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Itegeko n\'amahame y\'ubutabazi bisaba: Kurengera (Protège) ngo hataba indi mpanuka yikuba (suraccident), Gutabaza (Alerte: 112 cyangwa SAMU 912), no Gutanga ubutabazi bw\'ibanze (Secours). Ntibemewe guha amazi umuntu wataye ubwenge.',
      en: 'The golden rule of first aid on roads is Protect (prevent secondary crashes with triangles/lights), Alert (call emergency numbers 112 / 912), and Secour (administer first aid). Never give water to unconscious victims.',
      fr: 'La règle fondamentale PAS : Protéger (balisage des lieux), Alerter les secours d\'urgence (112), et Secourir les blessés sans geste inconsidéré.',
    },
    legalReference: "Amabwiriza y'Umutekano n'Ubutabazi mu Muhanda - RNP / Croix-Rouge",
    difficulty: 'easy',
  },
  {
    id: 'q-12',
    category: 'amategeko',
    question: {
      rw: 'Ibinyabiziga bifite ubutumwa bwihariye (Imbangukiragutabaza/Ambulance, Polisi cyangwa Kizimyamoto) bikoresha amahoni yihariye n\'amatara azimya azana, bigomba gutambuka bite?',
      en: 'Priority emergency vehicles (Ambulance, Police, Fire rescue) sounding sirens and flashing emergency lights have which privilege?',
      fr: 'Les véhicules prioritaires d\'urgence (Ambulance, Police, Pompiers) utilisant leur sirène et leurs gyrophares bénéficient de quel droit?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Bagomba guhagarara nk\'abandi ku masangano yose',
          en: 'They must stop like regular cars at all intersections',
          fr: 'Ils doivent marquer l\'arrêt comme tous les autres véhicules',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Bafite uburenganzira bwo gutambuka mbere y\'ibindi binyabiziga byose, abandi bagomba kubarebera inzira bakegera impande',
          en: 'Absolute right-of-way; all other road users must yield and clear the lane',
          fr: 'Priorité absolue de passage; les autres conducteurs doivent dégager la chaussée',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Bafite uburenganzira ku modoka nto gusa, ariko amakamyo ntarebwa n\'iri tegeko',
          en: 'Priority only over light cars, not heavy trucks',
          fr: 'Priorité uniquement sur les petites voitures, pas sur les poids lourds',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Ntibemerewe kurenza 40 km/h',
          en: 'They are restricted to maximum 40 km/h',
          fr: 'Ils ne peuvent pas dépasser la vitesse de 40 km/h',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Iyo ibinyabiziga bitabara bitanze ibimenyetso by\'amatara yihariye n\'amajwi (sirène), umushoferi wese agomba gukuraho ikinyabiziga cye no guhita atanga inzira ako kanya.',
      en: 'When emergency vehicles operate their audible and visual warning signals, all drivers must yield immediately by clearing the path and pulling over safely.',
      fr: 'Dès qu\'un véhicule prioritaire annonce son approche par ses avertisseurs sonores et lumineux, tout usager doit lui faciliter le passage immédiat.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 20",
    difficulty: 'easy',
  },
  {
    id: 'q-13',
    category: 'amategeko',
    question: {
      rw: 'Birabujijwe guhagarara cyangwa guparikira mu ntera ingana iki mbere cyangwa inyuma y\'amasangano y\'imihanda (carrefours)?',
      en: 'Stopping or parking is prohibited within what minimum distance before or after an intersection?',
      fr: 'À quelle distance minimale d\'un carrefour est-il interdit de s\'arrêter ou de stationner?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Metero 2',
          en: '2 meters',
          fr: '2 mètres',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Metero 5 nibura',
          en: 'At least 5 meters',
          fr: 'Au moins 5 mètres',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Metero 15',
          en: '15 meters',
          fr: '15 mètres',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Metero 50',
          en: '50 meters',
          fr: '50 mètres',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Birabujijwe guparikira cyangwa guhagarara mu ntera iri munsi ya metero 5 utaragera ku masangano cyangwa uvuye mu masangano ngo hatabangamirwa kureba kw\'abandi bashoferi.',
      en: 'Vehicles may not park or stop within 5 meters of an intersection to preserve clear sightlines for drivers navigating turns.',
      fr: 'Le stationnement et l\'arrêt sont interdits à moins de 5 mètres d\'une intersection afin de préserver la visibilité.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 28",
    difficulty: 'medium',
  },
  {
    id: 'q-14',
    category: 'umutekano',
    question: {
      rw: 'Kwambara umukandara w\'umutekano (ceinture de sécurité) bitegetswe ku bande mu modoka mu Rwanda?',
      en: 'Wearing a seatbelt is mandatory for whom in a motor vehicle in Rwanda?',
      fr: 'Le port de la ceinture de sécurité est obligatoire pour qui au Rwanda?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Umushoferi gusa',
          en: 'The driver only',
          fr: 'Le conducteur uniquement',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Umushoferi n\'umugenzi wicaye imbere iruhande rwe',
          en: 'Driver and front-seat passenger',
          fr: 'Le conducteur et le passager avant',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Umushoferi n\'abagenzi bose bicaranye mu kinyabiziga aho imikandara yateganyijwe',
          en: 'Driver and all vehicle occupants where seatbelts are fitted',
          fr: 'Le conducteur et tous les passagers aux places équipées',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Abagenzi bari mu rugendo rwa kure gusa',
          en: 'Only passengers on long distance trips',
          fr: 'Uniquement les passagers effectuant de longs trajets',
        },
      },
    ],
    correctAnswerId: 'opt-c',
    explanation: {
      rw: 'Amategeko y\'umutekano mu muhanda ategeka ko umushoferi ndetse n\'abagenzi bose bagomba kwambara umukandara w\'umutekano aho imyanya ifite imikandara mu kinyabiziga cyose kigenda mu muhanda.',
      en: 'Rwandan road safety legislation requires both the driver and all occupants seated in positions equipped with seat belts to fasten them whenever the vehicle is in motion.',
      fr: 'Le port de la ceinture de sécurité est strictement obligatoire pour le conducteur ainsi que pour tous les passagers.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 49",
    difficulty: 'easy',
  },
  {
    id: 'q-15',
    category: 'ibisabwa',
    question: {
      rw: 'Kugira ngo umuntu atsindire ikizamini cy\'uruhushya rw\'agateganyo (Provisoire) rwo gutwara ibinyabiziga mu Rwanda, agomba kugira nibura amanota angahe?',
      en: 'To pass the official provisional driving license exam (Provisoire) conducted in Rwanda, what is the minimum required passing score?',
      fr: 'Pour réussir l\'examen théorique officiel du permis provisoire au Rwanda, quel est le score minimal requis?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: '10 kuri 20 (50%)',
          en: '10 out of 20 (50%)',
          fr: '10 sur 20 (50%)',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: '12 kuri 20 (60%)',
          en: '12 out of 20 (60%)',
          fr: '12 sur 20 (60%)',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: '15 kuri 20 (75%)',
          en: '15 out of 20 (75%)',
          fr: '15 sur 20 (75%)',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: '18 kuri 20 (90%)',
          en: '18 out of 20 (90%)',
          fr: '18 sur 20 (90%)',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Ikizamini cya Polisi y\'u Rwanda (RNP) cya Provisoire kiba kigizwe n\'ibibazo 20 mu minota 20. Amanota yo gutsinda ni 12 kuri 20 (60%) kuzamura.',
      en: 'The Rwanda National Police (RNP) provisional test consists of 20 questions in 20 minutes. The official passing grade is a minimum of 12 out of 20 (60%).',
      fr: 'L\'examen officiel de la Police Nationale (RNP) comporte 20 questions à choix multiples en 20 minutes. Le seuil de réussite est de 12 sur 20 (60%).',
    },
    legalReference: "Amabwiriza ya Polisi y'u Rwanda Ishami rishinzwe Umutekano wo mu Muhanda (RNP Traffic)",
    difficulty: 'easy',
  },
  {
    id: 'q-16',
    category: 'amategeko',
    question: {
      rw: 'Uruhushya rw\'agateganyo rwo gutwara ibinyabiziga (Permis Provisoire) rumara igihe kingana iki mbere y\'uko rurangiza igihe?',
      en: 'How long is a Rwandan provisional driving permit (Permis Provisoire) valid before expiration?',
      fr: 'Quelle est la durée de validité du permis de conduire provisoire au Rwanda?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Amezi 3 gusa',
          en: '3 months only',
          fr: '3 mois seulement',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Amezi 6 (ukwezi gutandatu)',
          en: '6 months',
          fr: '6 mois',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Umwaka 1 (Amezi 12)',
          en: '1 year (12 months)',
          fr: '1 an (12 mois)',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Imyaka 2',
          en: '2 years',
          fr: '2 ans',
        },
      },
    ],
    correctAnswerId: 'opt-c',
    explanation: {
      rw: 'Uruhushya rw\'agateganyo rwo gutwara ikinyabiziga rumara umwaka umwe (amezi 12) uhereye umunsi rwatangiweho, muri icyo gihe umuntu akora imyitozo akayatsinda mbere y\'uko rurangira.',
      en: 'A provisional driving permit in Rwanda is valid for exactly one year (12 months) from the date of issuance.',
      fr: 'Le permis provisoire a une durée de validité d\'un an (12 mois) à compter de sa date de délivrance.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 5",
    difficulty: 'medium',
  },
  {
    id: 'q-17',
    category: 'ibyapa',
    question: {
      rw: 'Icyapa gifite ishusho ya mpandeshatu ifite urubavu rutukura kiranga iki mu mategeko y\'umuhanda?',
      en: 'What does a triangular sign with a red border signify in traffic law?',
      fr: 'Que signale un panneau triangulaire bordé de rouge dans le code de la route?',
    },
    signCode: 'A1',
    signSvgType: 'danger_bend_right',
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Icyapa kiburira ibyago / amakenga (Panneau de danger)',
          en: 'A danger / warning sign',
          fr: 'Un signal de danger / avertissement',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Icyapa gitegeka ibyo ugomba gukora',
          en: 'A mandatory instruction sign',
          fr: 'Un signal d\'obligation impérative',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Icyapa cyerekana amakuru n\'ubuyobozi',
          en: 'An information / directory sign',
          fr: 'Un panneau d\'indication ou de direction',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Icyapa cyo guparikiraho',
          en: 'A parking zone sign',
          fr: 'Un panneau de stationnement',
        },
      },
    ],
    correctAnswerId: 'opt-a',
    explanation: {
      rw: 'Ibyapa byose byo mu cyiciro cya \'A\' bifite ishusho ya mpandeshatu ifite urubavu rutukura biba ari ibyapa biburira ibyago (signaux de danger), bikamenyesha umushoferi ko agomba kugabanya umuvuduko akitonza.',
      en: 'Triangular road signs featuring a red border belong to the warning category (Category A), alerting drivers to road hazards ahead.',
      fr: 'Les panneaux triangulaires à bord rouge sont des signaux d\'avertissement de danger invitant à la prudence et au ralentissement.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 23",
    difficulty: 'easy',
  },
  {
    id: 'q-18',
    category: 'ibinyabiziga',
    question: {
      rw: 'Umuvuduko ntarengwa wemewe mu gukurura ikindi kinyabiziga gipfuye (Remorquage / Towing) mu muhanda ni uwuhe?',
      en: 'What is the maximum legal speed when towing another disabled vehicle on the road in Rwanda?',
      fr: 'Quelle est la vitesse maximale autorisée lors du remorquage d\'un véhicule en panne?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: '25 km/h',
          en: '25 km/h',
          fr: '25 km/h',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: '40 km/h',
          en: '40 km/h',
          fr: '40 km/h',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: '50 km/h',
          en: '50 km/h',
          fr: '50 km/h',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: '60 km/h',
          en: '60 km/h',
          fr: '60 km/h',
        },
      },
    ],
    correctAnswerId: 'opt-a',
    explanation: {
      rw: 'Itegeko ritegeka ko mu gihe ikinyabiziga gikurura ikindi gipfuye (remorquage), umuvuduko utagomba kurenza 25 km mu isaha kubera impamvu zo kwirinda ko feri n\'umugozi bidahura neza bigateza impanuka.',
      en: 'Under Rwandan traffic code, towing a disabled motor vehicle may never exceed 25 km/h for braking and hitch stability safety reasons.',
      fr: 'Le remorquage d\'un véhicule en panne ne peut en aucun cas s\'effectuer à une vitesse supérieure à 25 km/h.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 53",
    difficulty: 'hard',
  },
  {
    id: 'q-19',
    category: 'amategeko',
    question: {
      rw: 'Iyo umushoferi agiye gukata ibumoso mu muhanda ugendwamo mu byerekezo byombi, agomba gufata hehe mu muhanda?',
      en: 'When preparing to turn left on a two-way two-lane road, where should the driver position their vehicle?',
      fr: 'Pour tourner à gauche sur une chaussée à double sens de circulation, quelle position doit adopter le conducteur?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Kuguma mu ruhande rw\'iburyo kure cyane no kwinjira gitumo',
          en: 'Staying far on the extreme right and cutting across abruptly',
          fr: 'Rester tout à droite et couper brutalement',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Kwegera umurongo ugabanya umuhanda hagati nta kuwurenga, ukareka ibituruka imbere bigatambuka mbere yo gukata',
          en: 'Approach the center dividing line without crossing it, and yield to oncoming vehicles before turning',
          fr: 'Se rapprocher de l\'axe médian sans le franchir et céder le passage aux véhicules venant en sens inverse',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Kwinjira mu mwanya w\'ibinyabiziga bituruka imbere mbere y\'igihe',
          en: 'Entering the opposite lane ahead of time',
          fr: 'Prendre la voie opposée par anticipation',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Kuvuza ihoni ukanyuramo vuba na bwangu',
          en: 'Honking and speeding across without stopping',
          fr: 'Klaxonner et accélérer rapidement',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Gukata ibumoso bisaba: gucana ikimenyetso (clignotant), kwegera umurongo ugabanya imihanda hagati utawurenze, no guha inzira ibinyabiziga bituruka imbere mbere yo gufata umuhanda w\'ibumoso.',
      en: 'To turn left on a two-way road: activate indicator, move toward the centerline without encroaching upon oncoming traffic, yield to oncoming cars, and complete the turn.',
      fr: 'Le conducteur doit signaler sa manœuvre, se rabattre près de l\'axe sans empiéter sur le sens adverse, céder le passage et tourner en sécurité.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 16",
    difficulty: 'medium',
  },
  {
    id: 'q-20',
    category: 'ubutabazi',
    question: {
      rw: 'Iyo umuntu yagize impanuka ya moto akagwa hasi ariko agahumeka, kuki bibujijwe kumukuramo ingofero y\'umutekano (casque)?',
      en: 'Why is it strictly forbidden for an untrained bystander to remove a fallen motorcyclist\'s crash helmet if they are breathing?',
      fr: 'Pourquoi est-il interdit d\'enlever le casque d\'un motocycliste accidenté s\'il respire?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Kuko ingofero iba ihenze cyane',
          en: 'Because helmets are expensive',
          fr: 'Parce que le casque a de la valeur marchande',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Kuko bishobora gukomeretsa cyangwa gucana uruti rw\'umugongo n\'ijosi bikamutera kumugara burundu',
          en: 'Because it can aggravate spinal cord or neck fractures, causing permanent paralysis or death',
          fr: 'Parce que cela risque d\'aggraver une fracture cervicale et provoquer une tétraplégie',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Kuko Polisi igomba kubanza kuza kuyifotoraho',
          en: 'Because police need to photograph the helmet first',
          fr: 'Parce que la police doit d\'abord la photographier',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Kuko bituma arushaho kugira imbeho',
          en: 'Because it makes the victim colder',
          fr: 'Parce que cela provoque une baisse de température',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Kugira ngo wirinde gukomeretsa urwungano rw\'umugongo n\'ijosi (cervical spine), ntiwemerewe gukuramo ingofero umunyamoto wagezweho n\'impanuka keretse abaganga babihuguriwe cyangwa niba abuze umwuka rwose.',
      en: 'Removing a helmet may twist broken neck vertebrae and sever the spinal cord. Only trained emergency medical responders should perform helmet removal when strictly necessary.',
      fr: 'Tout mouvement imprudent de la tête risque de sectionner la moelle épinière au niveau cervical, provoquant une paralysie irréversible ou le décès.',
    },
    legalReference: "Amabwiriza y'Ubutabazi bw'Ibanze ku Banyamaguru na Moto",
    difficulty: 'easy',
  },
  {
    id: 'q-21',
    category: 'amategeko',
    question: {
      rw: 'Ni iyihe myaka fatizo fatizo y\'ubukure isabwa kugira ngo umwenegihugu yemererwe gukorera uruhushya rwo gutwara ikinyabiziga cyo mu cyiciro B mu Rwanda?',
      en: 'What is the minimum age requirement to obtain a Category B driving license in Rwanda?',
      fr: 'Quel est l\'âge minimum requis pour obtenir le permis de conduire de catégorie B au Rwanda?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Imyaka 16',
          en: '16 years',
          fr: '16 ans',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Imyaka 18 y\'amavuko',
          en: '18 years of age',
          fr: '18 ans révolus',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Imyaka 20',
          en: '20 years',
          fr: '20 ans',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Imyaka 21',
          en: '21 years',
          fr: '21 ans',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Mu mategeko y\'u Rwanda, umuntu agomba kuba yujuje nibura imyaka 18 y\'amavuko kugira ngo yemererwe gukora ikizamini cyo gutwara ikinyabiziga cyo mu cyiciro B (imodoka nto zagenewe gutwara abantu cyangwa imizigo itarenze toni 3.5).',
      en: 'Rwandan law establishes 18 years as the minimum age for obtaining a Category B driving license.',
      fr: 'Au Rwanda, l\'âge légal requis pour passer l\'examen du permis de catégorie B est de 18 ans révolus.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 4",
    difficulty: 'easy',
  },
  {
    id: 'q-22',
    category: 'ibyapa',
    question: {
      rw: 'Icyapa kirimo uruziga rw\'ubururu gifite akamenyetso k\'umweru gisobanura iki muri rusange?',
      en: 'What does a circular blue sign with white symbols signify in general?',
      fr: 'Que signifie généralement un panneau circulaire bleu avec symbole blanc?',
    },
    signCode: 'D1',
    signSvgType: 'straight_only',
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Icyapa kiburira ibyago',
          en: 'A danger warning sign',
          fr: 'Un signal de danger',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Icyapa gitegeka (Obligation)',
          en: 'A mandatory instruction sign',
          fr: 'Un panneau d\'obligation formelle',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Icyapa kibuza (Interdiction)',
          en: 'A prohibitory sign',
          fr: 'Un signal d\'interdiction',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Icyapa cyerekana sitasiyo ya essance',
          en: 'A gas station sign',
          fr: 'Un panneau de station-service',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Ibyapa byo mu cyiciro cya D bifite uruziga rw\'ubururu n\'ishusho y\'umweru biba ari ibyapa bitegeka (signaux d\'obligation). Urugero: kwerekeza aho icyerekezo cyerekana gusa.',
      en: 'Circular blue signs with white pictograms belong to category D and constitute mandatory obligation signs.',
      fr: 'Les signaux circulaires à fond bleu et symboles blancs sont des panneaux d\'obligation stricte.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 38",
    difficulty: 'easy',
  },
  {
    id: 'q-23',
    category: 'amategeko',
    question: {
      rw: 'Birabujijwe guhagarara no guparikira hafi y\'aho bategereza bisi (Arrêt de bus) mu ntera ingana iki impande zombi?',
      en: 'Within what distance on either side of an official public bus stop is stopping and parking prohibited for other vehicles?',
      fr: 'À quelle distance d\'un arrêt de bus est-il interdit aux autres usagers de stationner de chaque côté?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Metero 5',
          en: '5 meters',
          fr: '5 mètres',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Metero 15 nibura impande zombi',
          en: 'At least 15 meters on both sides',
          fr: 'Au moins 15 mètres de part et d\'autre',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Metero 30',
          en: '30 meters',
          fr: '30 mètres',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Nta ntera iteganyijwe',
          en: 'No distance specified',
          fr: 'Aucune distance imposée',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Umutekano wo mu muhanda ubuzanya guhagarara cyangwa guparikira mu ntera ya metero 15 mbere n\'inyuma y\'ikimenyetso cy\'aho bisi zihagarara kugira ngo abagenzi bamanuke kandi binjire mu mutekano busesuye.',
      en: 'To allow bus passengers safe boarding and prevent gridlock, private cars may not stop or park within 15 meters on either side of designated bus stops.',
      fr: 'L\'arrêt et le stationnement de véhicules tiers sont interdits à moins de 15 mètres de part et d\'autre des arrêts d\'autobus.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 29",
    difficulty: 'hard',
  },
  {
    id: 'q-24',
    category: 'umutekano',
    question: {
      rw: 'Iyo umuvuduko w\'ikinyabiziga wikubye kabiri (urugero uvuye kuri 30 ukagera kuri 60 km/h), intera yo guhagarara (Distance de freinage) yikuba kangahe?',
      en: 'When the speed of a vehicle doubles (e.g., from 30 km/h to 60 km/h), by how many times does the braking distance increase?',
      fr: 'Lorsque la vitesse d\'un véhicule est multipliée par deux (ex. de 30 à 60 km/h), par combien est multipliée la distance de freinage?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Yikuba kabiri (x2)',
          en: 'It doubles (x2)',
          fr: 'Elle double (x2)',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Yikuba kane (x4)',
          en: 'It quadruples (x4)',
          fr: 'Elle est multipliée par quatre (x4)',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Igomba kuguma uko yanganaga',
          en: 'It remains unchanged',
          fr: 'Elle reste rigoureusement identique',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Yikuba inshuro umunani (x8)',
          en: 'It multiplies by eight (x8)',
          fr: 'Elle est multipliée par huit (x8)',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Ingufu z\'umuvuduko (énergie cinétique) zikurikirana na karé y\'umuvuduko (v²). Bityo iyo umuvuduko wikubye kabiri, intera feri ifataho yikuba inshuro enye (4), bikaba ari nayo mpamvu kugabanya umuvuduko ari ngombwa mu kwirinda impanuka.',
      en: 'Kinetic energy increases with the square of velocity (E = 0.5 * m * v²). Therefore, doubling vehicle speed quadruples (x4) the braking distance required to stop.',
      fr: 'La distance de freinage varie avec le carré de la vitesse. Doubler l\'allure multiplie par quatre la distance nécessaire pour immobiliser le véhicule.',
    },
    legalReference: "Ubumenyi bw'Ibinyabiziga n'Umutekano wo mu Muhanda",
    difficulty: 'medium',
  },
  {
    id: 'q-25',
    category: 'amategeko',
    question: {
      rw: 'Igipimo cy\'inzoga mu maraso kitemewe kurenzwa n\'umushoferi utwara ikinyabiziga gisanzwe mu Rwanda ni ikihe?',
      en: 'What is the maximum legal blood alcohol concentration (BAC) permitted for a general driver in Rwanda?',
      fr: 'Quel est le taux maximal d\'alcoolémie autorisé dans le sang pour un conducteur ordinaire au Rwanda?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: '0.8 g/l (garama 0.8 kuri litiro y\'amaraso)',
          en: '0.8 g/l (0.8 grams per liter of blood)',
          fr: '0,8 g/l de sang',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: '1.5 g/l',
          en: '1.5 g/l',
          fr: '1,5 g/l',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: '2.0 g/l',
          en: '2.0 g/l',
          fr: '2,0 g/l',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Nta rugero rutegetswe igihe cyose utwaye neza',
          en: 'No legal limit as long as you drive safely',
          fr: 'Aucune limite si la conduite reste maîtrisée',
        },
      },
    ],
    correctAnswerId: 'opt-a',
    explanation: {
      rw: 'Mu mategeko y\'u Rwanda, birabujijwe gutwara ikinyabiziga igihe igipimo cy\'inzoga mu maraso kirenze 0.8 g/l ku modoka zisanzwe (ku bashoferi b\'umwuga n\'abatwara abagenzi rusange ni 0.0 g/l). Uwarenze iki gipimo ahanishwa amande ya 150,000 RWF no gufungirwa ikinyabiziga.',
      en: 'In Rwanda, standard drivers may not exceed 0.8 g/l blood alcohol content (and zero tolerance 0.0 g/l for public transport/commercial drivers). Violations carry a mandatory 150,000 RWF fine and vehicle impoundment.',
      fr: 'Le taux d\'alcoolémie maximal toléré est de 0,8 g/l de sang pour les conducteurs ordinaires. L\'infraction entraîne une amende de 150.000 RWF et l\'immobilisation du véhicule.',
    },
    legalReference: "Itegeko ry'Umutekano wo mu Muhanda & Amategeko Mashya ya Polisi",
    difficulty: 'medium',
  },
  {
    id: 'q-26',
    category: 'ibyapa',
    question: {
      rw: 'Umurongo w\'umuhondo udahagarara waciwe ku nkombe y\'umuhanda (ku murongo wo ku ruhande) usobanura iki?',
      en: 'What does a solid yellow line painted along the edge of the roadway or curb mean?',
      fr: 'Que signifie une ligne jaune continue tracée sur le bord de la chaussée ou le trottoir?',
    },
    signCode: 'M3',
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Birabujijwe rwose guhagarara no guparikira aho uwo murongo uri',
          en: 'Stopping and parking are strictly prohibited along this section',
          fr: 'Arrêt et stationnement strictement interdits le long de cette ligne',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Hemerewe guparikira gusa nijoro',
          en: 'Parking allowed only during nighttime',
          fr: 'Stationnement autorisé uniquement de nuit',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Inzira yihariye ya za bisi gusa',
          en: 'Lane reserved exclusively for public buses',
          fr: 'Voie réservée aux bus urbains',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Aho kwambukira abana b\'ishuri gusa',
          en: 'School children crossing area',
          fr: 'Passage réservé aux écoliers',
        },
      },
    ],
    correctAnswerId: 'opt-a',
    explanation: {
      rw: 'Umurongo w\'umuhondo udahagarara waciwe ku nkombe y\'umuhanda ubuzanya rwose guhagarara no guparikira (arrêt et stationnement interdits). Naho iyo ucagaguye uba ubuza guparikira gusa ariko wemera guhagarara akanya gato.',
      en: 'A solid yellow curb line prohibits both stopping and parking at all times. A broken yellow curb line prohibits parking only, but allows brief passenger boarding.',
      fr: 'Une ligne jaune continue sur le bord du trottoir interdit à la fois l\'arrêt et le stationnement.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 46",
    difficulty: 'medium',
  },
  {
    id: 'q-27',
    category: 'umutekano',
    question: {
      rw: 'Iyo umushoferi ahuye n\'ikinyabiziga gituruka imbere ninjoro kigakomeza gucana amatara maremare (feux de route) akamuhuma amaso, agomba gukora iki?',
      en: 'If an oncoming vehicle fails to dim its high beams at night and dazzles your eyes, what is the safest course of action?',
      fr: 'La nuit, si un véhicule venant en face maintient ses feux de route et vous éblouit, quelle est la bonne conduite?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Gucana na we amatara maremare kugira ngo umuhume amaso',
          en: 'Flash high beams back aggressively to blind them in return',
          fr: 'Allumer vos feux de route pour l\'éblouir en représailles',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Kugabanya umuvuduko, ukerekeza amaso ku ruhande rw\'iburyo ku murongo w\'umuhanda',
          en: 'Slow down smoothly and guide your vision by looking toward the white fog line on the right edge',
          fr: 'Ralentir et fixer votre regard vers la ligne blanche du bord droit de la chaussée',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Kufunga amaso ukiruka cyane',
          en: 'Close your eyes and accelerate forward',
          fr: 'Fermer les yeux et accélérer',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Guhita ufata feri gitumo hagati mu muhanda',
          en: 'Slam brakes abruptly in the middle of the road',
          fr: 'Piler brusquement au milieu de la voie',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Mu gihe uhumwe n\'amatara maremare, gabanya umuvuduko kandi ntukitegereze amatara ye; reba ku ruhande rw\'iburyo bwawe hasi ku murongo ukikiye umuhanda kugira ngo ugume mu murongo wawe mu mutekano kugeza atambutse.',
      en: 'Never retaliate by blinding the other driver. Reduce speed, avoid staring directly into the glare, and focus your eyes on the painted edge line on the right shoulder until the car passes.',
      fr: 'Ralentissez et portez votre regard vers la rive droite de la chaussée pour conserver votre trajectoire sans être ébloui.',
    },
    legalReference: "Amabwiriza yo Gutwara Nijoro - Umutekano wo mu Muhanda",
    difficulty: 'easy',
  },
  {
    id: 'q-28',
    category: 'ibisabwa',
    question: {
      rw: 'Ni izihe nyandiko z\'ingenzi umushoferi agomba guhora yitwaje mu kinyabiziga igihe agendera mu muhanda mu Rwanda?',
      en: 'Which essential vehicle and driver documents must always be carried while driving on Rwandan roads?',
      fr: 'Quels documents obligatoires le conducteur doit-il toujours détenir lors de la conduite au Rwanda?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Uruhushya rwo gutwara (Permis), Ikarita y\'umuhondo (Carte jaune), Icyemezo cy\'ubwishingizi (Assurance), n\'Icyemezo cy\'isuzuma ry\'ubuziranenge (Contrôle technique)',
          en: 'Driver\'s License, Vehicle Registration (Carte jaune), Valid Motor Insurance, and Technical Inspection Certificate (Contrôle technique)',
          fr: 'Permis de conduire, Carte jaune (immatriculation), Attestation d\'assurance et Certificat de contrôle technique valide',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Indangamuntu na fotokopi ya pasiporo gusa',
          en: 'National ID card and passport photocopy only',
          fr: 'Carte d\'identité et photocopie du passeport uniquement',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Fagitire y\'aho waguze imodoka gusa',
          en: 'Purchase invoice of the vehicle only',
          fr: 'Facture d\'achat du véhicule uniquement',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Icyemezo cy\'amavuko n\'ikarita y\'itora',
          en: 'Birth certificate and voting card',
          fr: 'Acte de naissance et carte d\'électeur',
        },
      },
    ],
    correctAnswerId: 'opt-a',
    explanation: {
      rw: 'Umushoferi agomba kugira inyandiko 4 z\'ingenzi: 1. Uruhushya rwo gutwara (Permis ikora), 2. Ikarita iranga ikinyabiziga (Carte jaune), 3. Ubwishingizi (Assurance ikora), 4. Icyemezo cy\'isuzuma ry\'ubuziranenge (Contrôle technique iri ku gihe). Kutabitanga ku mupolisi biteza ibihano.',
      en: 'The four statutory motoring documents in Rwanda are: 1. Valid Driving License, 2. Vehicle Registration Logbook (Carte Jaune), 3. Valid Third-Party Insurance, and 4. Up-to-date Mechanical Inspection Certificate (Contrôle Technique).',
      fr: 'Le conducteur doit être en mesure de présenter : permis valide, carte jaune, attestation d\'assurance et vignette de contrôle technique en cours de validité.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 8 & Itegeko ry'Umutekano",
    difficulty: 'easy',
  },
  {
    id: 'q-29',
    category: 'amategeko',
    question: {
      rw: 'Iyo umushoferi ageze ku cyapa kimenyesha ko ahegereye akayira k\'abanyamaguru (Passage pour piétons), maze akahasanga umunyamaguru watangiye kwambuka, asabwa iki?',
      en: 'When approaching a marked pedestrian crossing with a pedestrian already crossing or about to step into it, what is mandatory?',
      fr: 'À l\'approche d\'un passage pour piétons avec un piéton engagé sur la chaussée, quelle est l\'obligation du conducteur?',
    },
    signCode: 'A13',
    signSvgType: 'pedestrian_crossing',
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Kuvuza ihoni ngo umunyamaguru yihute yiruke',
          en: 'Sound the horn to hurry the pedestrian across',
          fr: 'Klaxonner pour forcer le piéton à courir',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Kuhanyura mbere y\'uko uwo munyamaguru agera mu cyerekezo cye',
          en: 'Speed up to cross before the pedestrian reaches your lane',
          fr: 'Accélérer pour passer avant que le piéton n\'arrive',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Guhagarara burundu no guha inzira usesuye umunyamaguru',
          en: 'Stop completely and yield unrestricted right-of-way to the pedestrian',
          fr: 'Marquer l\'arrêt complet et céder la priorité absolue au piéton',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Kugabanya umuvuduko gusa ariko ntuhagarare',
          en: 'Slow down without stopping',
          fr: 'Ralentir sans s\'arrêter',
        },
      },
    ],
    correctAnswerId: 'opt-c',
    explanation: {
      rw: 'Abanyamaguru bafite uburenganzira busesuye bwo gutambuka mbere ku kayira kabo (zebra crossing). Umushoferi wese agomba guhagarara akabaha inzira nta kubavugiriza ihoni cyangwa kubahatira kwiruka.',
      en: 'Pedestrians have absolute legal priority on marked crosswalks. Drivers must come to a stop and let them cross safely without intimidation.',
      fr: 'Les piétons bénéficient d\'une priorité absolue sur les passages protégés; tout conducteur doit s\'arrêter pour leur céder le passage.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 26",
    difficulty: 'easy',
  },
  {
    id: 'q-30',
    category: 'umutekano',
    question: {
      rw: 'Ni ubuhe buryo bwemewe bwo guparikira imodoka ku muhanda ucuramye cyane (umuteremuko cyangwa umuzamuko)?',
      en: 'What is the correct protocol when parking a motor vehicle on a steep downhill or uphill slope?',
      fr: 'Quelle est la procédure réglementaire pour stationner en pente raide (côte ou descente)?',
    },
    options: [
      {
        id: 'opt-a',
        text: {
          rw: 'Kureka imodoka muri point mort ugakoresha feri y\'intoki gusa',
          en: 'Leave the gearbox in neutral and engage only the handbrake',
          fr: 'Laisser au point mort avec le frein à main uniquement',
        },
      },
      {
        id: 'opt-b',
        text: {
          rw: 'Gufata feri y\'intoki, gushyiramo vitesse (ya 1 ku muzamuko cyangwa marche arrière ku miteremuko), no gukata amapine yerekeza ku nkombe (trottoir)',
          en: 'Engage handbrake firmly, engage 1st gear (uphill) or reverse (downhill), and turn steering wheels toward the curb',
          fr: 'Serrer le frein à main, enclencher la 1ère (montée) ou marche arrière (descente), et orienter les roues vers le trottoir',
        },
      },
      {
        id: 'opt-c',
        text: {
          rw: 'Gufungura urugi rw\'imodoka ngo ifate hasi',
          en: 'Leave a car door ajar to create drag',
          fr: 'Laisser une porte ouverte pour bloquer la voiture',
        },
      },
      {
        id: 'opt-d',
        text: {
          rw: 'Gucana amatara y\'umutekano gusa',
          en: 'Turn on hazard warning lights only',
          fr: 'Allumer uniquement les feux de détresse',
        },
      },
    ],
    correctAnswerId: 'opt-b',
    explanation: {
      rw: 'Ku misozi cyangwa ku manuka: 1. Fata feri y\'intoki (frein à main), 2. Shyiramo vitesse ya mbere niba uzamuka cyangwa marche arrière niba umanuka, 3. Kata amapine y\'imbere yerekeze ku nkombe y\'umuhanda kugira ngo n\'iyo feri yadohoka imodoka ifatwe n\'urukuta cyangwa umukingo w\'umuhanda.',
      en: 'When parking on steep inclines: engage the parking brake, lock the transmission in low gear (1st uphill, reverse downhill), and angle wheels toward the curb so accidental rollout is halted.',
      fr: 'Le stationnement en forte pente exige le frein de stationnement serré, une vitesse engagée et les roues braquées vers la bordure du trottoir.',
    },
    legalReference: "Iteka rya Perezida No 85/01, Ingingo ya 30",
    difficulty: 'medium',
  },
];
