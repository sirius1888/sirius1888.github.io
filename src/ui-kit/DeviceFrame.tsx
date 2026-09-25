import { BatteryFull, Signal, Wifi } from 'lucide-react';
import type { ReactNode } from 'react';
/** Shared iPhone frame. Children supply the entire application surface. */
export function DeviceFrame({
  children,
  label,
  className = '',
}: {
  children: ReactNode;
  label: string;
  className?: string;
}) {
  return (
    <div className={`iphone-shell ${className}`} role="group" aria-label={label}>
      <span className="iphone-action" aria-hidden="true" />
      <span className="iphone-volume volume-up" aria-hidden="true" />
      <span className="iphone-volume volume-down" aria-hidden="true" />
      <span className="iphone-power" aria-hidden="true" />
      <div className="iphone-screen">
        <div className="iphone-status" aria-hidden="true">
          <span>9:41</span>
          <div className="iphone-island">
            <i />
          </div>
          <div>
            <Signal size={13} />
            <Wifi size={13} />
            <BatteryFull size={18} />
          </div>
        </div>
        <div className="phone-app">{children}</div>
        <div className="iphone-home" aria-hidden="true" />
      </div>
    </div>
  );
}
