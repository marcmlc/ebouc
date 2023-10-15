import { useContext, useMemo, useState } from 'react';
import { ViewModeContext } from './ViewModeContext';
import { VIEW_MODES } from '../constants';

export function ViewModeProvider({ children }) {
  const [viewMode, setViewMode] = useState(VIEW_MODES.CARDS);

  const setViewModeList = () => setViewMode(VIEW_MODES.LIST);
  const setViewModeCards = () => setViewMode(VIEW_MODES.CARDS);

  const value = useMemo(() => ({
    viewMode,
    setViewModeList,
    setViewModeCards,
  }));

  return <ViewModeContext.Provider value={value}>{children}</ViewModeContext.Provider>;
}

export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (context === null) throw new Error('useViewMode must be used within a ViewModeProvider');

  return context;
};
