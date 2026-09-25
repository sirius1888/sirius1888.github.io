import { useEffect, useRef, useState } from 'react';
import type { AdFormat, AdOverlayKind, MusicApp, RewardPhase } from './model';
import { REWARD_DURATION_SECONDS } from './model';
export type AdPlacementOptions = {
  consent: boolean;
  resetVersion: number;
  onEvent: (event: string) => void;
};
/** Local placement lifecycle: app/format selection, consent gating, cancellable reward timer and claim rules. */
export function useAdPlacement({ consent, resetVersion, onEvent }: AdPlacementOptions) {
  const [app, setApp] = useState<MusicApp>('ug');
  const [format, setFormat] = useState<AdFormat>('banner');
  const [overlay, setOverlay] = useState<AdOverlayKind | null>(null);
  const [rewardPhase, setRewardPhase] = useState<RewardPhase>('idle');
  const [seconds, setSeconds] = useState(REWARD_DURATION_SECONDS);
  const [claimed, setClaimed] = useState(false);
  const emitRef = useRef(onEvent);
  emitRef.current = onEvent;
  function clearPlacement() {
    setOverlay(null);
    setRewardPhase('idle');
    setSeconds(REWARD_DURATION_SECONDS);
    setClaimed(false);
  }
  function chooseApp(next: MusicApp) {
    clearPlacement();
    setApp(next);
    onEvent('app.changed');
  }
  function chooseFormat(next: AdFormat) {
    clearPlacement();
    setFormat(next);
    onEvent(`format.${next}.selected`);
  }
  useEffect(() => {
    if (!consent) clearPlacement();
  }, [consent]);
  useEffect(() => {
    clearPlacement();
    setApp('ug');
    setFormat('banner');
  }, [resetVersion]);
  useEffect(() => {
    if (overlay !== 'rewarded' || rewardPhase !== 'playing' || !consent) return;
    const tick = setInterval(() => setSeconds((value) => Math.max(0, value - 1)), 1000);
    const finish = setTimeout(() => {
      setRewardPhase('complete');
      emitRef.current('rewarded.completed');
    }, REWARD_DURATION_SECONDS * 1000);
    return () => {
      clearInterval(tick);
      clearTimeout(finish);
    };
  }, [overlay, rewardPhase, consent]);
  function closeOverlay() {
    setOverlay(null);
    if (rewardPhase === 'playing') {
      setRewardPhase('idle');
      setSeconds(REWARD_DURATION_SECONDS);
      onEvent('rewarded.cancelled');
    }
  }
  function showAd() {
    if (!consent) return;
    setOverlay(format === 'rewarded' ? 'rewarded' : 'interstitial');
    if (format === 'rewarded') {
      setRewardPhase('playing');
      setSeconds(REWARD_DURATION_SECONDS);
      setClaimed(false);
    }
    onEvent(`${format}.opened`);
  }
  function claimReward() {
    if (!consent || overlay !== 'rewarded' || rewardPhase !== 'complete' || claimed) return;
    setClaimed(true);
    setOverlay(null);
    setRewardPhase('idle');
    onEvent('reward.claimed');
  }
  return {
    app,
    format,
    overlay,
    rewardPhase,
    seconds,
    claimed,
    chooseApp,
    chooseFormat,
    showAd,
    closeOverlay,
    claimReward,
    openCreative: () => {
      if (consent) setOverlay('creative');
    },
  };
}
