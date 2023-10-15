import { IconLayoutGrid } from '@tabler/icons-react';
import { IconMenu2 } from '@tabler/icons-react';
import { useViewMode } from '../contexts/ViewModeProvider';
import { VIEW_MODES } from '../constants';

export function ViewModeActions() {
  const { viewMode, setViewModeList, setViewModeCards } = useViewMode();

  const action = 'bg-gray-100 border-y-2 py-0.5 px-1';
  const isActive = 'bg-main-500 text-white border-main-500 shadow-sm';

  return (
    <div className="flex items-center">
      <button
        onClick={setViewModeCards}
        className={`${action} border-l-2 border-r rounded-l-md ${viewMode === VIEW_MODES.CARDS ? isActive : ''}`}>
        <IconLayoutGrid />
      </button>
      <button
        onClick={setViewModeList}
        className={`${action} border-r-2 border-l rounded-r-md ${viewMode === VIEW_MODES.LIST ? isActive : ''}`}>
        <IconMenu2 />
      </button>
    </div>
  );
}
