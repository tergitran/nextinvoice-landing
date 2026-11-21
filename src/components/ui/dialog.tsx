'use client';

import type { ComponentProps } from 'react';
import { Dialog as DialogPrimitive } from '@base-ui/react/dialog';
import { cva, type VariantProps } from 'class-variance-authority';
import { X } from 'lucide-react';
import { cn } from '@/lib/utils';

const dialogVariants = cva(
  'fixed top-1/2 left-1/2 z-50 w-[calc(100%-2rem)] max-w-lg max-h-[calc(100dvh-2rem)] -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border bg-dialog p-6 text-dialog-foreground shadow-2xl outline-none transition-[opacity,scale] duration-200 sm:p-8 data-starting-style:scale-95 data-starting-style:opacity-0 data-ending-style:scale-95 data-ending-style:opacity-0',
  {
    variants: {
      tone: { blue: 'border-dialog-blue', purple: 'border-dialog-purple' },
    },
    defaultVariants: { tone: 'blue' },
  },
);

function Dialog(props: DialogPrimitive.Root.Props) {
  return <DialogPrimitive.Root {...props} />;
}

function DialogContent({
  className,
  children,
  tone,
  ...props
}: DialogPrimitive.Popup.Props & VariantProps<typeof dialogVariants>) {
  return (
    <DialogPrimitive.Portal>
      <DialogPrimitive.Backdrop
        data-slot="dialog-overlay"
        className="fixed inset-0 z-50 bg-dialog-overlay transition-opacity duration-200 data-starting-style:opacity-0 data-ending-style:opacity-0"
      />
      <DialogPrimitive.Popup
        data-slot="dialog-content"
        className={cn(dialogVariants({ tone }), className)}
        {...props}
      >
        <DialogPrimitive.Close
          aria-label="Đóng thông báo"
          className="absolute top-4 right-4 rounded-lg p-1.5 text-dialog-muted transition hover:bg-dialog-accent hover:text-dialog-foreground focus-visible:outline-2 focus-visible:outline-offset-2"
        >
          <X className="size-5" />
        </DialogPrimitive.Close>
        {children}
      </DialogPrimitive.Popup>
    </DialogPrimitive.Portal>
  );
}

function DialogHeader({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('flex flex-col gap-2', className)} {...props} />;
}

function DialogTitle({ className, ...props }: DialogPrimitive.Title.Props) {
  return <DialogPrimitive.Title className={cn('text-xl font-bold', className)} {...props} />;
}

function DialogDescription({ className, ...props }: DialogPrimitive.Description.Props) {
  return <DialogPrimitive.Description className={cn('mt-2 text-sm leading-relaxed text-dialog-muted', className)} {...props} />;
}

function DialogFooter({ className, ...props }: ComponentProps<'div'>) {
  return <div className={cn('mt-6 flex flex-col-reverse items-center justify-end gap-3 sm:flex-row', className)} {...props} />;
}

function DialogClose({ className, ...props }: DialogPrimitive.Close.Props) {
  return (
    <DialogPrimitive.Close
      className={cn('w-full rounded-xl px-4 py-2.5 text-center text-sm font-semibold text-dialog-muted transition hover:bg-dialog-accent hover:text-dialog-foreground focus-visible:outline-2 focus-visible:outline-offset-2 sm:w-auto', className)}
      {...props}
    />
  );
}

export { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle };
