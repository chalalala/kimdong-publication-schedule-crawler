export const formatDate = (date: Date | number) => {
  const formatter = new Intl.DateTimeFormat('vi', { day: '2-digit', month: '2-digit', year: 'numeric' });

  return formatter.format(date);
};
