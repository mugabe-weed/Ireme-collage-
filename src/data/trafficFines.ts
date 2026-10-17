import { TrafficFineItem } from '../types';

export const TRAFFIC_FINES_2026: TrafficFineItem[] = [
  {
    id: 'fine-1',
    infraction: {
      rw: 'Kurenza umuvuduko wemewe mu nsisiro (hejuru ya 60 cyangwa 40 km/h yafashwe na Radar)',
      en: 'Exceeding statutory speed limit inside built-up areas (detected by radar camera)',
      fr: 'Excès de vitesse en agglomération (flashé par radar)',
    },
    fineRwf: '25,000 – 50,000 RWF',
    penaltyPoints: 2,
    legalRef: "Iteka rya Perezida No 85/01 & Amategeko ya Polisi y'u Rwanda",
    category: 'speed',
  },
  {
    id: 'fine-2',
    infraction: {
      rw: 'Gutwara ikinyabiziga wanyoye inzoga zirenze igipimo cya 0.8 g/l (Alcoolémie)',
      en: 'Driving under the influence of alcohol exceeding 0.8 g/l limit',
      fr: 'Conduite sous l\'empire d\'un état alcoolique supérieur à 0,8 g/l',
    },
    fineRwf: '150,000 RWF + Guhagarika imodoka',
    penaltyPoints: 6,
    legalRef: "Itegeko ry'Umutekano wo mu Muhanda & RNP Traffic Notice",
    category: 'alcohol',
  },
  {
    id: 'fine-3',
    infraction: {
      rw: 'Kurenga umurongo wera udahagarara (Ligne blanche continue)',
      en: 'Crossing or overtaking over a solid continuous white line',
      fr: 'Franchissement ou chevauchement d\'une ligne continue',
    },
    fineRwf: '25,000 RWF',
    penaltyPoints: 2,
    legalRef: "Iteka rya Perezida No 85/01, Ingingo ya 44",
    category: 'priority',
  },
  {
    id: 'fine-4',
    infraction: {
      rw: 'Kugendera mu cyerekezo cyabujijwe (Kwinjira muri Sens interdit / C1)',
      en: 'Driving the wrong way down a one-way street (No entry / Sens interdit)',
      fr: 'Circulation en sens interdit (panneau C1)',
    },
    fineRwf: '50,000 RWF',
    penaltyPoints: 4,
    legalRef: "Iteka rya Perezida No 85/01, Ingingo ya 36",
    category: 'priority',
  },
  {
    id: 'fine-5',
    infraction: {
      rw: 'Gukoresha telefoni igendanwa mu ntoki utwaye ikinyabiziga',
      en: 'Using a handheld mobile telephone while driving',
      fr: 'Usage d\'un téléphone portable tenu en main au volant',
    },
    fineRwf: '25,000 RWF',
    penaltyPoints: 2,
    legalRef: "Amategeko y'Umutekano wo mu Muhanda",
    category: 'safety',
  },
  {
    id: 'fine-6',
    infraction: {
      rw: 'Kutambara umukandara w\'umutekano cyangwa kutambara ingofero ya moto (casque)',
      en: 'Failure to wear a seatbelt or motorcycle safety helmet',
      fr: 'Défaut de port de la ceinture de sécurité ou du casque moto',
    },
    fineRwf: '25,000 RWF',
    penaltyPoints: 2,
    legalRef: "Iteka rya Perezida No 85/01, Ingingo ya 49",
    category: 'safety',
  },
  {
    id: 'fine-7',
    infraction: {
      rw: 'Kutagira cyangwa kutavugurura isuzuma ry\'ubuziranenge (Contrôle technique yarengeje igihe)',
      en: 'Operating a vehicle with an expired technical safety inspection certificate',
      fr: 'Défaut ou expiration du contrôle technique périodique',
    },
    fineRwf: '50,000 RWF',
    penaltyPoints: 3,
    legalRef: "Amabwiriza agenga Isuzuma ry'Ibinyabiziga mu Rwanda",
    category: 'documents',
  },
  {
    id: 'fine-8',
    infraction: {
      rw: 'Kutubahiriza itara ry\'umutuku cyangwa icyapa cya STOP (B2)',
      en: 'Running a red traffic light or failing to stop completely at a STOP sign',
      fr: 'Non-respect d\'un feu rouge ou du panneau d\'arrêt absolu STOP',
    },
    fineRwf: '50,000 RWF',
    penaltyPoints: 4,
    legalRef: "Iteka rya Perezida No 85/01, Ingingo ya 31",
    category: 'priority',
  },
];
