import { renderHook, act } from '@testing-library/react-hooks';
import { useHooks } from './Pokedex-functional';

const mockPokemons = [
  { pokeId: '001' },
  { pokeId: '002', checked: false },
  { pokeId: '003', checked: false },
];

const expectPokemons = [
  { pokeId: '001' },
  { pokeId: '002', checked: true },
  { pokeId: '003', checked: false },
];

describe('Pokedex hooks', () => {
  it('Should toggle pokemons correct', () => {
    const { result } = renderHook(() => useHooks(mockPokemons));

    act(() => {
      // test callback function
      result.current.onPokemonToggle('002')();
    });
    expect(result.current.pokemons).toEqual(expectPokemons);
  });

  it('Should set showingPopup to true', () => {
    const { result } = renderHook(() => useHooks([]));

    act(() => {
      // test update (useUpdateEffect function)
      result.current.setPokemons([{ pokeId: '001' }]);
    });
    expect(result.current.showingPopup).toEqual(true);
  });

  it('Should set showingPopup to false after a while', async () => {
    const { result, waitForNextUpdate } = renderHook(() => useHooks([]));

    act(() => {
      // force update
      result.current.setPokemons([{ pokeId: '001' }]);
    });
    expect(result.current.showingPopup).toEqual(true);

    await waitForNextUpdate();
    expect(result.current.showingPopup).toEqual(false);
  });

  it('Should cleanup timeout', () => {
    const clearTimeout = jest.fn();
    Object.defineProperty(window, 'setTimeout', { value: () => 'timeoutId' });
    Object.defineProperty(window, 'clearTimeout', { value: clearTimeout });
    const { result, unmount } = renderHook(() => useHooks([]));

    act(() => {
      // force update
      result.current.setPokemons([{ pokeId: '001' }]);
    });

    // life cycle - unmount
    unmount();
    expect(clearTimeout).toHaveBeenCalledWith('timeoutId');
  });
});
