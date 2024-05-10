'use client';

import { ChevronDown, ChevronRight } from 'lucide-react';
import { FC, memo, useState } from 'react';
import TreeView, { NodeId, flattenTree } from 'react-accessible-treeview';
import { Checkbox } from '@/components/ui/checkbox';
import { CrawlData } from '@/types/CrawlData';
import { formatDate } from '@/utils/date';
import { cn } from '@/lib/utils';
import { Button } from './ui/button';

interface Props {
  rawData: CrawlData[];
  selectedIds: NodeId[];
  selectedItems: (CrawlData | undefined)[];
  setSelectedIds: (ids: NodeId[]) => void;
  setSelectedItems: (items: (CrawlData | undefined)[]) => void;
}

const AccessibleTreeView: FC<Props> = ({ rawData, selectedIds, selectedItems, setSelectedItems, setSelectedIds }) => {
  const dates = new Set(rawData.map((entry) => entry.releaseDate));
  const data = Array.from(dates).map((date) => {
    return {
      name: formatDate(new Date(date)),
      children: rawData.filter((entry) => entry.releaseDate === date).map((entry) => ({ metadata: entry, name: `${entry.name} - ${entry.price}` })),
    };
  });

  const flattenData = flattenTree({ name: '', children: data });

  const handleSelectAll = () => {
    setSelectedIds(flattenData.map((item) => item.id));
  };

  const handleDeselectAll = () => {
    setSelectedIds([]);
  };

  return (
    <div>
      <div className='my-6'>
        <div className='flex items-center gap-4'>
          <span className='text-sm font-medium'>{selectedItems.length} items selected</span>
          <Button variant={'ghost'} className='text-label h-8 px-2 text-xs' onClick={handleSelectAll}>
            Select All
          </Button>
          <Button onClick={handleDeselectAll} variant={'ghost'} className='text-label h-8 px-2 text-xs'>
            Deselect All
          </Button>
        </div>
      </div>

      <TreeView
        className='space-y-4 [&_.tree-branch-wrapper]:space-y-2 [&_ul]:space-y-1'
        data={flattenData}
        aria-label='Checkbox tree'
        multiSelect
        selectedIds={selectedIds}
        propagateSelect
        propagateSelectUpwards
        propagateCollapse
        togglableSelect
        defaultExpandedIds={flattenData.map((item) => item.id)}
        onSelect={(props) => {
          const selectedIds = Array.from(props.treeState.selectedIds);
          const selectedItems = flattenData
            .filter((item) => item.parent !== 0 && selectedIds.includes(item.id) && !!item.metadata)
            .map((item) => item.metadata);

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
