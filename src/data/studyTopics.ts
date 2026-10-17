import { StudyTopic } from '../types';

export const STUDY_TOPICS: StudyTopic[] = [
  {
    id: 'topic-priority',
    title: {
      rw: 'Amategeko yo Gutambuka Mbere ku Masangano',
      en: 'Right of Way & Intersection Priority Rules',
      fr: 'Règles de Priorité aux Intersections',
    },
    summary: {
      rw: 'Itegeko ry\'uburyo (priorité à droite), amasangano azengurutswe (rond-point), n\'ibinyabiziga bitabara.',
      en: 'Priority to the right, roundabouts rules, and emergency service vehicles.',
      fr: 'Priorité à droite, ronds-points et véhicules prioritaires d\'urgence.',
    },
    icon: 'Navigation',
    readTime: '6 min',
    legalCode: "Iteka rya Perezida No 85/01, Ingingo ya 18-22",
    content: {
      rw: [
        'Ku masangano yose adafite ibimenyetso cyangwa umupolisi, ikinyabiziga gituruka iburyo nicyo kigomba gutambuka mbere (Itegeko ry\'uburyo).',
        'Ku masangano azengurutswe (Rond-point), ibinyabiziga bimaze kwinjira mu muhanda uzenguruka nibyo bifite uburenganzira bwo gutambuka mbere y\'ibigiye kwinjiramo.',
        'Iyo ugeze ku cyapa cya STOP (B2), ugomba guhagarara burundu ku murongo wera waciwe hasi, ukareba iburyo n\'ibumoso mbere yo gukomeza.',
        'Iyo ugeze ku cyapa cya Cédez le passage (B1), ugabanya umuvuduko ugaha inzira abanyura mu muhanda ugiye kwinjiramo.',
        'Ibinyabiziga bitabara (Imbangukiragutabaza, Polisi, Kizimyamoto) bikoresha amahoni azwi n\'amatara azimya azana bifite uburenganzira busesuye bwo gutambuka mbere y\'abandi bose.',
      ],
      en: [
        'At all intersections without signs or police signals, vehicles approaching from the right have full right of way (Priority to the Right).',
        'At roundabouts, vehicles already navigating the circulating roadway have absolute priority over entering vehicles.',
        'When encountering a STOP sign (B2), you must bring the vehicle to a full mechanical standstill at the solid stop line before proceeding safely.',
        'At a Give Way / Yield sign (B1), reduce speed and yield to all cross-traffic without a mandatory full stop if clear.',
        'Emergency service vehicles with active sirens and beacons have supreme right-of-way; all road users must clear the roadway immediately.',
      ],
      fr: [
        'Aux intersections sans signalisation, la priorité appartient toujours au conducteur venant de droite.',
        'Sur les carrefours giratoires (ronds-points), les conducteurs circulant sur l\'anneau sont toujours prioritaires.',
        'Au panneau STOP, un arrêt complet à la ligne est impératif avant de s\'engager.',
        'Au panneau Cédez le passage, ralentissez et laissez passer les usagers de la voie prioritaire.',
        'Les véhicules de secours prioritaires (sirènes/gyrophares) ont priorité absolue sur tous les autres usagers.',
      ],
    },
    keyTakeaways: {
      rw: [
        'Nta cyapa = Fata umuvuduko muke kandi uhe inzira uw\'iburyo bwawe.',
        'Muri Rond-point mu Rwanda, uha inzira uw\'ibumoso (uri mu muhanda uzenguruka).',
        'Icyapa cya STOP ntikemerera kureba gusa utahagaze burundu.',
      ],
      en: [
        'No sign present = Slow down and yield to traffic on your right.',
        'At Rwanda roundabouts, yield to vehicles on your left already in the circle.',
        'STOP sign requires an absolute physical stop, never a rolling stop.',
      ],
      fr: [
        'Sans panneau = Priorité absolue à droite.',
        'Au rond-point au Rwanda = Priorité aux véhicules circulant à gauche sur l\'anneau.',
        'Le panneau STOP impose un arrêt mécanique total.',
      ],
    },
  },
  {
    id: 'topic-speed',
    title: {
      rw: 'Umuvuduko Ntarengwa n\'Imipaka y\'Umuvuduko mu Rwanda',
      en: 'Speed Limits & Regulatory Speeds in Rwanda',
      fr: 'Limitations et Réglementations de Vitesse au Rwanda',
    },
    summary: {
      rw: 'Umuvuduko mu nsisiro (60 km/h cyangwa 40 km/h), hanze y\'insisiro (80 km/h), n\'umuvuduko wo gukurura ibinyabiziga (25 km/h).',
      en: 'Urban built-up speeds (40-60 km/h), highway speeds (80 km/h), and towing limits (25 km/h).',
      fr: 'Vitesse en agglomération (40-60 km/h), hors agglomération (80 km/h) et remorquage (25 km/h).',
    },
    icon: 'Gauge',
    readTime: '5 min',
    legalCode: "Iteka rya Perezida No 85/01, Ingingo ya 12-14",
    content: {
      rw: [
        'Umuvuduko ntarengwa rusange mu nsisiro (mu migi n\'aho abantu batuye) ku modoka nto ni 60 km/h, ariko henshi mu bice byihariye bya Kigali n\'ibindi bigo bishyirwa kuri 40 km/h.',
        'Hanze y\'insisiro ku mihanda ya leta, umuvuduko ntarengwa ku modoka nto ni 80 km/h.',
        'Amakamyo n\'ibinyabiziga binini birenga toni 3.5 n\'ibitwara abagenzi mu buryo rusange ntibigomba kurenza 60 km/h hanze y\'insisiro.',
        'Mu gihe cyo gukurura ikindi kinyabiziga gipfuye (remorquage), umuvuduko ntugomba kurenza 25 km/h.',
        'Umushoferi agomba guhuza umuvuduko n\'imiterere y\'ikirere (imvura, igihu), amakoni, n\'umubare w\'abanyamaguru mu muhanda.',
      ],
      en: [
        'General statutory speed limit inside built-up areas is 60 km/h, reduced to 40 km/h in school, hospital, and dense commercial zones.',
        'Outside built-up areas on paved national highways, light passenger cars may travel up to 80 km/h.',
        'Heavy goods vehicles (over 3.5 tonnes) and commercial buses are limited to 60 km/h outside urban areas.',
        'When towing another motor vehicle (remorquage), speed must never exceed 25 km/h.',
        'Drivers must always adapt speed to weather, visibility, road conditions, and pedestrian traffic.',
      ],
      fr: [
        'La vitesse maximale générale en agglomération est de 60 km/h (abaissée à 40 km/h dans les zones signalées).',
        'Hors agglomération, la vitesse maximale autorisée pour les voitures particulières est de 80 km/h.',
        'Les véhicules lourds (> 3,5 t) et transports en commun sont bridés à 60 km/h hors agglomération.',
        'Le remorquage d\'un véhicule en panne ne doit jamais excéder 25 km/h.',
        'La vitesse doit constamment être adaptée aux aléas climatiques et à la visibilité.',
      ],
    },
    keyTakeaways: {
      rw: [
        'Insisiro = 60 km/h (cyangwa 40 km/h aho byanditse).',
        'Hanze y\'insisiro = 80 km/h ku modoka zisanzwe.',
        'Gukurura ikinyabiziga = 25 km/h gusa.',
      ],
      en: [
        'Urban areas = 60 km/h default (40 km/h where marked).',
        'Open highway = 80 km/h for standard cars.',
        'Vehicle towing = 25 km/h strict maximum.',
      ],
      fr: [
        'Agglomération = 60 km/h (40 km/h si panneaux).',
        'Hors agglomération = 80 km/h.',
        'Remorquage = 25 km/h maximum.',
      ],
    },
  },
  {
    id: 'topic-overtaking',
    title: {
      rw: 'Amategeko yo Kunyuranaho (Dépassement)',
      en: 'Safe Overtaking Regulations & Prohibitions',
      fr: 'Règles et Interdictions de Dépassement',
    },
    summary: {
      rw: 'Aho byemewe n\'aho bibujijwe rwose kurenza ku kindi kinyabiziga, n\'ibisabwa mbere yo kunyuranaho.',
      en: 'Where overtaking is permitted vs strictly prohibited, and preliminary safety checks.',
      fr: 'Zones autorisées et proscrites pour dépasser, et contrôles obligatoires.',
    },
    icon: 'Shuffle',
    readTime: '4 min',
    legalCode: "Iteka rya Perezida No 85/01, Ingingo ya 15-17",
    content: {
      rw: [
        'Kunyuranaho bikorwa buri gihe ku ruhande rw\'ibumoso mu Rwanda.',
        'Bikorerwa gusa iburyo iyo ikinyabiziga kiri imbere kigaragaje ko kigiye gukata ibumoso kandi kikaba cyegereye umurongo wo hagati.',
        'Birabujijwe kunyuranaho ku misozi hejuru (ku gasozi) aho udashobora kureba ibituruka imbere nibura muri metero 100.',
        'Birabujijwe kunyuranaho mu makoni adafite aho kurebera kure, cyangwa aho hari umurongo wera udahagarara (ligne continue).',
        'Mbere yo kunyuranaho: reba mu ndorerwamo, cana amatara y\'ikizimyamwotsi (clignotant), kandi urebe neza ko nta wundi watangiye kukurenzaho inyuma.',
      ],
      en: [
        'Overtaking must always be performed on the left side of the vehicle in Rwanda.',
        'Overtaking on the right is only permitted when the preceding vehicle is indicating and positioning to turn left.',
        'Overtaking is forbidden near hill crests and summits with less than 100 meters of clear visibility.',
        'Overtaking is prohibited in blind curves and wherever a continuous solid white line is present.',
        'Before overtaking: check interior/exterior mirrors, check blind spots, signal intentions, and ensure no vehicle behind has begun overtaking you.',
      ],
      fr: [
        'Le dépassement s\'effectue obligatoirement par la gauche au Rwanda.',
        'Le dépassement par la droite est exceptionnellement autorisé lorsque le véhicule devant indique son intention de virer à gauche.',
        'Interdiction de dépasser au sommet d\'une côte avec visibilité inférieure à 100 mètres.',
        'Interdiction formelle de dépasser en virage masqué ou en présence d\'une ligne continue.',
        'Contrôles préalables : rétroviseurs, angle mort, clignotant et s\'assurer qu\'aucun véhicule derrière n\'a commencé à vous dépasser.',
      ],
    },
    keyTakeaways: {
      rw: [
        'Kunyuranaho = Ibumoso buri gihe.',
        'Umurongo udahagarara = Nta kunyuranaho na gato.',
        'Mu makoni no mu misozi hejuru = Itegerezanyize ituze inyuma y\'ugenda imbere.',
      ],
      en: [
        'Overtaking = Always on the left side.',
        'Solid center line = Zero overtaking.',
        'Blind bends and hill crests = Exercise patience and stay in line.',
      ],
      fr: [
        'Dépassement = Toujours par la gauche.',
        'Ligne continue = Dépassement strictement prohibé.',
        'Virages et côtes = Restez patiemment dans votre voie.',
      ],
    },
  },
  {
    id: 'topic-first-aid',
    title: {
      rw: 'Ubutabazi bw\'Ibanze n\'Imyitwarire ku Mpanuka',
      en: 'First Aid & Emergency Incident Response',
      fr: 'Premiers Secours et Conduite en Cas d\'Accident',
    },
    summary: {
      rw: 'Amahame atatu (Kurengera, Gutabaza, Gutanga Ubutabazi), gukoresha nimero 112 na 912, no kwirinda amakosa akomeye.',
      en: 'The PAS rule (Protect, Alert, Succor), emergency hotlines (112, 912), and common fatal mistakes to avoid.',
      fr: 'La règle PAS (Protéger, Alerter, Secourir), les numéros d\'urgence (112, 912) et les pièges à éviter.',
    },
    icon: 'HeartPulse',
    readTime: '5 min',
    legalCode: "Amabwiriza ya Croix-Rouge Rwanda & Polisi y'u Rwanda",
    content: {
      rw: [
        'Iyo ugeze ku mpanuka, ntukihutire kwinjira mu modoka idafite umutekano. Kurikiza ihame: Kurengera (Protège), Gutabaza (Alerte), no Gutanga ubutabazi (Secours).',
        'Shyiraho ikimenyetso cy\'umutekano (Triangle) muri metero 50 inyuma hanze y\'insisiro (30m mu mugi) no gucana amatara y\'amakenga (feux de détresse / hazard).',
        'Hamagara Polisi (112) cyangwa Ambulance ya SAMU (912), usobanure: aho impanuka yabereye neza, umubare w\'abakomeretse n\'uko bameze.',
        'Ntukanyeganyeze umuntu ukekaho imvune yo mu mutwe cyangwa mu ijosi, kandi ntugakureho ingofero y\'umunyamoto uhumeka neza.',
        'Ntukajye uha amazi cyangwa ibiryo umuntu wataye ubwenge cyangwa wakomeretse cyane kuko bishobora kumuniga.',
      ],
      en: [
        'At an accident scene, follow the PAS principle: Protect (prevent further collisions), Alert (call emergency services), and Succor (provide safe first aid).',
        'Deploy warning triangles at least 50m behind on rural highways (30m in cities) and activate hazard lights.',
        'Contact Police (112) or Emergency Medical Ambulance SAMU (912) with accurate location, casualty count, and severity.',
        'Never move a victim suspected of spine or neck injury, and never remove a motorcyclist’s helmet if they are breathing.',
        'Never give food or liquids to unconscious or severely injured casualties, as this poses an airway choking hazard.',
      ],
      fr: [
        'Face à un accident, appliquez la méthode PAS : Protéger le lieu, Alerter les secours, et Secourir méthodiquement.',
        'Placez le triangle de signalisation à 50m au moins hors agglomération (30m en ville) et allumez les feux de détresse.',
        'Appelez la Police (112) ou le SAMU (912) en précisant la localisation exacte et le bilan des victimes.',
        'Ne déplacez pas un blessé avec suspicion de lésion rachidienne et ne retirez jamais le casque d\'un motard qui respire.',
        'Ne donnez jamais à boire ni à manger à une victime inconsciente ou polytraumatisée.',
      ],
    },
    keyTakeaways: {
      rw: [
        'Nimero z\'ubutabazi mu Rwanda: Polisi 112, SAMU Ambulance 912.',
        'Umunyamoto uhumeka = Ntukamukuriremo ingofero.',
        'Umuntu wataye ubwenge = Ntukamuhe amazi cyangwa ibyo kunywa.',
      ],
      en: [
        'Emergency hotlines in Rwanda: Police 112, SAMU Ambulance 912.',
        'Breathing motorcyclist = Keep helmet on.',
        'Unconscious person = Absolutely no liquids or food.',
      ],
      fr: [
        'Numéros d\'urgence au Rwanda : Police 112, SAMU 912.',
        'Motard conscient/respirant = Ne pas retirer le casque.',
        'Victime inconsciente = Ne jamais donner à boire.',
      ],
    },
  },
  {
    id: 'topic-irembo',
    title: {
      rw: 'Inzira yo Kwiyandikisha kuri IremboGov ku Kizamini cya Provisoire',
      en: 'How to Apply for Rwanda Provisoire on IremboGov',
      fr: 'Procédure d\'Inscription au Permis Provisoire sur IremboGov',
    },
    summary: {
      rw: 'Ibisabwa, amafaranga y\'ikizamini (5,000 RWF), gutoranya ikigo cyo gukoreraho, n\'ibisabwa ku munsi w\'ikizamini.',
      en: 'Requirements, exam fee (5,000 RWF), selecting testing centers, and exam day checklist.',
      fr: 'Prérequis, frais (5.000 RWF), choix du centre et documents le jour de l\'examen.',
    },
    icon: 'FileCheck',
    readTime: '4 min',
    legalCode: "IremboGov Services & Rwanda National Police Traffic Licensing",
    content: {
      rw: [
        'Injira kuri urubuga rwa irembo.gov.rw, uhitemo serivisi ya "Police" -> "Registration for Driving Test - Theory / Provisoire".',
        'Shyiramo numero y\'indangamuntu yawe (ugomba kuba ufite nibura imyaka 18 y\'amavuko) na numero ya telefoni igendanwa.',
        'Hitamo ikigo wifuza gukoreraho (urugero: Kigali / BK Arena, Huye, Musanze, Rubavu, Rwamagana, Muhanga, etc.) n\'itariki y\'ikizamini.',
        'Kora ubwishyu bw\'amafaranga 5,000 RWF ukoresheje MTN MoMo, Airtel Money, cyangwa Banki (BK, etc.) uhabwe kode y\'ubwishyu.',
        'Ku munsi w\'ikizamini: witwaze Indangamuntu yawe y\'umwimerere (Original National ID) n\'ubutumwa bwa telefoni bugaragaza kode y\'ikizamini cyawe.',
      ],
      en: [
        'Navigate to irembo.gov.rw and select "Police" -> "Registration for Driving Test - Theory / Provisoire".',
        'Enter your 16-digit Rwandan National Identification number (must be at least 18 years old) and active mobile phone number.',
        'Select your preferred examination center (e.g. Kigali, Huye, Musanze, Rubavu, Rwamagana, etc.) and available date.',
        'Pay the official examination fee of 5,000 RWF via MTN Mobile Money, Airtel Money, or bank billing code.',
        'On exam day: bring your original National Identity Card (Indangamuntu) and your registration confirmation SMS.',
      ],
      fr: [
        'Rendez-vous sur le portail irembo.gov.rw et choisissez "Police" -> "Inscription à l\'Examen Théorique du Permis".',
        'Saisissez votre numéro d\'identité nationale (18 ans minimum requis) et votre numéro de téléphone.',
        'Sélectionnez votre centre d\'examen et la session souhaitée.',
        'Réglez les frais légaux de 5.000 RWF par Mobile Money (MTN / Airtel) ou à la banque.',
        'Le jour de l\'épreuve : munissez-vous obligatoirement de votre Carte Nationale d\'Identité originale et du SMS de confirmation.',
      ],
    },
    keyTakeaways: {
      rw: [
        'Amafaranga y\'ikizamini cya Provisoire: 5,000 RWF.',
        'Imyaka fatizo: Nibura imyaka 18 y\'amavuko.',
        'Icyo witwaza: Indangamuntu y\'umwimerere n\'ubutumwa bwa Irembo.',
      ],
      en: [
        'Official theoretical exam fee: 5,000 RWF.',
        'Age eligibility: Minimum 18 years old.',
        'Required on exam day: Original National ID card & Irembo registration SMS.',
      ],
      fr: [
        'Frais de l\'examen théorique : 5.000 RWF.',
        'Âge légal : 18 ans minimum.',
        'Obligatoire le jour J : Carte Nationale d\'Identité originale et code SMS Irembo.',
      ],
    },
  },
];
