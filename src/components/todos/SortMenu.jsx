// เมนูเลือกการเรียง todo (ตามวันที่สร้าง / วันที่แก้ไข) ที่มุมขวาบนของรายการ
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

export default function SortMenu() {
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
          Created at · Newest first
          <ChevronDownIcon data-icon="inline-end" />
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          aria-labelledby="sort-label"
          className="w-65"
        >
          <DropdownMenuRadioGroup defaultValue="createdAt:desc">
            <DropdownMenuGroup>
              <DropdownMenuLabel>Created at</DropdownMenuLabel>
              <DropdownMenuRadioItem value="createdAt:desc" closeOnClick>
                Newest first
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="createdAt:asc" closeOnClick>
                Oldest first
              </DropdownMenuRadioItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuLabel>Updated at</DropdownMenuLabel>
              <DropdownMenuRadioItem value="updatedAt:desc" closeOnClick>
                Recently updated
              </DropdownMenuRadioItem>
              <DropdownMenuRadioItem value="updatedAt:asc" closeOnClick>
                Least recently updated
              </DropdownMenuRadioItem>
            </DropdownMenuGroup>
          </DropdownMenuRadioGroup>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}
