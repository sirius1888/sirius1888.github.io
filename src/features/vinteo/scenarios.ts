import { Eye, MessageCircle, PictureInPicture2, Wifi } from 'lucide-react';
import { bi } from '../../i18n';
import type { Demo } from './model';
export const scenarios = [
  {
    id: 'chat' as Demo,
    icon: MessageCircle,
    title: bi('Conference chat', 'Чат конференции'),
    description: bi(
      'Messages between conference participants.',
      'Сообщения между участниками конференции.',
    ),
  },
  {
    id: 'pip' as Demo,
    icon: PictureInPicture2,
    title: bi('Picture in Picture', 'Картинка в картинке'),
    description: bi('Video calls in a floating iOS window.', 'Видеозвонок в плавающем окне iOS.'),
  },
  {
    id: 'viewer' as Demo,
    icon: Eye,
    title: bi('Viewer mode', 'Режим зрителя'),
    description: bi(
      'Watch without access to a microphone or camera.',
      'Просмотр без доступа к микрофону и камере.',
    ),
  },
  {
    id: 'reconnect' as Demo,
    icon: Wifi,
    title: bi('Reconnection', 'Переподключение'),
    description: bi('Recover after a connection loss.', 'Восстановление после потери связи.'),
  },
];
