import type { EffectCallback, DependencyList, MutableRefObject } from 'react'
import { useEffect, useRef } from 'react'

/**
 * Simulate componentDidUpdate() method of Class Component
 * https://reactjs.org/docs/react-component.html#componentdidupdate
 *
 * @param effect - Effect callback to be executed on updates
 * @param deps - Dependency array for the effect
 */
const useUpdateEffect = (effect: EffectCallback, deps: DependencyList = []): void => {
  const isFirstRender: MutableRefObject<boolean> = useRef(true)

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
      return
    }
    return effect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, deps)
}

export default useUpdateEffect
