// เมนูเลือกการเรียง todo (ตามวันที่สร้าง / วันที่แก้ไข) ที่มุมขวาบนของรายการ
import { Fragment } from 'react';
import { ChevronDownIcon } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuLabel,
  DropdownMenuRadioGroup,
  DropdownMenuRadioItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { SORT_GROUPS } from '@/lib/todo-filters';

// ข้อความบนปุ่ม เช่น "Created at · Newest first"
function getSortLabel(value) {
  for (const group of SORT_GROUPS) {
    const option = group.options.find((option) => option.value === value);
    if (option) {
      return `${group.label} · ${option.label}`;
    }
  }
}

export default function SortMenu({ value, onValueChange }) {
  return (
    <div className="flex items-center gap-2">
      <span id="sort-label" className="text-sm text-muted-foreground">
        Sort
      </span>
      <DropdownMenu>
        <DropdownMenuTrigger
          id="sort-trigger"
          aria-labelledby="sort-label sort-trigger"
          render={<Button variant="outline" size="sm" />}
        >
          {getSortLabel(value)}
          <ChevronDownIcon data-icon="inline-end" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          aria-labelledby="sort-label"
          className="w-65"
        >
          <DropdownMenuRadioGroup value={value} onValueChange={onValueChange}>
            {SORT_GROUPS.map((group, index) => (
              <Fragment key={group.label}>
                {index > 0 && <DropdownMenuSeparator />}
                <DropdownMenuGroup>
                  <DropdownMenuLabel>{group.label}</DropdownMenuLabel>
                  {group.options.map((option) => (
                    <DropdownMenuRadioItem
                      key={option.value}
                      value={option.value}
                      closeOnClick
                    >
                      {option.label}
                    </DropdownMenuRadioItem>
                  ))}
                </DropdownMenuGroup>
              </Fragment>
            ))}
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
