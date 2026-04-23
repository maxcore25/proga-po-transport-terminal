type StatusBadgeProps = {
  isSuccess: boolean;
  text: string;
};

export function StatusBadge({ isSuccess, text }: StatusBadgeProps) {
  return (
    <span
      className={
        isSuccess
          ? 'inline-flex rounded-md bg-emerald-500/15 px-2 py-1 text-xs font-medium text-emerald-700 dark:text-emerald-300'
          : 'inline-flex rounded-md bg-red-500/15 px-2 py-1 text-xs font-medium text-red-700 dark:text-red-300'
      }
    >
      {text}
    </span>
  );
}
