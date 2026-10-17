import React from 'react';

interface RoadSignGraphicProps {
  type: string;
  className?: string;
  size?: number;
}

export const RoadSignGraphic: React.FC<RoadSignGraphicProps> = ({
  type,
  className = '',
  size = 80,
}) => {
  const s = size;

  switch (type) {
    // 1. PRIORITY SIGNS
    case 'stop':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" fill="#dc2626" stroke="#ffffff" strokeWidth="4" />
          <polygon points="31,7 69,7 93,31 93,69 69,93 31,93 7,69 7,31" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
          <text x="50" y="58" fill="#ffffff" fontSize="24" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">STOP</text>
        </svg>
      );

    case 'give_way':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,92 8,15 92,15" fill="#ffffff" stroke="#dc2626" strokeWidth="12" strokeLinejoin="round" />
        </svg>
      );

    case 'priority_road':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,5 95,50 50,95 5,50" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <polygon points="50,15 85,50 50,85 15,50" fill="#fbbf24" stroke="#000000" strokeWidth="2" />
        </svg>
      );

    case 'end_priority_road':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,5 95,50 50,95 5,50" fill="#ffffff" stroke="#0f172a" strokeWidth="2" />
          <polygon points="50,15 85,50 50,85 15,50" fill="#fbbf24" stroke="#000000" strokeWidth="2" />
          <line x1="20" y1="80" x2="80" y2="20" stroke="#000000" strokeWidth="6" />
        </svg>
      );

    // 2. WARNING SIGNS (Biburira - Red border triangle)
    case 'danger_bend_right':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <path d="M 40 70 L 40 50 Q 40 40 55 40 L 68 40" fill="none" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
          <polygon points="65,33 78,40 65,47" fill="#000000" />
        </svg>
      );

    case 'danger_bend_left':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <path d="M 60 70 L 60 50 Q 60 40 45 40 L 32 40" fill="none" stroke="#000000" strokeWidth="7" strokeLinecap="round" />
          <polygon points="35,33 22,40 35,47" fill="#000000" />
        </svg>
      );

    case 'danger_double_bend':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <path d="M 44 72 L 44 58 Q 44 48 56 48 Q 66 48 66 38 L 66 30" fill="none" stroke="#000000" strokeWidth="6" strokeLinecap="round" />
          <polygon points="60,33 66,24 72,33" fill="#000000" />
        </svg>
      );

    case 'danger_pedestrians':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          {/* Walking person symbol */}
          <circle cx="50" cy="40" r="5" fill="#000000" />
          <path d="M 47 48 L 53 48 L 56 64 L 62 76" stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 50 49 L 45 62 L 38 74" stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 44 53 L 56 53" stroke="#000000" strokeWidth="4" strokeLinecap="round" />
        </svg>
      );

    case 'danger_children':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <circle cx="44" cy="42" r="4.5" fill="#000000" />
          <circle cx="60" cy="48" r="4" fill="#000000" />
          <path d="M 44 48 L 44 65 M 44 54 L 38 72 M 44 58 L 50 72" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" />
          <path d="M 60 54 L 60 67 M 60 60 L 56 74 M 60 62 L 65 74" stroke="#000000" strokeWidth="3" strokeLinecap="round" />
          <path d="M 44 53 L 60 57" stroke="#000000" strokeWidth="2.5" />
        </svg>
      );

    case 'danger_slippery_road':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <rect x="40" y="44" width="20" height="10" rx="3" fill="#000000" transform="rotate(-15 50 49)" />
          <circle cx="43" cy="54" r="3" fill="#000000" />
          <circle cx="57" cy="50" r="3" fill="#000000" />
          <path d="M 38 68 Q 45 62 48 70 T 58 66" fill="none" stroke="#000000" strokeWidth="3" />
          <path d="M 45 74 Q 52 68 55 76 T 65 72" fill="none" stroke="#000000" strokeWidth="3" />
        </svg>
      );

    case 'danger_traffic_signals':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <rect x="43" y="38" width="14" height="34" rx="3" fill="#0f172a" />
          <circle cx="50" cy="44" r="3.5" fill="#ef4444" />
          <circle cx="50" cy="55" r="3.5" fill="#eab308" />
          <circle cx="50" cy="66" r="3.5" fill="#22c55e" />
        </svg>
      );

    case 'danger_narrowing_road':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <path d="M 34 76 L 34 58 L 42 42 L 42 32" stroke="#000000" strokeWidth="5" strokeLinecap="round" fill="none" />
          <path d="M 66 76 L 66 58 L 58 42 L 58 32" stroke="#000000" strokeWidth="5" strokeLinecap="round" fill="none" />
        </svg>
      );

    case 'danger_roundabout':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <polygon points="50,8 95,88 5,88" fill="#ffffff" stroke="#dc2626" strokeWidth="10" strokeLinejoin="round" />
          <circle cx="50" cy="55" r="14" fill="none" stroke="#000000" strokeWidth="5" strokeDasharray="22 8" />
          <polygon points="46,40 52,36 50,44" fill="#000000" />
          <polygon points="63,58 66,65 59,64" fill="#000000" />
          <polygon points="40,65 34,60 37,68" fill="#000000" />
        </svg>
      );

    // 3. PROHIBITORY SIGNS (Bibuza - Red circle)
    case 'no_entry':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="44" fill="#dc2626" stroke="#ffffff" strokeWidth="2" />
          <rect x="20" y="42" width="60" height="16" rx="2" fill="#ffffff" />
        </svg>
      );

    case 'speed_limit_40':
    case 'speed_limit_60':
    case 'speed_limit_80':
      const speed = type === 'speed_limit_40' ? '40' : type === 'speed_limit_60' ? '60' : '80';
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          <text x="50" y="61" fill="#000000" fontSize="34" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">{speed}</text>
        </svg>
      );

    case 'no_overtaking':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          {/* Black car on right */}
          <rect x="52" y="42" width="22" height="18" rx="4" fill="#000000" />
          <circle cx="56" cy="62" r="3" fill="#000000" />
          <circle cx="70" cy="62" r="3" fill="#000000" />
          {/* Red car on left */}
          <rect x="26" y="38" width="22" height="18" rx="4" fill="#dc2626" />
          <circle cx="30" cy="58" r="3" fill="#dc2626" />
          <circle cx="44" cy="58" r="3" fill="#dc2626" />
        </svg>
      );

    case 'no_parking':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#1d4ed8" stroke="#dc2626" strokeWidth="12" />
          <text x="50" y="63" fill="#ffffff" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">P</text>
          <line x1="20" y1="20" x2="80" y2="80" stroke="#dc2626" strokeWidth="11" />
        </svg>
      );

    case 'no_stopping_parking':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#1d4ed8" stroke="#dc2626" strokeWidth="12" />
          <line x1="18" y1="18" x2="82" y2="82" stroke="#dc2626" strokeWidth="10" />
          <line x1="18" y1="82" x2="82" y2="18" stroke="#dc2626" strokeWidth="10" />
        </svg>
      );

    case 'no_horn':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          <path d="M 30 50 L 45 42 L 56 34 L 56 66 L 45 58 Z" fill="#000000" />
          <line x1="20" y1="80" x2="80" y2="20" stroke="#dc2626" strokeWidth="9" />
        </svg>
      );

    case 'no_pedestrians':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="45" fill="#ffffff" stroke="#dc2626" strokeWidth="12" />
          <circle cx="50" cy="35" r="5" fill="#000000" />
          <path d="M 47 42 L 53 42 L 56 58 L 62 70" stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none" />
          <path d="M 50 43 L 45 56 L 38 68" stroke="#000000" strokeWidth="4" strokeLinecap="round" fill="none" />
          <line x1="20" y1="80" x2="80" y2="20" stroke="#dc2626" strokeWidth="10" />
        </svg>
      );

    // 4. MANDATORY SIGNS (Bitegeka - Blue circle)
    case 'turn_right_ahead':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="46" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <path d="M 34 50 L 56 50" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          <polygon points="54,34 74,50 54,66" fill="#ffffff" />
        </svg>
      );

    case 'straight_only':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="46" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <path d="M 50 66 L 50 38" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          <polygon points="34,42 50,22 66,42" fill="#ffffff" />
        </svg>
      );

    case 'roundabout_mandatory':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="46" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <circle cx="50" cy="50" r="22" fill="none" stroke="#ffffff" strokeWidth="6" strokeDasharray="30 16" />
          <polygon points="46,24 56,22 51,32" fill="#ffffff" />
          <polygon points="68,60 74,68 64,71" fill="#ffffff" />
          <polygon points="32,64 24,58 31,51" fill="#ffffff" />
        </svg>
      );

    case 'pass_right':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <circle cx="50" cy="50" r="46" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <path d="M 38 34 L 56 56" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          <polygon points="64,46 64,68 42,68" fill="#ffffff" />
        </svg>
      );

    // 5. INFORMATIVE SIGNS (Byerekana - Blue rectangle)
    case 'parking_area':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <text x="50" y="68" fill="#ffffff" fontSize="56" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">P</text>
        </svg>
      );

    case 'first_aid':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <rect x="20" y="20" width="60" height="60" rx="6" fill="#ffffff" />
          <rect x="44" y="28" width="12" height="44" fill="#dc2626" />
          <rect x="28" y="44" width="44" height="12" fill="#dc2626" />
        </svg>
      );

    case 'hospital':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <rect x="20" y="20" width="60" height="60" rx="6" fill="#ffffff" />
          <text x="50" y="64" fill="#dc2626" fontSize="42" fontWeight="900" fontFamily="sans-serif" textAnchor="middle">H</text>
        </svg>
      );

    case 'one_way':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <path d="M 50 72 L 50 36" stroke="#ffffff" strokeWidth="8" strokeLinecap="round" />
          <polygon points="34,42 50,22 66,42" fill="#ffffff" />
        </svg>
      );

    case 'pedestrian_crossing':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="8" y="8" width="84" height="84" rx="10" fill="#1d4ed8" stroke="#ffffff" strokeWidth="3" />
          <polygon points="50,18 84,78 16,78" fill="#ffffff" />
          <circle cx="50" cy="38" r="4" fill="#000000" />
          <path d="M 47 45 L 53 45 L 56 60 L 62 70" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          <path d="M 50 46 L 45 58 L 38 68" stroke="#000000" strokeWidth="3.5" strokeLinecap="round" fill="none" />
        </svg>
      );

    // ROAD MARKINGS
    case 'road_marking_continuous':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="10" y="10" width="80" height="80" rx="6" fill="#334155" />
          <line x1="50" y1="10" x2="50" y2="90" stroke="#ffffff" strokeWidth="6" />
        </svg>
      );

    case 'road_marking_dashed':
      return (
        <svg width={s} height={s} viewBox="0 0 100 100" className={className}>
          <rect x="10" y="10" width="80" height="80" rx="6" fill="#334155" />
          <line x1="50" y1="12" x2="50" y2="30" stroke="#ffffff" strokeWidth="6" />
          <line x1="50" y1="42" x2="50" y2="60" stroke="#ffffff" strokeWidth="6" />
          <line x1="50" y1="72" x2="50" y2="88" stroke="#ffffff" strokeWidth="6" />
        </svg>
      );

    default:
      return (
        <div 
          style={{ width: s, height: s }} 
          className={`bg-slate-100 border-2 border-slate-300 rounded-lg flex items-center justify-center font-bold text-slate-500 text-xs text-center p-1 ${className}`}
        >
          {type}
        </div>
      );
  }
};
