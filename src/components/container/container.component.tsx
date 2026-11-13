import './container.styles.scss';

import clsx from 'clsx';
import { type ComponentPropsWithoutRef, createElement, type ElementType } from 'react';

/** Polymorphic props helper to support the `as` prop. */
type PolymorphicProps<T extends ElementType> = {
  as?: T;
  className?: string;
  maxWidth?: string;
  children: React.ReactNode;
} & ComponentPropsWithoutRef<T>;

/**
 * Props for the container.
 * It uses a polymorphic type function to grab the props for the specify tag.
 */
export type ContainerProps<T extends ElementType = 'div'> = PolymorphicProps<T>;

/**
 * Layout wrapper that enforces consistent max-width and horizontal spacing.
 */
export function Container<T extends ElementType = 'div'>(props: ContainerProps<T>) {
  const { as: asComponent, className, maxWidth, children, ...rest } = props;

  const Component = asComponent || 'div';
  const classes = clsx('container', className);

  return createElement(
    Component,
    {
      ...rest,
      className: classes,
      style: { '--max-width': maxWidth },
    },
    children,
  );
}
