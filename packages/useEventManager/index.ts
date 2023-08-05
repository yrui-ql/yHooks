import { useRef } from 'react';

export type EventMap<T extends string> = {
  [P in T as P extends T ? P : never]: ((...args: any[]) => any)[];
};

/**
 * eventBus
 * @param initEventMap initial events
 * @returns
 */
const useEventManager = <
  K extends string,
  Func extends (...args: any[]) => any = (...args: any[]) => any,
>(
  initEventMap?: EventMap<K>,
) => {
  const eventBus = useRef<EventMap<K>>(initEventMap || ({} as EventMap<K>));
  /**
   *  register target key 's event queue
   * @param key Event Key
   * @param eventQueue Event Queue
   */
  function registerAll(key: K, eventQueue: Func[]) {
    if (eventBus.current) {
      eventBus.current[key] = eventQueue || [];
    }
  }
  /**
   *  register target key 's event
   *
   * @param key Event Key
   * @param eventQueue Event
   * @param forceDelete false; force delete existed event. if false, event will append to queue tail directly
   */
  function register(key: K, event: Func, forceDelete?: boolean) {
    if (!eventBus.current?.[key]) {
      eventBus.current[key] = [];
    } else {
      if (forceDelete) {
        cancelRegister(key, event);
      }
      eventBus.current[key].push(event);
    }
  }

  /**
   * delete target key's  event queue
   * @param key Event Key
   * @param eventQueue Event Queue
   */
  function cancelRegisterAll(key: K) {
    if (eventBus.current?.[key]) {
      delete eventBus.current[key];
    }
  }

  /**
   * delete target key's target event
   * @param key Event Key
   * @param eventQueue Event
   */
  function cancelRegister(key: K, event: Func) {
    if (eventBus.current?.[key]) {
      const index = eventBus.current[key].indexOf(event);
      if (index > -1) {
        eventBus.current[key].splice(index, 1);
      }
    }
  }

  /**
   * trigger all events of registered target key
   * @param key Event Key
   */
  function trigger(key: K) {
    if (eventBus.current) {
      return Promise.allSettled(eventBus.current[key]);
    }
    return Promise.resolve([]);
  }

  return {
    register,
    registerAll,
    cancelRegister,
    cancelRegisterAll,
    trigger,
  };
};

export default useEventManager;
