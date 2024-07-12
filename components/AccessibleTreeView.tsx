'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { FC, memo, useMemo } from 'react';
import TreeView, { NodeId, flattenTree } from 'react-accessible-treeview';
import { Checkbox } from '@/components/ui/checkbox';
import { CrawlData } from '@/types/CrawlData';
import { formatDate } from '@/utils/date';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Props {
  searchTerm: string;
  rawData: CrawlData[];
  selectedIds: NodeId[];
  selectedItems: (CrawlData | undefined)[];
  setSelectedIds: (ids: NodeId[]) => void;
  setSelectedItems: (items: (CrawlData | undefined)[]) => void;
}

const AccessibleTreeView: FC<Props> = ({ searchTerm, rawData, selectedIds, selectedItems, setSelectedItems, setSelectedIds }) => {
  const [selectedFilterdIds, filteredData] = useMemo(() => {
    if (searchTerm) {
      const displayedItems = rawData.filter((item) => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
      const displayedIds = displayedItems.map((item) => item.index);
      const selectedDisplayedIds = selectedIds.filter((id) => (typeof id === 'number' ? displayedIds.includes(id) : false));

      return [selectedDisplayedIds, displayedItems];
    }

    return [selectedIds, rawData];
  }, [rawData, selectedIds, searchTerm]);

  const flattenData = useMemo(() => {
    const dates = new Set(filteredData.map((entry) => entry.releaseDate));
    const data = Array.from(dates).map((date) => {
      return {
        id: date,
        name: formatDate(new Date(date)),
        children: filteredData
          .filter((entry) => entry.releaseDate === date)
          .map((entry) => ({ metadata: entry, id: entry.name, name: `${entry.name} - ${entry.price}` })),
      };
    });

    return flattenTree({ name: 'root', children: data });
  }, [filteredData]);

  const handleSelectAll = () => {
    setSelectedIds(rawData.map((item) => item.name));
    setSelectedItems(rawData);
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
    setSelectedItems([]);
  };

  return (
    <div>
      <div className='my-6'>
        <div className='flex items-center gap-4'>
          <span className='text-sm font-medium'>{selectedItems.length} items selected</span>
          <Button variant={'ghost'} className='h-8 px-2 text-xs text-label' onClick={handleSelectAll}>
            Select All
          </Button>
          <Button onClick={handleDeselectAll} variant={'ghost'} className='h-8 px-2 text-xs text-label'>
            Deselect All
          </Button>
        </div>
      </div>

      <TreeView
        className='space-y-4 [&_.tree-branch-wrapper]:space-y-2 [&_ul]:space-y-1'
        data={flattenData}
        aria-label='Checkbox tree'
        multiSelect
        selectedIds={selectedFilterdIds}
        propagateSelect
        // propagateSelectUpwards
        propagateCollapse
        togglableSelect
        defaultExpandedIds={flattenData.map((item) => item.id)}
        onNodeSelect={({ isBranch, isSelected, element }) => {
          const newIds = isBranch ? element.children : [element.id];
          const newSelectedIds = isSelected ? [...selectedIds, ...newIds] : selectedIds.filter((id) => !newIds.includes(id));

          setSelectedIds(newSelectedIds);

          const selectedItems = rawData.filter((item) => newSelectedIds.includes(item.name));

          setSelectedItems(selectedItems);
        }}
        nodeRenderer={({ element, isBranch, isExpanded, isSelected, isHalfSelected, getNodeProps, level, handleSelect, handleExpand }) => {
          return (
            <div {...getNodeProps({ onClick: handleExpand })} style={{ marginLeft: 40 * (level - 1) }}>
              <div className='flex items-center gap-2'>
                {isBranch && <ArrowIcon className='size-4' isOpen={isExpanded} />}

                <label
                  className={cn('flex items-center gap-2', {
                    'font-medium': isBranch,
                  })}
                  onClick={(event) => {
                    if (isBranch) {
                      event?.stopPropagation();
                    }
                  }}>
                  <CheckBoxIcon
                    onClick={(e: any) => {
                      e.stopPropagation();
                      handleSelect(e);
                    }}
                    variant={isHalfSelected ? 'some' : isSelected ? 'all' : 'none'}
                  />
                  {element.name}
                </label>
              </div>
            </div>
          );
        }}
      />
    </div>
  );
};

const ArrowIcon = ({ isOpen, className }: { isOpen: boolean; className: string }) => {
  return isOpen ? <ChevronDown className={className} /> : <ChevronRight className={className} />;
};

const CheckBoxIcon = ({ variant, ...rest }: { variant: string } & any) => {
  switch (variant) {
    case 'all':
      return <Checkbox checked {...rest} />;
    case 'none':
      return <Checkbox checked={false} {...rest} />;
    case 'some':
      return <Checkbox checked={false} {...rest} />;
    default:
      return null;
  }
};

export default memo(AccessibleTreeView);
