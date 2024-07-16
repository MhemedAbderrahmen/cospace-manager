"use client";
import { usePathname } from "next/navigation";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "~/components/ui/breadcrumb";

const generateBreadcrumbs = (pathname: string) => {
  const pathSegments = pathname.split("/").filter((segment) => segment);
  const breadcrumbs = [{ href: "/", label: "Home" }];

  let accumulatedPath = "";
  pathSegments.forEach((segment) => {
    accumulatedPath += `/${segment}`;
    breadcrumbs.push({
      href: accumulatedPath,
      label: segment.charAt(0).toUpperCase() + segment.slice(1),
    });
  });

  return breadcrumbs;
};

export const DynamicBreadcrumbs = () => {
  const pathname = usePathname();
  const breadcrumbs = generateBreadcrumbs(pathname);

  return (
    <Breadcrumb className="pb-4">
      <BreadcrumbList>
        {breadcrumbs.map((breadcrumb, index) => (
          <React.Fragment key={breadcrumb.href}>
            <BreadcrumbItem>
              {index === breadcrumbs.length - 1 ? (
                <BreadcrumbPage>{breadcrumb.label}</BreadcrumbPage>
              ) : (
                <BreadcrumbLink href={breadcrumb.href}>
                  {breadcrumb.label}
                </BreadcrumbLink>
              )}
            </BreadcrumbItem>
            {index < breadcrumbs.length - 1 && <BreadcrumbSeparator />}
          </React.Fragment>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
};
