import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

interface BreadcrumbItem {
  href: string;
  label: string;
}

interface BreadcrumbNavProps {
  items: BreadcrumbItem[];
  currentPage: string;
}

export const BreadcrumbNav: React.FC<BreadcrumbNavProps> = ({ items, currentPage }) => {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {items.map((item, index) => (
          <React.Fragment key={item.href}>
            <BreadcrumbItem>
              <Link href={item.href} passHref legacyBehavior>
                <BreadcrumbLink>{item.label}</BreadcrumbLink>
              </Link>
            </BreadcrumbItem>
            {index < items.length - 1 && (
              <BreadcrumbSeparator>
                <ChevronRight className="h-4 w-4" />
              </BreadcrumbSeparator>
            )}
          </React.Fragment>
        ))}
        <BreadcrumbSeparator>
          <ChevronRight className="h-4 w-4" />
        </BreadcrumbSeparator>
        <BreadcrumbItem>
          <BreadcrumbPage>{currentPage}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
};