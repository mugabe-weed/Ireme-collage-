import { LessonModule } from '../types';

export const LESSON_MODULES: LessonModule[] = [
  {
    id: 'lesson-1',
    title: {
      rw: 'Isomo rya 1: Ibyapa by\'Umuhanda n\'Amoko Yabyo',
      en: 'Lesson 1: Categories and Classification of Road Signs',
      fr: 'Leçon 1: Catégories et Classification des Panneaux Routiers',
    },
    description: {
      rw: 'Sobanukirwa amoko yose y\'ibyapa: ibiburira, ibitegeka, ibibuza, n\'iby\'ubutwererane n\'amabara yabyo.',
      en: 'Understand the distinct geometric shapes, colors, and legal weight of road signs.',
      fr: 'Comprenez les formes, couleurs et forces obligatoires des différents signaux routiers.',
    },
    duration: '15 min',
    sectionsCount: 4,
    chapters: [
      {
        title: {
          rw: '1. Ibyapa Biburira (Signaux de Danger)',
          en: '1. Warning & Danger Signs',
          fr: '1. Signaux d\'avertissement de danger',
        },
        content: {
          rw: 'Ibyapa biburira biba bifite ishusho ya mpandeshatu ifite urubavu rutukura n\'umweru hagati. Bikwereka ko imbere hari icyago ugomba kwitondera (urugero: ikoni rikaze, akayira k\'abanyamaguru, umuhanda unyerera). Bishyirwa muri metero 150 mbere y\'ahantu habi hanze y\'insisiro, no muri metero 50 mu nsisiro.',
          en: 'Warning signs are triangular with a red border and white interior. They alert drivers to impending road hazards (sharp bends, pedestrian crosswalks, slippery asphalt). They are stationed 150m in advance outside built-up areas and 50m within urban zones.',
          fr: 'Les signaux de danger sont triangulaires à bordure rouge. Ils avertissent d\'un risque (virage dangereux, piétons, chaussée glissante) placés à 150m hors agglomération et 50m en ville.',
        },
        signType: 'danger_bend_right',
      },
      {
        title: {
          rw: '2. Ibyapa Bibuza (Signaux d\'Interdiction)',
          en: '2. Prohibitory Signs',
          fr: '2. Signaux d\'interdiction',
        },
        content: {
          rw: 'Ibyapa bibuza biba bifite ishusho y\'uruziga rufite urubavu rutukura. Bivuga ko ikintu runaka kibujijwe rwose (urugero: kurenza 60 km/h, kwinjira, kunyuranaho, kuvuza ihoni). Iri tegeko ritangira kubahirizwa aho icyapa giteye kugeza ku masangano akurikira cyangwa ku cyapa kikirangiza.',
          en: 'Prohibitory signs are circular with a bold red perimeter. They strictly forbid specific maneuvers (e.g. speed limit 60 km/h, no entry, no overtaking, no horn). The prohibition takes effect from the post location until the next intersection or cancellation sign.',
          fr: 'Les panneaux d\'interdiction sont circulaires cerclés de rouge. Ils interdisent formellement certaines actions (vitesse 60, sens interdit, dépassement interdit).',
        },
        signType: 'no_overtaking',
      },
      {
        title: {
          rw: '3. Ibyapa Bitegeka (Signaux d\'Obligation)',
          en: '3. Mandatory Obligation Signs',
          fr: '3. Signaux d\'obligation impérative',
        },
        content: {
          rw: 'Ibyapa bitegeka biba bifite ishusho y\'uruziga rw\'ubururu bufite ikimenyetso cy\'umweru. Bitegeka umushoferi icyerekezo agomba gufata nta yandi mahitamo (urugero: gukata iburyo gusa, gukomeza imbere gusa, kuzenguruka rond-point).',
          en: 'Mandatory signs are circular with a blue background and white pictograms. They order drivers to follow a mandatory instruction (turn right only, continue straight, compulsory roundabout).',
          fr: 'Les panneaux d\'obligation sont ronds à fond bleu et symboles blancs. Ils imposent une direction obligatoire sans alternative.',
        },
        signType: 'straight_only',
      },
    ],
    quickCheck: {
      question: {
        rw: 'Icyapa gifite ishusho y\'uruziga rw\'ubururu kiranga iki?',
        en: 'What does a circular blue sign designate?',
        fr: 'Que désigne un panneau circulaire à fond bleu?',
      },
      options: [
        { id: 'a', text: { rw: 'Icyapa kibuza', en: 'A prohibitory sign', fr: 'Un signal d\'interdiction' } },
        { id: 'b', text: { rw: 'Icyapa gitegeka (Obligation)', en: 'A mandatory sign', fr: 'Un signal d\'obligation' } },
        { id: 'c', text: { rw: 'Icyapa cyo guparikiraho gusa', en: 'A parking zone', fr: 'Un stationnement' } },
      ],
      correctId: 'b',
    },
  },
  {
    id: 'lesson-2',
    title: {
      rw: 'Isomo rya 2: Amategeko yo Gutambuka Mbere & Rond-Point',
      en: 'Lesson 2: Right of Way, Priority & Roundabout Rules',
      fr: 'Leçon 2: Priorité de Passage et Règles des Ronds-Points',
    },
    description: {
      rw: 'Amategeko y\'uburyo (priorité à droite), uko witwara muri rond-point, n\'uburenganzira bw\'imbangukiragutabaza.',
      en: 'Priority to the right, circulating inside roundabouts, and yielding to emergency services.',
      fr: 'Priorité à droite, insertion en giratoire et priorité des véhicules d\'urgence.',
    },
    duration: '20 min',
    sectionsCount: 3,
    chapters: [
      {
        title: {
          rw: '1. Itegeko ry\'Uburyo ku Masangano',
          en: '1. Priority to the Right Principle',
          fr: '1. Principe de priorité à droite',
        },
        content: {
          rw: 'Ku masangano yose adafite ibyapa cyangwa amatara agenga gutambuka, itegeko rusange rigenga umuhanda mu Rwanda ritegeka ko ugomba guha inzira ikinyabiziga kiguturutse iburyo. Niba imodoka iguturutse ibumoso, wowe niyo ufite uburenganzira bwo gutambuka mbere.',
          en: 'At all uncontrolled intersections without priority road signs, lights, or traffic police, drivers must yield to vehicles approaching from the right. If a vehicle approaches from your left, you have right of way.',
          fr: 'À toute intersection dépourvue de signalisation ou d\'agent, la priorité appartient au conducteur venant de droite.',
        },
        signType: 'priority_road',
      },
      {
        title: {
          rw: '2. Kuzenguruka Rond-Point mu Rwanda',
          en: '2. Navigating Rwandan Roundabouts',
          fr: '2. Circulation sur giratoire au Rwanda',
        },
        content: {
          rw: 'Mbere yo kwinjira muri rond-point, ugomba kugabanya umuvuduko no guha inzira ikinyabiziga cyamaze kwinjira mu nzira izenguruka (kiguturutse ibumoso). Koresha ikizimyamwotsi (clignotant) cy\'iburyo mbere yo gusohoka muri rond-point.',
          en: 'Before entering a roundabout, you must yield to vehicles already circulating inside the ring (approaching from your left). Always indicate with your right indicator prior to exiting the roundabout.',
          fr: 'Avant de vous insérer sur un rond-point, cédez le passage aux usagers engagés sur l\'anneau (venant de votre gauche). Actionnez le clignotant droit avant de sortir.',
        },
        signType: 'roundabout_mandatory',
      },
    ],
    quickCheck: {
      question: {
        rw: 'Muri Rond-point mu Rwanda, ni nde uhabwa inzira mbere?',
        en: 'At a roundabout in Rwanda, who must be given right of way?',
        fr: 'Sur un rond-point au Rwanda, à qui doit-on céder le passage?',
      },
      options: [
        { id: 'a', text: { rw: 'Ikinyabiziga kigiye kwinjiramo giturutse iburyo', en: 'Vehicle about to enter from right', fr: 'Véhicule qui s\'apprête à entrer de droite' } },
        { id: 'b', text: { rw: 'Ikinyabiziga kiri muri rond-point (kiguturutse ibumoso)', en: 'Vehicle already circulating inside (from left)', fr: 'Véhicule déjà engagé sur le giratoire (de gauche)' } },
        { id: 'c', text: { rw: 'Ikinyabiziga gifite amahoni menshi', en: 'Vehicle honking loudest', fr: 'Véhicule klaxonnant' } },
      ],
      correctId: 'b',
    },
  },
  {
    id: 'lesson-3',
    title: {
      rw: 'Isomo rya 3: Umuvuduko, Amatara & Umutekano',
      en: 'Lesson 3: Speeds, Lighting & Vehicle Safety Equipment',
      fr: 'Leçon 3: Vitesses, Éclairage et Équipements de Sécurité',
    },
    description: {
      rw: 'Umuvuduko mu nsisiro (60/40 km/h), hanze y\'insisiro (80 km/h), amatara maremare n\'amagufi ninjoro, n\'ibikoresho by\'umutekano.',
      en: 'Speed limits, high beam vs low beam etiquette, hazard triangles, and mandatory seatbelts.',
      fr: 'Vitesses maximales, croisement de nuit, feux et triangle de présignalisation.',
    },
    duration: '18 min',
    sectionsCount: 3,
    chapters: [
      {
        title: {
          rw: '1. Umuvuduko Ntarengwa mu Rwanda',
          en: '1. Speed Limits in Rwanda',
          fr: '1. Limitations de vitesse',
        },
        content: {
          rw: 'Mu nsisiro (mu migi): 60 km/h (cyangwa 40 km/h aho byerekanwe n\'ibyapa). Hanze y\'insisiro ku modoka nto: 80 km/h. Amakamyo n\'amabisi: 60 km/h. Gukurura ikindi kinyabiziga (remorquage): 25 km/h.',
          en: 'Inside built-up areas: 60 km/h (or 40 km/h where marked). Outside built-up areas for light cars: 80 km/h. Trucks and buses: 60 km/h. Towing broken vehicles: 25 km/h.',
          fr: 'En agglomération : 60 km/h (ou 40 km/h signalés). Hors agglomération : 80 km/h (voitures), 60 km/h (camions). Remorquage : 25 km/h.',
        },
        signType: 'speed_limit_60',
      },
      {
        title: {
          rw: '2. Amatara Ninjoro & Gucana Amatara Magufi',
          en: '2. Night Driving & Headlight Dimming',
          fr: '2. Éclairage nocturne et feux de croisement',
        },
        content: {
          rw: 'Ninjoro iyo uhuye n\'ikindi kinyabiziga gituruka imbere, ugomba kuzimya amatara maremare (feux de route) ugacana amatara magufi (feux de croisement) nibura muri metero 100 mbere yo guhura na cyo.',
          en: 'At night when meeting oncoming traffic, you must switch from high beams to low beams at least 100 meters prior to meeting to prevent dangerous visual glare.',
          fr: 'La nuit lors du croisement d\'un usager, commutez vos feux de route en feux de croisement à 100 mètres au moins.',
        },
      },
    ],
    quickCheck: {
      question: {
        rw: 'Ku ntera ya metero zingahe nibura ugomba kuzimya amatara maremare ugacana amatara magufi ninjoro?',
        en: 'At what minimum distance must you dim headlights to low beams when meeting oncoming cars?',
        fr: 'À quelle distance minimale devez-vous passer en feux de croisement la nuit?',
      },
      options: [
        { id: 'a', text: { rw: 'Metero 20', en: '20 meters', fr: '20 mètres' } },
        { id: 'b', text: { rw: 'Metero 50', en: '50 meters', fr: '50 mètres' } },
        { id: 'c', text: { rw: 'Metero 100 nibura', en: 'At least 100 meters', fr: 'Au moins 100 mètres' } },
      ],
      correctId: 'c',
    },
  },
];
