import type { EventMap } from '@yhooks/use-event-manager';
import useEventManager from '@yhooks/use-event-manager';
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export type HashKey = `#${string}`;

type Location = ReturnType<typeof useLocation> & { hash: HashKey };

/**
 * auto trigger registered events by registered target url hash string(start with #)
 */
const useAutoActionByHash = ({}: EventMap<HashKey>) => {
  const { hash } = useLocation() as Location;
  const { register, registerAll, cancelRegisterAll, trigger, cancelRegister } =
    useEventManager<HashKey>();

  useEffect(() => {
    if (hash) trigger(hash);

    return () => {
      if (hash) cancelRegisterAll(hash);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hash]);

  return {
    register,
    registerAll,
    cancelRegister,
    cancelRegisterAll,
  };
};

export default useAutoActionByHash;
