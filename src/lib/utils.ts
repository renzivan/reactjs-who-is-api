// format date to "Jan 1, 2022"
export function formatDate (val: string): string {
  const date = new Date(val);
  const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  };
  return new Intl.DateTimeFormat('en-US', options).format(date);
}
