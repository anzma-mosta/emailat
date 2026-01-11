import { cn } from '@/components/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import type { IconDefinition } from '@fortawesome/fontawesome-svg-core';
import {
  faBars,
  faBell,
  faCheck,
  faCircleCheck,
  faCircleInfo,
  faCirclePlus,
  faCloud,
  faCreditCard,
  faDownload,
  faEnvelope,
  faFileInvoice,
  faGauge,
  faGlobe,
  faHeadset,
  faLanguage,
  faLandmark,
  faLock,
  faLocationDot,
  faMagnifyingGlass,
  faServer,
  faUniversity,
  faUsers,
  faWallet,
  faArrowRight,
  faArrowLeft,
  faCheckDouble,
} from '@fortawesome/free-solid-svg-icons';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faMinus, faXmark, faPercent, faTag } from '@fortawesome/free-solid-svg-icons';

type Props = {
  name: string;
  className?: string;
  fill?: 0 | 1;
  weight?: 100 | 200 | 300 | 400 | 500 | 600 | 700;
  grade?: -25 | 0 | 200;
  opsz?: 20 | 24 | 40 | 48;
};

const iconMap: Record<string, IconDefinition> = {
  // Common actions
  menu: faBars,
  search: faMagnifyingGlass,
  notifications: faBell,
  info: faCircleInfo,
  add_circle: faCirclePlus,
  arrow_forward: faArrowRight,
  arrow_back: faArrowLeft,
  download: faDownload,

  // Status/check
  check: faCheck,
  check_circle: faCircleCheck,
  verified: faCircleCheck,
  minus: faMinus,
  close: faXmark,
  percent: faPercent,
  tag: faTag,

  // Entities
  dashboard: faGauge,
  mail: faEnvelope,
  public: faGlobe,
  domain: faGlobe,
  group: faUsers,
  cloud: faCloud,
  credit_card: faCreditCard,
  lock: faLock,
  language: faLanguage,
  support_agent: faHeadset,
  dns: faServer,
  home_pin: faLocationDot,
  receipt_long: faFileInvoice,
  renew: faArrowsRotate,

  // Payment methods
  account_balance_wallet: faWallet,
  account_balance: faLandmark,
};

export function Icon({ name, className }: Props) {
  const icon = iconMap[name] ?? faCheckDouble;
  return <FontAwesomeIcon icon={icon} className={cn('', className)} />;
}
