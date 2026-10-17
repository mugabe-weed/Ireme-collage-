import { RoadSign } from '../types';

export const ROAD_SIGNS: RoadSign[] = [
  // 1. PRIORITY
  {
    id: 'sign-stop',
    code: 'B2',
    category: 'priority',
    name: {
      rw: 'Hagarara (STOP)',
      en: 'Stop Sign',
      fr: 'Arrêt obligatoire (STOP)',
    },
    meaning: {
      rw: 'Bitegetswe guhagarara ku murongo wo guhagararaho no guha inzira ibinyabiziga byose biri mu muhanda ugiyemo.',
      en: 'Mandatory complete stop at the stop line and yield right-of-way to all traffic on the intersecting road.',
      fr: 'Arrêt absolu obligatoire à la ligne de stop et céder le passage à tous les usagers de la route prioritaire.',
    },
    actionRequired: {
      rw: 'Hagarara burundu mbere yo kwinjira mu masangano, irebere neza ko nta kinyabiziga kiri hafi.',
      en: 'Come to a full stop before the intersection, look both ways, and proceed only when clear.',
      fr: 'Marquez un arrêt complet avant de vous engager et vérifiez que la voie est libre.',
    },
    svgType: 'stop',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 31",
  },
  {
    id: 'sign-give-way',
    code: 'B1',
    category: 'priority',
    name: {
      rw: 'Tanga Inzira (Cédez le passage)',
      en: 'Give Way / Yield',
      fr: 'Cédez le passage',
    },
    meaning: {
      rw: 'Bikwereka ko ugomba guha inzira ibinyabiziga bigendera mu muhanda ugiye kwinjiramo nta gutura cyangwa guhagarara ku gahato niba nta kinyabiziga gihari.',
      en: 'Indicates you must slow down and give way to oncoming traffic; full stop is only needed if vehicles are approaching.',
      fr: 'Obligation de ralentir et de céder le passage aux usagers de la route prioritaire sans arrêt obligatoire si la voie est libre.',
    },
    actionRequired: {
      rw: 'Gabanya umuvuduko, tanga inzira ku baturuka iburyo n\'ibumoso.',
      en: 'Reduce speed and yield to vehicles coming from both right and left.',
      fr: 'Ralentissez et laissez passer les véhicules circulant sur la voie prioritaire.',
    },
    svgType: 'give_way',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 30",
  },
  {
    id: 'sign-priority-road',
    code: 'B3',
    category: 'priority',
    name: {
      rw: 'Umuhanda ufite uburenganzira bwo gutambuka mbere',
      en: 'Priority Road',
      fr: 'Route à priorité',
    },
    meaning: {
      rw: 'Umuhanda ugendamo ufite uburenganzira bwo gutambuka mbere ku masangano yose ukurikije icyo cyapa kugeza aho kirangiriye.',
      en: 'Indicates you are on a priority road with right-of-way across successive intersections until the cancellation sign.',
      fr: 'Indique que vous circulez sur une route à grande circulation avec priorité aux carrefours.',
    },
    actionRequired: {
      rw: 'Komeza ugende witonze ariko uzirikana ko abandi bagomba kuguha inzira.',
      en: 'Maintain safe speed; other entering roads must give way to you.',
      fr: 'Maintenez une allure prudente, les véhicules des voies adjacentes doivent vous céder le passage.',
    },
    svgType: 'priority_road',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 32",
  },
  {
    id: 'sign-end-priority',
    code: 'B4',
    category: 'priority',
    name: {
      rw: 'Iherezo ry\'umuhanda ufite gutambuka mbere',
      en: 'End of Priority Road',
      fr: 'Fin de route à priorité',
    },
    meaning: {
      rw: 'Umuhanda wagendagamo ntukifite uburenganzira bwo gutambuka mbere; hagiye gukurikizwa itegeko ry\'uburyo (priorité à droite) cyangwa ibindi byapa.',
      en: 'Priority ends. General priority-to-the-right rule or upcoming priority signs will apply.',
      fr: 'Fin du statut prioritaire de la voie; la priorité à droite ou de nouveaux signaux s\'appliquent.',
    },
    actionRequired: {
      rw: 'Gabanya umuvuduko kandi witegure guha inzira abaturuka iburyo.',
      en: 'Slow down and prepare to yield to vehicles approaching from the right.',
      fr: 'Ralentissez et soyez prêt à céder le passage aux usagers arrivant de droite.',
    },
    svgType: 'end_priority_road',
  },

  // 2. WARNING
  {
    id: 'sign-bend-right',
    code: 'A1a',
    category: 'warning',
    name: {
      rw: 'Ikoni rikaze ry\'iburyo',
      en: 'Dangerous Bend to the Right',
      fr: 'Virage dangereux à droite',
    },
    meaning: {
      rw: 'Icyapa kiburira ko imbere hafi hari ikoni rikaze rigana iburyo.',
      en: 'Warns of a sharp bend to the right ahead.',
      fr: 'Avertit d\'un virage dangereux vers la droite à proximité.',
    },
    actionRequired: {
      rw: 'Gabanya umuvuduko mbere yo kwinjira mu ikoni, fata iburyo bwawe neza.',
      en: 'Slow down before the curve and keep firmly to your right lane.',
      fr: 'Ralentissez avant le virage et serrez à droite.',
    },
    svgType: 'danger_bend_right',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 24",
  },
  {
    id: 'sign-bend-left',
    code: 'A1b',
    category: 'warning',
    name: {
      rw: 'Ikoni rikaze ry\'ibumoso',
      en: 'Dangerous Bend to the Left',
      fr: 'Virage dangereux à gauche',
    },
    meaning: {
      rw: 'Icyapa kiburira ko imbere hafi hari ikoni rikaze rigana ibumoso.',
      en: 'Warns of a sharp bend to the left ahead.',
      fr: 'Avertit d\'un virage dangereux vers la gauche à proximité.',
    },
    actionRequired: {
      rw: 'Gabanya umuvuduko, wirinde kurenga umurongo ugabanya imihanda.',
      en: 'Slow down and never cross the center line into oncoming traffic.',
      fr: 'Ralentissez et évitez d\'empiéter sur la voie inverse.',
    },
    svgType: 'danger_bend_left',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 24",
  },
  {
    id: 'sign-double-bend',
    code: 'A2',
    category: 'warning',
    name: {
      rw: 'Amakoni yikurikiranya (irya mbere riri iburyo)',
      en: 'Double Bend / Series of Bends',
      fr: 'Succession de virages dangereux',
    },
    meaning: {
      rw: 'Icyapa kiburira ko imbere hari amakoni yikurikiranya, irya mbere rigana iburyo.',
      en: 'Warns of consecutive dangerous curves ahead, the first one to the right.',
      fr: 'Succession de virages dont le premier est à droite.',
    },
    actionRequired: {
      rw: 'Gabanya umuvuduko, wirinde kunyuranaho (overtaking) mu makoni.',
      en: 'Reduce speed and never overtake vehicles within consecutive curves.',
      fr: 'Ralentissez et ne tentez aucun dépassement dans la série de virages.',
    },
    svgType: 'danger_double_bend',
  },
  {
    id: 'sign-pedestrians',
    code: 'A13',
    category: 'warning',
    name: {
      rw: 'Aho abanyamaguru bambukira cyangwa bagenda',
      en: 'Pedestrian Crossing Ahead',
      fr: 'Passage pour piétons annoncé',
    },
    meaning: {
      rw: 'Icyapa kiburira ko mu birometero bike cyangwa muri metero 150 (cyangwa 50 mu mugi) hari akayira k\'abanyamaguru.',
      en: 'Warns of an upcoming pedestrian crosswalk (approx. 50m in urban zones, 150m outside).',
      fr: 'Annonce un passage pour piétons (50m en agglomération, 150m hors agglomération).',
    },
    actionRequired: {
      rw: 'Gabanya umuvuduko, witegure guhagarara no guha inzira umunyamaguru wese wambutse cyangwa ugiye kwambuka.',
      en: 'Slow down and prepare to yield to any pedestrian on or entering the crossing.',
      fr: 'Ralentissez et préparez-vous à céder le passage aux piétons engagés.',
    },
    svgType: 'danger_pedestrians',
  },
  {
    id: 'sign-children',
    code: 'A14',
    category: 'warning',
    name: {
      rw: 'Abana / Ahegereye ishuri',
      en: 'Children / School Zone',
      fr: 'Endroit fréquenté par des enfants / École',
    },
    meaning: {
      rw: 'Ahegereye ishuri cyangwa ikibuga cy\'abana, aho abana bashobora gutungurana bakiruka mu muhanda.',
      en: 'Indicates a school zone or playground where children may unexpectedly run into the street.',
      fr: 'Zone scolaire ou aire de jeux, risque important d\'enfants traversant la chaussée.',
    },
    actionRequired: {
      rw: 'Kugabanya umuvuduko munsi ya 30-40 km/h no gucungira hafi cyane impande zombi z\'umuhanda.',
      en: 'Reduce speed well under 40 km/h and scan sidewalks attentively.',
      fr: 'Réduisez votre vitesse et surveillez attentivement les abords de la route.',
    },
    svgType: 'danger_children',
  },
  {
    id: 'sign-slippery',
    code: 'A4',
    category: 'warning',
    name: {
      rw: 'Umuhanda unyerera',
      en: 'Slippery Road Ahead',
      fr: 'Chaussée particulièrement glissante',
    },
    meaning: {
      rw: 'Umuhanda ushobora kunyerera kubera amazi, ibyondo, ibinure cyangwa urume.',
      en: 'Road surface may be slippery due to rain, mud, oil, or weather.',
      fr: 'Risque de chaussée glissante en cas de pluie, verglas ou gravillons.',
    },
    actionRequired: {
      rw: 'Gabanya umuvuduko, wirinde gufata feri gitumo cyangwa gukata volante nabi.',
      en: 'Reduce speed smoothly; avoid harsh braking or sudden sharp steering.',
      fr: 'Réduisez l\'allure, évitez tout freinage brusque et les coups de volant.',
    },
    svgType: 'danger_slippery_road',
  },
  {
    id: 'sign-traffic-lights',
    code: 'A16',
    category: 'warning',
    name: {
      rw: 'Amatara yo mu muhanda agenga ibigenda (Feux tricolores)',
      en: 'Traffic Light Signals Ahead',
      fr: 'Signaux lumineux de circulation annoncés',
    },
    meaning: {
      rw: 'Kumenyesha ko imbere hari amatara atatu agenga urujya n\'uruza.',
      en: 'Warns that an intersection controlled by traffic lights is approaching.',
      fr: 'Annonce un carrefour régulé par des feux de signalisation.',
    },
    actionRequired: {
      rw: 'Gabanya umuvuduko, witegure kubahiriza ibara ry\'itara (umutuku, umuhondo, icyatsi).',
      en: 'Slow down and be ready to stop if red or amber is displayed.',
      fr: 'Ralentissez et préparez-vous à respecter les signaux tricolores.',
    },
    svgType: 'danger_traffic_signals',
  },
  {
    id: 'sign-narrowing',
    code: 'A3',
    category: 'warning',
    name: {
      rw: 'Umuhanda ufunganye impande zombi',
      en: 'Road Narrows on Both Sides',
      fr: 'Chaussée rétrécie des deux côtés',
    },
    meaning: {
      rw: 'Ubugari bw\'umuhanda bugiye kugabanuka impande zombi.',
      en: 'The carriageway will narrow ahead from both sides.',
      fr: 'La largeur de la route va diminuer des deux côtés.',
    },
    actionRequired: {
      rw: 'Gabanya umuvuduko, reba neza ibinyabiziga bituruka imbere.',
      en: 'Slow down and pay close attention to vehicles approaching from opposite direction.',
      fr: 'Ralentissez et surveillez les véhicules venant en sens inverse.',
    },
    svgType: 'danger_narrowing_road',
  },

  // 3. PROHIBITORY
  {
    id: 'sign-no-entry',
    code: 'C1',
    category: 'prohibitory',
    name: {
      rw: 'Birabujijwe kwinjira (Sens interdit)',
      en: 'No Entry for Any Vehicle',
      fr: 'Sens interdit à tout véhicule',
    },
    meaning: {
      rw: 'Birabujijwe kwinjira muri uwo muhanda ku kinyabiziga cyose.',
      en: 'Prohibits any vehicle from entering the roadway in this direction.',
      fr: 'Accès interdit à tout véhicule dans ce sens de circulation.',
    },
    actionRequired: {
      rw: 'Ntukinjire na gato muri uwo muhanda; shaka indi nzira.',
      en: 'Do not enter this road under any circumstances; find an alternative route.',
      fr: 'Ne vous engagez absolument pas; empruntez un autre itinéraire.',
    },
    svgType: 'no_entry',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 36",
  },
  {
    id: 'sign-speed-40',
    code: 'C4a-40',
    category: 'prohibitory',
    name: {
      rw: 'Umuvuduko ntarengwa: 40 km/h',
      en: 'Maximum Speed Limit: 40 km/h',
      fr: 'Vitesse maximale autorisée: 40 km/h',
    },
    meaning: {
      rw: 'Birabujijwe kurenza umuvuduko wa kilometero 40 mu isaha.',
      en: 'Strictly prohibits travelling faster than 40 km/h in this zone.',
      fr: 'Interdiction formelle de dépasser la vitesse de 40 km/h.',
    },
    actionRequired: {
      rw: 'Genzura ibipimo byawe (tachymètre), komeza kugendera munsi cyangwa kuri 40 km/h.',
      en: 'Check your speedometer and keep your speed at or below 40 km/h.',
      fr: 'Contrôlez votre compteur et maintenez une vitesse égale ou inférieure à 40 km/h.',
    },
    svgType: 'speed_limit_40',
  },
  {
    id: 'sign-speed-60',
    code: 'C4a-60',
    category: 'prohibitory',
    name: {
      rw: 'Umuvuduko ntarengwa: 60 km/h',
      en: 'Maximum Speed Limit: 60 km/h',
      fr: 'Vitesse maximale autorisée: 60 km/h',
    },
    meaning: {
      rw: 'Birabujijwe kurenza umuvuduko wa kilometero 60 mu isaha (umuvuduko rusange mu nsisiro zo mu Rwanda)',
      en: 'Speed limit of 60 km/h (general speed limit within built-up areas in Rwanda).',
      fr: 'Limitation de vitesse à 60 km/h (vitesse maximale en agglomération au Rwanda).',
    },
    actionRequired: {
      rw: 'Kugendera ku muvuduko utarenga 60 km/h.',
      en: 'Do not exceed 60 km/h.',
      fr: 'Ne pas dépasser 60 km/h.',
    },
    svgType: 'speed_limit_60',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 12",
  },
  {
    id: 'sign-speed-80',
    code: 'C4a-80',
    category: 'prohibitory',
    name: {
      rw: 'Umuvuduko ntarengwa: 80 km/h',
      en: 'Maximum Speed Limit: 80 km/h',
      fr: 'Vitesse maximale autorisée: 80 km/h',
    },
    meaning: {
      rw: 'Birabujijwe kurenza kilometero 80 mu isaha (umuvuduko ntarengwa ahasanzwe hanze y\'insisiro mu Rwanda).',
      en: 'Maximum speed limit of 80 km/h on standard roads outside built-up areas in Rwanda.',
      fr: 'Vitesse maximale de 80 km/h sur les routes nationales hors agglomération au Rwanda.',
    },
    actionRequired: {
      rw: 'Ntukarenze 80 km/h ku modoka nto hanze y\'umugi.',
      en: 'Ensure passenger cars do not exceed 80 km/h outside urban centers.',
      fr: 'Maintenez la vitesse sous 80 km/h hors agglomération.',
    },
    svgType: 'speed_limit_80',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 12",
  },
  {
    id: 'sign-no-overtaking',
    code: 'C3',
    category: 'prohibitory',
    name: {
      rw: 'Birabujijwe kunyuranaho ku binyabiziga bifite moteri',
      en: 'No Overtaking of Motor Vehicles',
      fr: 'Interdiction de dépasser tous véhicules à moteur',
    },
    meaning: {
      rw: 'Birabujijwe ko ikinyabiziga gifite moteri kirenza ku kindi kinyabiziga gifite moteri kitari velomoteri cyangwa moto idafite akanyabiziga k\'uruhande.',
      en: 'Prohibits motor vehicles from overtaking other multi-track motor vehicles.',
      fr: 'Interdiction aux véhicules à moteur de dépasser d\'autres véhicules à moteur (sauf deux-roues sans side-car).',
    },
    actionRequired: {
      rw: 'Guma mu mwanya wawe inyuma y\'ikinyabiziga kigenda imbere yawe.',
      en: 'Stay in your lane behind the vehicle in front; do not attempt overtaking.',
      fr: 'Restez sur votre voie derrière le véhicule qui vous précède.',
    },
    svgType: 'no_overtaking',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 37",
  },
  {
    id: 'sign-no-parking',
    code: 'C11a',
    category: 'prohibitory',
    name: {
      rw: 'Birabujijwe guparikira (Stationnement interdit)',
      en: 'No Parking',
      fr: 'Stationnement interdit',
    },
    meaning: {
      rw: 'Birabujijwe guparikira ikinyabiziga cyawe aho icyo cyapa kiri, ariko kwikorezaho cyangwa gupakurura (arrêt) byo byemewe mu gihe gito.',
      en: 'Parking is forbidden; temporary stopping to load/unload passengers or goods is permitted.',
      fr: 'Stationnement interdit; l\'arrêt bref pour charger ou décharger est toléré.',
    },
    actionRequired: {
      rw: 'Ntukahaparike imodoka ngo uyisige aho.',
      en: 'Do not park your car unattended.',
      fr: 'Ne laissez pas votre véhicule en stationnement sans conducteur.',
    },
    svgType: 'no_parking',
  },
  {
    id: 'sign-no-stopping',
    code: 'C11b',
    category: 'prohibitory',
    name: {
      rw: 'Birabujijwe guhagarara no guparikira (Arrêt et stationnement interdits)',
      en: 'No Stopping and No Parking (Clearway)',
      fr: 'Arrêt et stationnement interdits',
    },
    meaning: {
      rw: 'Birabujijwe guhagarara umwanya uwo ari wo wose, haba guhagarara akanya gato cyangwa guparikira.',
      en: 'Strict prohibition against stopping for any reason or parking on this road section.',
      fr: 'Interdiction formelle de s\'arrêter, même brièvement, et de stationner.',
    },
    actionRequired: {
      rw: 'Komeza ugende nta guhagarara.',
      en: 'Keep moving; stopping is strictly prohibited.',
      fr: 'Continuez à rouler; aucun arrêt n\'est toléré.',
    },
    svgType: 'no_stopping_parking',
  },
  {
    id: 'sign-no-horn',
    code: 'C6',
    category: 'prohibitory',
    name: {
      rw: 'Birabujijwe kuvuza ihoni (Klaxon interdit)',
      en: 'No Use of Horn / Audible Warning',
      fr: 'Usage d\'avertisseurs sonores interdit',
    },
    meaning: {
      rw: 'Birabujijwe gukoresha ihoni keretse mu gihe hari impamvu ikomeye yo kwirinda impanuka.',
      en: 'Use of horns is forbidden except in case of immediate imminent danger.',
      fr: 'Signaux sonores interdits sauf cas de danger immédiat.',
    },
    actionRequired: {
      rw: 'Ntukavuze ihoni, by\'umwihariko hafi y\'ibitaro cyangwa mu mugi ninjoro.',
      en: 'Do not sound the horn, particularly near hospitals or at night.',
      fr: 'Ne klaxonnez pas à proximité d\'hôpitaux ou de zones résidentielles.',
    },
    svgType: 'no_horn',
  },

  // 4. MANDATORY
  {
    id: 'sign-turn-right',
    code: 'D1b',
    category: 'mandatory',
    name: {
      rw: 'Gana iburyo gusa',
      en: 'Turn Right Only Ahead',
      fr: 'Direction obligatoire à droite',
    },
    meaning: {
      rw: 'Bitegetswe gukata iburyo imbere.',
      en: 'Mandatory turn to the right at the next intersection.',
      fr: 'Obligation de tourner à droite au carrefour suivant.',
    },
    actionRequired: {
      rw: 'Fata ikimenyetso cy\'ikizimyamwotsi (clignotant) cy\'iburyo maze ukate iburyo.',
      en: 'Signal right and follow only the right turn trajectory.',
      fr: 'Mettez votre clignotant droit et tournez à droite.',
    },
    svgType: 'turn_right_ahead',
  },
  {
    id: 'sign-straight',
    code: 'D1a',
    category: 'mandatory',
    name: {
      rw: 'Komeza imbere gusa',
      en: 'Proceed Straight Only',
      fr: 'Direction obligatoire tout droit',
    },
    meaning: {
      rw: 'Bitegetswe gukomeza imbere gusa, birabujijwe gukata iburyo cyangwa ibumoso.',
      en: 'Mandatory straight-ahead direction; turns to the right or left are prohibited.',
      fr: 'Poursuivez tout droit; les changements de direction sont interdits.',
    },
    actionRequired: {
      rw: 'Komeza imbere nta gukata.',
      en: 'Continue straight without turning.',
      fr: 'Continuez tout droit.',
    },
    svgType: 'straight_only',
  },
  {
    id: 'sign-roundabout-mandatory',
    code: 'D3',
    category: 'mandatory',
    name: {
      rw: 'Kuzenguruka rond-point bitegetswe',
      en: 'Compulsory Roundabout',
      fr: 'Sens giratoire obligatoire',
    },
    meaning: {
      rw: 'Amasangano azengurutswe (rond-point) aho ugomba kuzenguruka werekeza ibumoso ugendera iburyo bw\'akarwa ko hagati.',
      en: 'Mandatory direction around the roundabout island, keeping the island to your left.',
      fr: 'Carrefour à sens giratoire obligatoire en contournant l\'îlot central par la droite.',
    },
    actionRequired: {
      rw: 'Tanga inzira ku binyabiziga bimaze kwinjira muri rond-point (abaturuka ibumoso mu Rwanda).',
      en: 'Yield to traffic already circulating inside the roundabout.',
      fr: 'Cédez le passage aux véhicules déjà engagés dans le rond-point.',
    },
    svgType: 'roundabout_mandatory',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 33",
  },

  // 5. INFORMATIVE
  {
    id: 'sign-parking',
    code: 'E2',
    category: 'informative',
    name: {
      rw: 'Aho guparikira hemewe (Parking)',
      en: 'Permitted Parking Area',
      fr: 'Emplacement de stationnement autorisé',
    },
    meaning: {
      rw: 'Ahantu hagenewe guparikwamo ibinyabiziga mu buryo bwemewe n\'amategeko.',
      en: 'Designated parking facility or zone where parking is authorized.',
      fr: 'Zone aménagée et autorisée pour le stationnement des véhicules.',
    },
    actionRequired: {
      rw: 'Parika ikinyabiziga neza mu mirongo yateganyijwe.',
      en: 'Park neatly within the painted parking bay lines.',
      fr: 'Stationnez votre véhicule convenablement dans les limites des marquages.',
    },
    svgType: 'parking_area',
  },
  {
    id: 'sign-first-aid',
    code: 'E1',
    category: 'informative',
    name: {
      rw: 'Aho gutangira ubutabazi bw\'ibanze (Poste de secours)',
      en: 'First Aid Post',
      fr: 'Poste de secours d\'urgence',
    },
    meaning: {
      rw: 'Kumenyesha ko hafi hari ikigo gitanga ubutabazi bw\'ibanze mu gihe cy\'impanuka.',
      en: 'Indicates the presence of a first aid station nearby.',
      fr: 'Indique la proximité d\'un poste de premiers secours.',
    },
    actionRequired: {
      rw: 'Mu gihe cy\'impanuka, wifashishe ubu butabazi cyangwa uherekeze abakomeretse.',
      en: 'Can be used for prompt medical assistance in an accident.',
      fr: 'À utiliser en cas d\'urgence médicale lors d\'un accident de la circulation.',
    },
    svgType: 'first_aid',
  },
  {
    id: 'sign-hospital',
    code: 'E3',
    category: 'informative',
    name: {
      rw: 'Ibitaro (Hôpital)',
      en: 'Hospital',
      fr: 'Hôpital',
    },
    meaning: {
      rw: 'Ahegereye ibitaro; bisaba ituze n\'umutuzo mu muhanda.',
      en: 'Hospital zone ahead; calls for reduced noise and extreme caution.',
      fr: 'Proximité d\'un établissement hospitalier; silence et prudence de rigueur.',
    },
    actionRequired: {
      rw: 'Wirinde kuvuza amahoni no kugenza amavuta ku muvuduko ukabije.',
      en: 'Refrain strictly from honking and avoid excessive engine noise.',
      fr: 'Interdiction formelle de faire du bruit et de klaxonner.',
    },
    svgType: 'hospital',
  },
  {
    id: 'sign-one-way',
    code: 'E11',
    category: 'informative',
    name: {
      rw: 'Umuhanda w\'icyerekezo kimwe (Sens unique)',
      en: 'One-Way Street',
      fr: 'Route à sens unique',
    },
    meaning: {
      rw: 'Umuhanda wose ugenda mu cyerekezo kimwe gusa; nta binyabiziga bishobora guturuka imbere.',
      en: 'Traffic on all lanes flows in the direction indicated by the arrow only.',
      fr: 'La circulation se fait uniquement dans le sens de la flèche sur toutes les voies.',
    },
    actionRequired: {
      rw: 'Ntugahangayikishwe n\'ibinyabiziga bituruka imbere, ariko ushobora guparikira impande zombi igihe byemewe.',
      en: 'Traffic approaches only in your direction; overtaking and parking on both sides may be allowed.',
      fr: 'Aucun véhicule ne vient en sens inverse; dépassements plus aisés.',
    },
    svgType: 'one_way',
  },

  // 6. ROAD MARKINGS
  {
    id: 'sign-continuous-line',
    code: 'M1',
    category: 'marking',
    name: {
      rw: 'Umurongo udahagarara / udacagaguye (Ligne continue)',
      en: 'Continuous / Solid White Line',
      fr: 'Ligne blanche continue',
    },
    meaning: {
      rw: 'Birabujijwe rwose kurenga cyangwa kugendera ku murongo udahagarara mu buryo ubwo ari bwo bwose.',
      en: 'Strictly prohibits straddling or crossing the line under any circumstances.',
      fr: 'Interdiction formelle de chevaucher ou de franchir cette ligne.',
    },
    actionRequired: {
      rw: 'Guma mu ruhande rwawe; ntiwemerewe kunyuranaho cyangwa gukata uca kuri uyu murongo.',
      en: 'Stay inside your lane; never overtake or make a U-turn across this line.',
      fr: 'Demeurez dans votre voie; dépassements et demi-tours interdits.',
    },
    svgType: 'road_marking_continuous',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 44",
  },
  {
    id: 'sign-dashed-line',
    code: 'M2',
    category: 'marking',
    name: {
      rw: 'Umurongo ucagaguye (Ligne discontinue)',
      en: 'Dashed / Broken White Line',
      fr: 'Ligne blanche discontinue',
    },
    meaning: {
      rw: 'Ubyemerewe kurenga kuri uyu murongo mu gihe unyuranaho ku kinyabiziga kiri imbere ariko ukabanza kwitegereza ko inzira itagize icyo itwaye.',
      en: 'Permits crossing or straddling when overtaking or turning if conditions are clear and safe.',
      fr: 'Autorise le franchissement pour dépasser ou tourner si la visibilité le permet.',
    },
    actionRequired: {
      rw: 'Tanga ikimenyetso (clignotant), reba mu ndorerwamo mbere yo kurenga umurongo.',
      en: 'Signal and check mirrors before crossing to overtake.',
      fr: 'Actionnez le clignotant et vérifiez vos rétroviseurs avant de vous déporter.',
    },
    svgType: 'road_marking_dashed',
    legalArticle: "Iteka rya Perezida No 85/01, Ingingo ya 44",
  },
];
