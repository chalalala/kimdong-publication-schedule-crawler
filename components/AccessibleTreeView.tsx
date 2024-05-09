import { ChevronDown, ChevronRight } from 'lucide-react';
import React, { FC } from 'react';
import TreeView, { NodeId, flattenTree } from 'react-accessible-treeview';
import { Checkbox } from '@/components/ui/checkbox';

const folder = {
  name: '',
  children: [
    {
      name: 'Fruits',
      children: [{ name: 'Avocados' }, { name: 'Bananas' }, { name: 'Berries' }, { name: 'Oranges' }, { name: 'Pears' }],
    },
    {
      name: 'Drinks',
      children: [
        { name: 'Apple Juice' },
        { name: 'Chocolate' },
        { name: 'Coffee' },
        {
          name: 'Tea',
          children: [{ name: 'Black Tea' }, { name: 'Green Tea' }, { name: 'Red Tea' }, { name: 'Matcha' }],
        },
      ],
    },
    {
      name: 'Vegetables',
      children: [{ name: 'Beets' }, { name: 'Carrots' }, { name: 'Celery' }, { name: 'Lettuce' }, { name: 'Onions' }],
    },
  ],
};

const data = flattenTree(folder);

type Props = {
  selectedIds: NodeId[];
};

const AccessibleTreeView: FC<Props> = ({ selectedIds }) => {
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

  function MultiSelectCheckbox() {
    return (
      <div>
        <div className='checkbox'>
          <TreeView
            data={data}
            aria-label='Checkbox tree'
            multiSelect
            selectedIds={selectedIds}
            propagateSelect
            propagateSelectUpwards
            propagateCollapse
            togglableSelect
            nodeRenderer={({ element, isBranch, isExpanded, isSelected, isHalfSelected, getNodeProps, level, handleSelect, handleExpand }) => {
              return (
                <div {...getNodeProps({ onClick: handleExpand })} style={{ marginLeft: 40 * (level - 1) }}>
                  <div className='flex items-center gap-2'>
                    {isBranch && <ArrowIcon className='size-4' isOpen={isExpanded} />}
                    <CheckBoxIcon
                      onClick={(e: any) => {
                        handleSelect(e);
                        console.log('🚀 ~ MultiSelectCheckbox ~ e:', e.target.value);
                        e.stopPropagation();
                      }}
                      variant={isHalfSelected ? 'some' : isSelected ? 'all' : 'none'}
                    />
                    <span className='name'>{element.name}</span>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </div>
    );
  }

  return (
    <div>
      <MultiSelectCheckbox />
    </div>
  );
};

export default AccessibleTreeView;
